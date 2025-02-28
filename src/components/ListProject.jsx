import React, { useState, useEffect } from "react";
import UpdateProjectForm from "/src/components/UpdateProjectForm";

const ListProject = () => {
    const [projects, setProjects] = useState([]);

    // Hämta projekt från API
    const fetchProjects = async () => {
        try {
            const res = await fetch("https://localhost:7222/api/projects");
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (err) {
            console.error("Kunde inte hämta projekt", err);
        }
    };

    // Hämta projekt vid första renderingen
    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="container">
            <h2>Projektlista</h2>
            {projects.length > 0 ? (
                projects.map((project) => (
                    <div key={project.id} className="project">
                        <h3>Projektnamn: {project.projectName}</h3>
                        <p><strong>Anteckningar:</strong> {project.description}</p>
                        <UpdateProjectForm projectId={project.id} onUpdate={fetchProjects} />
                    </div>
                ))
            ) : (
                <p>Inga projekt hittades.</p>
            )}
        </div>
    );
};

export default ListProject;
