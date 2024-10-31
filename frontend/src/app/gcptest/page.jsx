import {error} from "next/dist/build/output/log";

function GCPtest(){

    const { uploadToGCP } = require('@/components/cloud_storage');
    const testupload = "@/test/testupload.txt";

    // Ahora puedes usar uploadToGCP en este archivo
    uploadToGCP(`${testupload}`, 'admin_excel/', 'testfile.txt')
        .then(link => console.log('Uploading file to:', link))
        .catch(error => {
            console.error('Error uploading file:', error);
            alert(`Error uploading file: ${error.message}`);
        });

    return(
        <div>
            <h1>GCP Test</h1>
        </div>
    );

}

export default GCPtest;