import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Cookies from "js-cookie";

function AdminComponent({ open, onClose }) {
    const [citations, setCitations] = useState([]);
    const [author, setAuthor] = useState("");
    const [quote, setQuote] = useState("");
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (open) {
            fetchCitations();
            console.log(citations)
        }
    }, [open]);

    const fetchCitations = async () => {
        try {
            const response = await fetch('http://localhost:3002/admin/getAllQuotes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Cookies.get("Token")
                    },
                });
            if (response.ok) {
                const data = await response.json();
                setCitations(data.quotes);
            } else {
                setError('Erreur lors de la récupération des citations');
            }
        } catch (error) {
            setError('Erreur lors de la récupération des citations');
        }
    };

    const handleAddOrUpdate = async () => {
        const citation = { author, quote };

        try {
            let response;
            if (editId) {
                response = await fetch(`http://localhost:3002/admin/updateQuote/${editId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Cookies.get("Token")
                    },
                    body: JSON.stringify(citation)
                });
            } else {
                response = await fetch('http://localhost:3002/admin/createQuote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': Cookies.get("Token")
                    },
                    body: JSON.stringify(citation)
                });
            }

            if (response.ok) {
                setAuthor("");
                setQuote("");
                setEditId(null);
                fetchCitations();
            } else {
                setError('Erreur lors de l\'ajout ou de la mise à jour de la citation');
            }
        } catch (error) {
            setError('Erreur réseau lors de l\'ajout ou de la mise à jour de la citation');
        }
    };

    const handleEdit = (citation) => {
        setAuthor(citation.author);
        setQuote(citation.quote);
        setEditId(citation.id);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3002/admin/deleteQuote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Cookies.get("Token")
                },
            });

            if (response.ok) {
                fetchCitations();
            } else {
                setError('Erreur lors de la suppression de la citation');
            }
        } catch (error) {
            setError('Erreur réseau lors de la suppression de la citation');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Admin - Gestion des citations</DialogTitle>
            <DialogContent>
                {error && (
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                )}
                <TextField
                    label="Auteur"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Citation"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button onClick={handleAddOrUpdate} color="primary" variant="contained" style={{ marginTop: '16px' }}>
                    {editId ? 'Mettre à jour' : 'Ajouter'}
                </Button>
                <List>
                    {citations.map((citation) => (
                        <ListItem key={citation.id} secondaryAction={
                            <>
                                <IconButton edge="end" onClick={() => handleEdit(citation)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" onClick={() => handleDelete(citation.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }>
                            <ListItemText primary={citation.quote} secondary={citation.author} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Fermer
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AdminComponent;
