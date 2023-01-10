import React from 'react';

function Card() {
    const [files, setFiles] = React.useState(null);
    const inputReference = React.useRef();

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setFiles(e.dataTransfer.files);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append('files', file);
        });
        await fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setFiles(null);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    if (files) return (
        <div className="uploads">
            <ul>
                {Array.from(files).map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                ))}
            </ul>
            <div className="actions">
                <button onClick={() => setFiles(null)}>Cancel</button>
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );

    return (
        <>
        {!files && (
            <div
                className="card"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <h1>Drag and drop your files here</h1>
                <h1>Or</h1>
                <input 
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    hidden
                    ref={inputReference} 
                />
                <button onClick={() => inputReference.current.click()}>Select files</button>
            </div>
        )}
        </>
    );
};

export default Card;