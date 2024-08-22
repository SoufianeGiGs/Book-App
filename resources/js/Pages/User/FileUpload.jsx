import React, { useState, useRef } from 'react';
import axios from 'axios';

const FileUploadComponent = () => {
    const [file, setFile] = useState(null);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('file', file);
    
            const source = axios.CancelToken.source();
    
            const response = await axios.post('http://127.0.0.1:8000/upload-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                cancelToken: source.token,
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadPercentage(percentCompleted);
                },
            });
    
            console.log('Server response:', response.data);
    
            alert('File uploaded successfully.');
            setUploadPercentage(0); // Reset after upload
            setFile(null); // Reset file input
        } catch (error) {
            if (error.response) {
                console.error('Validation error:', error.response.data.errors);
                alert(`Validation error: ${JSON.stringify(error.response.data.errors)}`);
            } else {
                console.error('Error uploading file:', error);
                alert('An error occurred during the file upload.');
            }
            setUploadPercentage(0); // Reset on error
        }
    };
    
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
    };

    const handleCancelUpload = () => {
        setUploadPercentage(0);
        setFile(null);
    };

    return (
        <div style={styles.container}>
            <div
                style={{ ...styles.dropZone, ...(isDragging ? styles.dragging : {}) }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current.click()}
            >
                <p style={styles.dropZoneText}>
                    {file ? file.name : 'Drag and drop a file here, or click to select a file'}
                </p>
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    style={styles.input}
                />
            </div>
            <button
                onClick={handleFileUpload}
                style={styles.button}
                disabled={!file}
            >
                Upload
            </button>
            {file && (
                <button
                    onClick={handleCancelUpload}
                    style={{ ...styles.button, ...styles.cancelButton }}
                >
                    Cancel
                </button>
            )}
            {uploadPercentage > 0 && (
                <div style={styles.progressContainer}>
                    <div style={{ ...styles.progressBar, width: `${uploadPercentage}%` }}>
                        {uploadPercentage}%
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: '50px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    dropZone: {
        width: '100%',
        padding: '50px',
        border: '2px dashed #d32f2f',
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'background-color 0.3s, border-color 0.3s',
        marginBottom: '20px',
    },
    dropZoneText: {
        fontSize: '16px',
        color: '#333',
    },
    dragging: {
        backgroundColor: '#ffe6e6',
        borderColor: '#b71c1c',
    },
    input: {
        display: 'none',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#d32f2f',
        color: '#ffffff',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontWeight: 'bold',
        marginTop: '10px',
    },
    cancelButton: {
        backgroundColor: '#777',
        marginTop: '10px',
    },
    progressContainer: {
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        marginTop: '15px',
        height: '30px',
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#d32f2f',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        transition: 'width 0.3s',
    },
};

export default FileUploadComponent;
