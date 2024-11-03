"use client";

import AdminHeader from "@/components/AdminHeader";
import { useState } from "react";
import UserPanel from "@/components/UserPanel";
import { withAuth } from "@/components/withAuth";
import api from "@/api";
import LoadingIndicator from "@/components/LoadingIndicator";
import { generateRandomString } from '@/utils/tools';

const api_createUsrAdmin = "/users/admin/createuser/";
const api_excel = "/api/excel/";
const routeCreateBatch = "/user/admin/createuserbatch/";

const ManageUsers = () => {
  const [firstName1, setFirstName1] = useState("");
  const [lastName1, setLastName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [role1, setRole1] = useState("");


  const [role2, setRole2] = useState(null);
  const [excellink, setExcellink] = useState(null);

  const [excelFile, setExcelFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([
    {
      id: 1,
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
      role: "Member",
    },
  ]);

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });


  // –– Mock methods to simulate API
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openEditForm = (user) => {
    setSelectedUser(user);
    setShowEditForm(true);
  };

  const closeEditForm = () => {
    setSelectedUser(null);
    setShowEditForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmitBatch = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {

      /*Get Link*/
      const formData = new FormData();
      formData.append('file', excelFile);
      formData.append('title', generateRandomString(10));
      console.log(Array.from(formData.keys()));
      console.log(Array.from(formData.values()));
      const res0 = await api.post(api_excel, formData);
      console.log(res0.data);
      setExcellink(res0.data.url);


      let data1 = {
        "role": role2,
        "excel_link": res0.data.url
      }
      console.log("!!!!!!Data: ", data1);
      const res = await api.post(routeCreateBatch, data1);
      console.log(res.data);
      console.log(res.status);

      alert("Users Created");

    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitUser = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {

      let data1 = {
        'first_name': firstName1+" "+lastName1,
        'email': email1,
        'role': role1,
        'recreational_venue_id': null
      }
      console.log(data1);
      api
          .post(api_createUsrAdmin, data1)
          .then((res) => {
            if (res.status === 201){
              console.log(res.data);
              alert("User created with ID: "+res.data.id);
            } else alert("Failed to make note.");

          })
          .catch((err) => alert(err));

    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };





  // ––Use methods below when implemtning API

  //const getUser s= () => {
  //  api
  //    .get("/api/users/view/")
  //    .then((res) => res.data)
  //    .then((data) => {
  //      setNotes(data);
  //      console.log(data);
  //    })
  //    .catch((err) => alert(err));
  //};

  //const deleteUser = (id) => {
  //  api
  //    .delete(`/api/users/delete/${id}/`)
  //    .then((res) => {
  //      if (res.status === 204) alert("User deleted");
  //      else alert("Failed to delete user.");
  //      getNotes();
  //    })
  //    .catch((error) => alert(error));
  //};

  //const createUser = (e) => {
  //  e.preventDefault();
  //  api
  //    .post("/api/register/user/", { first_name, last_name, email, role })
  //    .then((res) => {
  //      if (res.status === 201) alert("User created!");
  //      else alert("Failed to create user.");
  //      getNotes();
  //    })
  //    .catch((err) => alert(err));
  //};

  return (
    <div className="min-h-screen bg-white text-black">
      <AdminHeader />
      <div className="text-center text-3xl font-bold py-4">
        <h2>Manage Users</h2>
      </div>
      <div className="flex mx-8 my-1">
        <div>
          <h2 className="mt-1">
            Search by First Name
          </h2>
          <h2 className="mt-1">
            Search by Last Name
          </h2>
          <h2 className="mt-1">
            Search by User ID
          </h2>
          <h2 className="mt-1">
            Search by User Role
          </h2>
        </div>
        <div>
          <form onSubmit="" className="mx-4 border-black border-2" >
            <input
              type="text"
              name="User Search"

            />
          </form>
          <form onSubmit="" className="mx-4 border-black border-2" >
            <input
              type="text"
              name="User Search"

            />
          </form>
          <form onSubmit="" className="mx-4 border-black border-2" >
            <input
              type="text"
              name="User Search"

            />
          </form>
          <form onSubmit="" className="mx-4 border-black border-2" >
            <input
              type="text"
              name="User Search"

            />
          </form>

        </div>
      </div>




      <div className="mx-8 flex flex-row items-start justify-center space-x-16">
        <div className="border-8 bg-orange-200 border-black rounded w-full flex-grow p-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id}>
                <UserPanel user={user} onEditClick={() => openEditForm(user)} />
              </div>))
          ) : (<p className="text-center text-black font-bold">No users in the system</p>
          )}
        </div>
        <div className="border-8 border-black p-6 rounded shadow-lg w-80 text-center bg-orange-200">
          <h3 className="text-xl font-bold mb-4">Add User</h3>
          <form onSubmit={handleSubmitUser} className="space-y-4">
            <input
              type="text"
              name="first_name"
              value={firstName1}
              onChange={(e) => setFirstName1(e.target.value)}
              placeholder="First Name"
              className="w-full p-2 border-4 border-black rounded-xl"
              required
            />
            <input
              type="text"
              name="last_name"
              value={lastName1}
              onChange={(e) => setLastName1(e.target.value)}
              placeholder="Last Name"
              className="w-full p-2 border-4 border-black rounded-xl"
              required
            />
            <input
              type="email"
              name="email"
              value={email1}
              onChange={(e) => setEmail1(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border-4 border-black rounded-xl"
              required
            />
            <select
              name="role"
              value={role1}
              onChange={(e) => setRole1(e.target.value)}
              className="w-full p-2 border-4 border-black rounded-xl"
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
              <option value="worker">Worker</option>
            </select>
            {loading && <LoadingIndicator />}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-3xl hover:bg-blue-600"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
      {showEditForm && selectedUser && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-orange-200 p-6 rounded shadow-lg w-80 text-center border-black border-4">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <form className="space-y-4">
              <input
                type="text"
                name="first_name"
                value={selectedUser.first_name}
                onChange={handleInputChange}
                className="w-full p-2 rounded-xl border-4 border-black"
              />
              <input
                type="text"
                name="last_name"
                value={selectedUser.last_name}
                onChange={handleInputChange}
                className="w-full p-2 border-4 rounded-xl border-black"
              />
              <input
                type="email"
                name="email"
                value={selectedUser.email}
                onChange={handleInputChange}
                className="w-full p-2 border-4 rounded-xl border-black"
              />
              <input
                type="text"
                name="role"
                value={selectedUser.role}
                onChange={handleInputChange}
                className="w-full p-2 border-4 rounded-xl border-black"
              />
              <div className="flex space-x-4 mt-4">
                <button
                  type="button"
                  className="w-full bg-blue-500 text-white p-2 rounded-3xl hover:bg-blue-600 shadow-xl"
                  onClick={closeEditForm}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="w-full bg-red-500 text-white p-2 rounded-3xl hover:bg-red-600 shadow-xl"
                  onClick={closeEditForm}
                >
                  Delete
                </button>

                <button
                  type="button"
                  className="w-full bg-gray-500 text-white p-2 rounded-3xl hover:bg-gray-600 shadow-xl"
                  onClick={closeEditForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

//export default withAuth(ManageUsers);
export default withAuth(ManageUsers, ["admin"]);
