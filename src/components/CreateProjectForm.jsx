import React, { useState, useEffect } from "react";

const CreateProjectForm = ({ onProjectCreated }) => {
    const [formData, setFormData] = useState({
        projectName: "",
        description: "",
        customerId: "",
    });

    const [customers, setCustomers] = useState([]);

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

        const response = await fetch("https://localhost:7222/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setFormData({
                projectName: "",
                description: "",
                customerId: "",
            });

            if (onProjectCreated) {
                onProjectCreated(); // Anropa callback för att uppdatera listan
            }
        } else {
            console.error("Misslyckades att skapa projektet");
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

            <button type="submit">Skapa</button>
        </form>
    );
};

export default CreateProjectForm;
