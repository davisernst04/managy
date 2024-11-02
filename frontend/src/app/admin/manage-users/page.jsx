"use client";

import AdminHeader from "@/components/AdminHeader";
import { useState } from "react";
import User from "@/components/User";
import { withAuth } from "@/components/withAuth";

const ManageUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
      role: "member",
    },
  ]);

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
  });


  return (
    <div className="min-h-screen bg-white text-black">
      <AdminHeader />
      <div className="text-center text-3xl font-bold py-4">
        <h2>Manage Users</h2>
      </div>
      <div className="mx-8 flex flex-row items-start justify-center space-x-16">
        <div className="border-8 bg-orange-200 border-black rounded w-full flex-grow p-4">
          {users.length > 0 ? (
            users.map((user) => <User user={user} key={user.id} />)
          ) : (
            <p className="text-center text-black font-bold">No users in the system</p>
          )}
        </div>        <div className="border-8 border-black p-6 rounded shadow-lg w-80 text-center bg-orange-200">
          <h3 className="text-xl font-bold mb-4">Add User</h3>
          <form className="space-y-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full border-4 border-black bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

//export default withAuth(ManageUsers);
export default ManageUsers;
