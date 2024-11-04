import api from "@/api";

const createAmenity = () => {

    const data1 = {
        "name": amenityName,
        "description": description,
        "capacity": capacity,
        "image": imageURL,
    };
    console.log(data1);

    api
        .post(api_amenityCreate, data1)
        .then((res) => {
            if (res.status === 201) {
                alert("Amenity Created! With ID: "+res.data.id+"\nGo to view Amenities");
                console.log(res.data);
            }
            else alert("Failed to create Amenity.");
        })
        .catch((err) => alert(err));
};

const handleCreateAmenity = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (amenityName.trim() === "") {
        alert("Amenity Name cannot be empty.");
        setLoading(false);
        return;
    }

    try {
        await upload_image();
        await createAmenity();
    } catch (error) {
        alert("An error occurred: " + error.message);
    } finally {
        setLoading(false);
    }
};

const upload_image = () => {

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('title', amenityName);
    console.log(Array.from(formData.keys()));
    console.log(Array.from(formData.values()));

    api
        .post(api_images, formData)
        .then((res) => {
            if (res.status === 201) {
                alert("Image Uploaded");
                console.log(res.data);
                setImageURL(res.data.url);
            }
            else alert("Can not upload Image");
        })
        .catch((err) => alert(err));
};