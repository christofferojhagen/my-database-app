import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";  
import ListProject from "./components/ListProject";  
import CreateProject from "./components/CreateProject";  
import "./App.css";


function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<ListProject />} />
                <Route path="/projects/create" element={<CreateProject />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
