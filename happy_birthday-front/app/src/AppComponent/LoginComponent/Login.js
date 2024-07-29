import { Dialog, DialogTitle, DialogContent, Button, Typography, TextField } from '@mui/material';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

function Login({ open, onClose, loggedIn, setLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleClick = async () => {
        const loginData = {
            username: username,
            password: password
        };
        console.log(loginData);
        const url = 'http://localhost:3002';

        try {
            const response = await fetch(url + "/veriflogin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const data = await response.json();
                Cookies.set('token', data.token, { expires: 1 });

                setLoggedIn(true);
                setError(null);
                console.log(loggedIn)

            } else {
                const errorData = await response.json();
                console.error('Erreur de connexion:', errorData.message);
                setError(errorData.message || 'Erreur de connexion');
                setLoggedIn(false);
            }
        } catch (error) {
            console.error('Erreur de réseau:', error);
            setError('Erreur de réseau');
            setLoggedIn(false);
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                {loggedIn && (
                    <Typography variant="h6" color="primary">
                        Tu es bien connecté
                    </Typography>
                )}

                <TextField
                    label="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                {error && (
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                )}

            </DialogContent>

            <Button onClick={handleClick} color="primary" style={{ marginTop: '16px' }}>
                Se connecter
            </Button>

            <Button onClick={onClose} color="primary" style={{ marginTop: '16px' }}>
                Close
            </Button>
        </Dialog>
    );
}

export default Login;
