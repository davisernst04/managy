"use client";

import AdminHeader from "@/components/AdminHeader";
import { useState } from "react";
import UserPanel from "@/components/UserPanel";
import { withAuth } from "@/components/withAuth";

const ManageUsers = () => {
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
          <form className="space-y-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="w-full p-2 border-4 border-black rounded-xl"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="w-full p-2 border-4 border-black rounded-xl"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border-4 border-black rounded-xl"
              required
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              className="w-full p-2 border-4 border-black rounded-xl"
              required
            />
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
export default ManageUsers;
