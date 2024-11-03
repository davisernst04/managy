"use client";

/*import { useState, useEffect } from "react";
import api from "@/api.js";
import "@/styles/FormRegister.css";
import LoadingIndicator from "./LoadingIndicator.jsx";
import { navigate } from "./actions.js";

let api_images = "/api/excel/"

function FormAdminUsers({ routeCreate, routeCreateBatch }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [recreational_venue_id, setrecreational_venue_id] = useState(-1);

    const [role1, setRole1] = useState(null);
    const [excellink, setExcellink] = useState(null);

    const [excelFile, setExcelFile] = useState(null);
    const [nameExcelFile, setNameExcelFile] = useState(null);

    const [loading, setLoading] = useState(false);


    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        if (file) {
            setExcelFile(file);
        }
    };

    const handleSubmitIndv = async (e) => {
        setLoading(true);
        e.preventDefault();


        try {

            const formData = new FormData();
            formData.append('first_name', name);
            formData.append('email', email);
            formData.append('role', role);
            formData.append('recreational_venue_id', recreational_venue_id);
            console.log(Array.from(formData.keys()));
            console.log(Array.from(formData.values()));
            const res = await api.post(routeCreate, formData);
            console.log(res.data);


        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };


  const handleSubmitBatch = async (e) => {
    setLoading(true);
    e.preventDefault();


    try {

        const formData = new FormData();
        formData.append('file', excelFile);
        formData.append('title', nameExcelFile);
        console.log(Array.from(formData.keys()));
        console.log(Array.from(formData.values()));
        const res0 = await api.post(api_excel, formData);
        console.log(res0.data);
        setExcellink(res0.data.url);


        let data1  = {
            "role": role1,
            "excel_link": res0.data.url
        }
        console.log("!!!!!!Data: ", data1);

      const res = await api.post(routeCreateBatch, data1);
      console.log(res.data);
      console.log(res.status);


        alert("User Created");

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
              <p className="text-black text-left">Recreational Value ID</p>
              <input
                  className="myform-input text-black"
                  type="number"
                  value={inputRecreationalVenueId}
                  min="0"
                  onChange={handleRecreationalVenueIdChange}
                  placeholder="Recreational venue ID"
              />
              <p className="text-black text-left">Date of Birth</p>
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

export default FormAdminUsers;
*/