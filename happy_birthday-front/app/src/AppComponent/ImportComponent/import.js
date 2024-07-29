import { Dialog, DialogTitle, DialogContent, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios'

function Import({ open, onClose }) {
    const [csvData, setCsvData] = useState([]);
    const [loadedDataEnd, setLoadedDataEnd] = useState(false);
    const url = "http://localhost:3002"


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    setCsvData(results.data);
                    sendData()
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                }
            });
        }
    };

    const sendData = async () => {
        const response = await fetch(url+"/bulkBirthdayImport", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {"birthdayList" :csvData}
        });
        if(response.ok){
            setLoadedDataEnd(true)
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Import CSV</DialogTitle>
            <DialogContent>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                />
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
                {csvData.length > 0 && (
                    <div>
                        <Typography variant="h6">CSV Data:</Typography>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default Import;
