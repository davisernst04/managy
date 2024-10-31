const { Storage } = require("@google-cloud/storage");

const projectId = 'managy-438606';
const cloudstoragekey = "cloudstoragekey.json"
const bucket_name = "managy_bucket";
const storage_folder = "./"
/*Options for folder: admin_excel/*/

const storage = new Storage({
  projectId: projectId,
  keyFilename: cloudstoragekey,
});

const uploadToGCP = async (filepath, storage_folder, fileName) => {
    try {
        const gcs = storage.bucket(bucket_name); // Removed "gs://" from the bucket name
        const storagepath = `${storage_folder}${fileName}`;
        const result = await gcs.upload(filepath, {
            destination: storagepath,
            predefinedAcl: 'publicRead', // Set the file to be publicly readable
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

module.exports = { uploadToGCP };

/*
USAGE:
// otro archivo donde quieras usar la función (ej: main.js)
const { uploadToGCP } = require('./gcpUploader');

// Ahora puedes usar uploadToGCP en este archivo
uploadToGCP('./path/to/file.txt', 'admin_excel/', 'file.txt')
  .then(link => console.log('Archivo subido a:', link))
  .catch(error => console.error('Error subiendo archivo:', error));


let result= await uploadToGCP(`${uploadfilepath}`, `${storage_folder}`, 'filename.txt');
console.log(result);

 You will get the link which looks like below providing access to the file.
"https://storage.googleapis.com/download/storage/v1/b/bucket_name/o/storage_folder%2Ffilename.txt?generation=1685355700228424&alt=media"
*/