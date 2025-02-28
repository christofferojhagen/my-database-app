import React, { useState, useEffect } from "react";

const UpdateProjectForm = ({ projectId, onUpdate }) => {
    const [formData, setFormData] = useState({
        projectName: "",
        description: "",
        customerId: "",
    });

    const [customers, setCustomers] = useState([]);

    // Hämta befintliga projektuppgifter
    useEffect(() => {
        fetch(`https://localhost:7222/api/projects/${projectId}`)
            .then(res => res.json())
            .then(data => setFormData({
                projectName: data.projectName,
                description: data.description,
                customerId: data.customerId || "",
            }))
            .catch(err => console.error("Kunde inte hämta projekt:", err));
    }, [projectId]);

    // Hämta lista över kunder
    useEffect(() => {
        fetch("https://localhost:7222/api/customers")
            .then(res => res.json())
            .then(data => setCustomers(data))
            .catch(err => console.error("Kunde inte hämta kunder:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://localhost:7222/api/projects/${projectId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setFormData({
                projectName: "",
                description: "",
                customerId: "",
            });
            onUpdate(); 
        } else {
            console.error("Misslyckades att uppdatera projektet");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="projectName"
                placeholder="Projektnamn"
                value={formData.projectName}
                onChange={handleChange}
                required
            />
            <textarea
                name="description"
                placeholder="Anteckningar"
                value={formData.description}
                onChange={handleChange}
                required
            ></textarea>
            
            <select
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                required
            >
                <option value="">Välj en kund</option>
                {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                        {customer.customerName} (ID: {customer.id})
                    </option>
                ))}
            </select>

            <button type="submit">Uppdatera</button>
        </form>
    );
};

export default UpdateProjectForm;
