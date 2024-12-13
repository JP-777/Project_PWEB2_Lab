/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import '../styles/Forms.css'

export function LoginForm({ onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                username,
                password,
            });

            const { token, userId } = response.data;
            
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);

            onLoginSuccess(token);
        } catch (error) {
            alert("Credenciales incorrectas o problema con el servidor.");
        }
    };

    const handleSuccess = async (response) => {
        try {
            const { credential } = response;
    
            console.log("Google Credential:", credential); // Verificar el token de Google
    
            // Envía el token de Google al backend para validarlo y obtener un JWT
            const res = await axios.post('http://localhost:8080/api/auth/google', { token: credential });
    
            // Extrae el JWT del backend
             const { token: token, userId } = res.data;
    
            // Almacena el JWT en localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
    
            // Notifica que el inicio de sesión fue exitoso
            onLoginSuccess(token);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message); // Muestra el error en detalle
            alert('Error al iniciar sesión con Google.');
        }
    };
    
    
    const handleError = () => {
        console.error('Error al iniciar sesión con Google');
    };
        

    return (
        <div className="form-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <label>Usuario:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
            />
            <Link to="/register">¿No tienes una cuenta? Regístrate</Link>
        </div>
    );
}
