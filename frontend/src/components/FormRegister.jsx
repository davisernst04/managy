"use client";

import { useState } from "react";
import api from "@/api.js";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants.js";
import "@/styles/FormRegister.css";
import LoadingIndicator from "./LoadingIndicator.jsx";
import { navigate } from "./actions.js";
import { uploadToGCP } from "@/components/cloud_storage";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// eslint-disable-next-line react/prop-types
function FormRegister({ routeRecr, routeAdmin }) {
  const [nameRecr, setNameRecr] = useState("");
  const [addressRecr, setAddressRecr] = useState("");
  const [photoRecr, setPhotoRecr] = useState(null);
  const [photoRecrLink, setPhotoRecrLink] = useState("");
  const [recrSent, setRecrCenter] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recreational_venue_id, setRecreational_venue_id] = useState(-1);
  const [dob, setDob] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const [savedRecVnId, setSavedRecVnId] = useState(-1);


    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        if (file) {
            setPhotoRecr(file);
            // Now send the file to the server
            const formData = new FormData();
            formData.append('photo', file);

            fetch('/upload', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(error => console.error('Error:', error));
        }
    };

    const handleSubmitRecr = async (e) => {
        setLoading(true);
        e.preventDefault();
        /*Avoid submitting the data, first perform other tasks*/

        try {
            console.log("TO GCP: "+`${photoRecr}`+" ** "+`recreational_venues/${nameRecr}`+" ** "+`photo_${getRandomInt(1,155555)}.xlsx`)
            uploadToGCP(`${photoRecr.path}`, `recreational_venues/${nameRecr}`, `photo_${getRandomInt(1,155555)}.xlsx`, 1)
                .then(link => {
                        console.log('Uploading file to:', link);
                        setPhotoRecrLink(link);
                    }
                )
                .catch(error => {
                    console.error('Error uploading file:', error);
                    alert(`Error uploading file: ${error.message}`);
                });

            const res = await api.post(routeRecr, {
                "name": nameRecr,
                "address": addressRecr,
                "photo": photoRecrLink
            });

            setSavedRecVnId(res.data.id)

        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
            setRecrCenter(true);
        }
    };


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    /*Avoid submitting the data, first perform other tasks*/

    try {

        if (recrSent === false){
            if ((recreational_venue_id == null) || (recreational_venue_id <= -1)){
                throw new Error("A recreational venue was not created or a " +
                    "valid ID number was not given");
            }
        } else {
            if ((recreational_venue_id == null) || (recreational_venue_id <= -1)){
                setRecreational_venue_id(savedRecVnId);
            }else {
                if (savedRecVnId !== recreational_venue_id){
                    throw new Error("A recreational venue was created but " +
                        "you have given an ID number different to it");
                }
            }
        }

        let data1  = {
            "first_name": name,
            "email": email,
            "password": password,
            "recreational_venue_id": recreational_venue_id,
            "dob": dob,
            "telephone": telephone,
            "address": address
        }
        console.log("!!!!!!Data: ", data1);

      const res = await api.post(routeAdmin, {
          "first_name": name,
          "email": email,
          "password": password,
          "recreational_venue_id": recreational_venue_id,
          "dob": dob,
          "telephone": telephone,
          "address": address
      });
      /*A registered user is redirected to login*/
        alert("Welcome! You can now log in with your credentials email and password");
      navigate("/login");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="h-screen w-[70%] overflow-y-auto scrollbar-hidden">
          <form onSubmit={handleSubmitRecr} className="myform-container">
              <h1 className="text-3xl text-black font-bold">Recreational Venue</h1>
              <p className="text-black"><br/>Register a Recreational Venue</p>
              <input
                  className="myform-input text-black"
                  type="text"
                  value={nameRecr}
                  onChange={(e) => setNameRecr(e.target.value)}
                  placeholder="Name Recreational Venue"
              />
              <input
                  className="myform-input text-black"
                  type="text"
                  value={addressRecr}
                  onChange={(e) => setAddressRecr(e.target.value)}
                  placeholder="Address"
              />
              <input
                  className="myform-input text-black"
                  type="file"
                  accept="image/*" // This restricts the file picker to images only
                  onChange={handleFileChange}
                  placeholder="Optional Photo"
              />
              {loading && <LoadingIndicator/>}
              <button className="myform-button font-bold" type="submit">
                  Submit
              </button>
          </form>
          <form onSubmit={handleSubmit} className="myform-container">
              <h1 className="text-3xl text-black font-bold">Register Admin</h1>
              <p className="text-black"><br/> If you are not admin avoid registering here. You have to click
                  on forgot my password/set user password </p>
              <input
                  className="myform-input text-black"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
              />
              <input
                  className="myform-input text-black"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
              />
              <input
                  className="myform-input text-black"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
              />
              <input
                  className="myform-input text-black"
                  type="number"
                  value={recreational_venue_id}
                  min="0"
                  onChange={(e) => setRecreational_venue_id(e.target.value)}
                  placeholder="Recreational venue ID"
              />
              <input
                  className="myform-input text-black"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="Date of Birth"
              />
              <input
                  className="myform-input text-black"
                  type="text"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="Telephone"
              />
              <input
                  className="myform-input text-black"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
              />
              {loading && <LoadingIndicator/>}
              <button className="myform-button font-bold" type="submit">
                  Register Admin
              </button>
          </form>
      </div>
  );
}

export default FormRegister;
