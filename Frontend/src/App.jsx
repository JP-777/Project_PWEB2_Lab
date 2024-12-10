import './App.css';
import { FriendBar } from './components/FriendBar.jsx';
import { NavBar } from './components/NavBar.jsx';
import { PostingPanel } from './components/PostingPanel.jsx';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from "./components/RegisterForm";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function App() {

    useEffect(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const isExpired = payload.exp * 1000 < Date.now();
                if (!isExpired) {
                    setIsAuthenticated(true);
                } else {
                    console.warn('El token ha expirado');
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Token inválido:', error);
                localStorage.removeItem('token');
            }
        }
    }, []);
    
    
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <div className="App">
                {isAuthenticated && (
                    <nav>
                        <NavBar
                            selfProfilePhoto={`https://unavatar.io/JP-777`}
                            selfProfileName="JP-777"
                        />
                    </nav>
                )}
                <div className="principalBody">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isAuthenticated ? (
                                    <>
                                        
                                        <FriendBar />
                                        <PostingPanel
                                            content={[
                                                { id: 1, userName: "Saul Andre Sivincha Machaca" },
                                                { id: 2, userName: "Matias Dario Davila Flores" },
                                                { id: 3, userName: "Jefferson Joao Basurco Cassani" },
                                            ]}
                                        />
                                    </>
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                isAuthenticated ? (
                                    <Navigate to="/" />
                                ) : (
                                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                                )
                            }
                        />
                        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
                        <Route path="/register" element={<RegisterForm />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
