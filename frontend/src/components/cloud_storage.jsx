"use server";

import {Storage} from "@google-cloud/storage";

export async function uploadToGCP(filepath, storage_folder, fileName, publicAccess) {

    const { Storage } = require("@google-cloud/storage");

    const projectId = 'managy-438606';
    const cloudstoragekey = "cloudstoragekey.json"
    const bucket_name = "managy_bucket";

    let access;
    if (publicAccess === 1){
        access = 'publicRead';
    } else {
        access = 'private';
    }


    const storage = new Storage({
        projectId: projectId,
        keyFilename: cloudstoragekey,
    });

    try {
        const gcs = storage.bucket(bucket_name); // Removed "gs://" from the bucket name
        const storagepath = `${storage_folder}${fileName}`;
        const result = await gcs.upload(filepath, {
            destination: storagepath,
            predefinedAcl: access, // Set the file to be publicly readable
            gzip: true,
            metadata: {
                contentType: "application/plain", // Adjust the content type as needed
            }
        });
        return result[0].metadata.mediaLink;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

/*
USAGE:

Storage Folder Options:
Amenity/Images/
Event/Images/
Admin_excel/

publicAccess is 1 for public, other for private

const handleUpload = async () => {
    uploadToGCP(`${testupload}`, `${storage_folder}`, `${file_name.with extension}`, `${publicAccess}`)
        .then(link => console.log('Uploading file to:', link))
        .catch(error => {
            console.error('Error uploading file:', error);
            alert(`Error uploading file: ${error.message}`);
        });
}

 You will get the link which looks like below providing access to the file.
"https://storage.googleapis.com/download/storage/v1/b/bucket_name/o/storage_folder%2Ffilename.txt?generation=1685355700228424&alt=media"
*/