import { Dialog, DialogTitle, DialogContent, Button, Typography } from '@mui/material';
import React, { useState, useEffect  } from 'react';
import Papa from 'papaparse';

function Import({ open, onClose }) {
    const [csvDatabirthday, setCsvDatabirthdayBirthday] = useState([]);
    const [csvDataQuote, setCsvDataQuote] = useState([]);
    const [loadedDataEndBirthday, setLoadedDataEndBirthday] = useState(false);
    const [loadedDataEndQuote, setLoadedDataEndQuote] = useState(false);
    const [error, setError] = useState(null);
    const [errorQuote, setErrorQuote] = useState(null);

    const url = "http://localhost:3002"


    useEffect(() => {
        if (csvDatabirthday.length > 0) {
            sendDataBirthday();
        }
    }, [csvDatabirthday]);

    useEffect(() => {
        if (csvDataQuote.length > 0) {
            sendDataQuote();
        }
    }, [csvDataQuote]);

    const handleFileUploadBirthday = (event) => {
        setError(null);
        setLoadedDataEndBirthday(true);
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    setCsvDatabirthdayBirthday(results.data);
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                }
            });
        }
    };
    const handleFileUploadQuote = (event) => {
        setErrorQuote(null);
        setLoadedDataEndQuote(true);
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    setCsvDataQuote(results.data);
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                }
            });
        }
    };


    const sendDataBirthday = async () => {
        try {
            const jsonData = JSON.stringify({ birthdayList: csvDatabirthday }, null, 2);
            console.log(jsonData);
            const response = await fetch(url + "/bulkBirthdayImport", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            });
            if (response.ok) {
                console.log("requete ok")
                setCsvDatabirthdayBirthday([]);
                setLoadedDataEndBirthday(true);
            } else {
                console.error('Error sending data:', error);
                setError('Failed to send data');
            }
        } catch (error) {
            console.error('Error sending data:', error);
            setError('Failed to send data');
        }
    };

    const sendDataQuote = async () => {
        try {
            const jsonData = JSON.stringify({ quoteList: csvDataQuote }, null, 2);
            console.log(jsonData);
            const response = await fetch(url + "/bulkQuoteImport", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            });
            if (response.ok) {
                console.log("requete ok")
                setCsvDataQuote([]);
                setLoadedDataEndQuote(true);
            } else {
                console.error('Error sending data:', error);
                setErrorQuote('Failed to send data');
            }
        } catch (error) {
            console.error('Error sending data:', error);
            setErrorQuote('Failed to send data');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Import CSV birthday</DialogTitle>
            <DialogContent>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUploadBirthday}
                />
                {error && (
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                )}
                {loadedDataEndBirthday && (
                    <Typography variant="h6" color="primary">
                        Data sent successfully!
                    </Typography>
                )}
            </DialogContent>
            <DialogTitle>Import CSV quote</DialogTitle>
            <DialogContent>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUploadQuote}
                />

                {errorQuote && (
                    <Typography variant="body2" color="error">
                        {errorQuote}
                    </Typography>
                )}
                {loadedDataEndQuote && (
                    <Typography variant="h6" color="primary">
                        Data sent successfully!
                    </Typography>
                )}
            </DialogContent>
            <Button onClick={onClose} color="primary" style={{ marginTop: '16px' }}>
                Close
            </Button>
        </Dialog>
    );
}

export default Import;
