"use client";

import { uploadToGCP } from "@/components/cloud_storage";

function GCPtest(){

    const testupload = "test/testupload.txt";

    // Ahora puedes usar uploadToGCP en este archivo

    const handleUpload = async () => {
        uploadToGCP(`${testupload}`, 'admin_excel/', 'testfile.txt', 1)
            .then(link => console.log('Uploading file to:', link))
            .catch(error => {
                console.error('Error uploading file:', error);
                alert(`Error uploading file: ${error.message}`);
            });
    }

    return(
        <div>
            <h1>GCP Test</h1>
            <button onClick={handleUpload}>Upload to GCP</button>
        </div>
    );

}

export default GCPtest;