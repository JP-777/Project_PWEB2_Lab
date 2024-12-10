import { useState } from "react";
import axios from "axios"
import '../styles/Forms.css'

export function RegisterForm() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        lastname: "",
        username: "",
        password: "",
        repeatPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (formData.password !== formData.repeatPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                name: formData.name,
                lastname: formData.lastname,
            });
    
            alert(response.data);
            window.location.href = "/login";
        } catch (error) {
            alert(error.response?.data || "Error al registrar el usuario.");
        }
    };

    return (
        <div className="form-container">
            <h2>Regístrate</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label>Nombre:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label>Apellido:</label>
                <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                />
                <label>Usuario:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <label>Contraseña:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <label>Repetir Contraseña:</label>
                <input
                    type="password"
                    name="repeatPassword"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Regístrate</button>
            </form>
        </div>
    );
}
