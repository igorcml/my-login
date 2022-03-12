import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';

import LoginPage from './pages/LoginPages';
import HomePage from './pages/HomePage';

import { AuthProvider, AuthContext } from './contexts/auth';

function AppRoutes() {
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>;
        }
        return !authenticated ? <Navigate to="/login" /> : children;
    };

    const Public = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>;
        }
        return authenticated ? <Navigate to="/" /> : children;
    };

    return (
        <Router className="Router">
            <AuthProvider>
                <Routes>
                    <Route
                        exact
                        path="/login"
                        element={
                            <Public>
                                <LoginPage />
                            </Public>
                        }
                    />
                    <Route
                        exact
                        path="/"
                        element={
                            <Private>
                                <HomePage />
                            </Private>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default AppRoutes;
