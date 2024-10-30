"use client";

import { useState, useEffect } from "react";
import api from "@/api";

const User = () => {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    getUsers();
  }, []);


  const getUsers = () => {
    api
      .get("/api/user/view/")
      .then((res) => res.data)
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const createUser = (e) => {
    e.preventDefault();
    api
      .post("/api/admin/createuser/", { firstName, lastName, email, role, })
      .then((res) => {
        if (res.status === 201) alert("User created");
        else alert("Failed to create user");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <div>
        <h2>Users</h2>
        {users.map((user) => (
          <User user={user} key={user.first_name} />
        ))}
      </div>
      <h2>Create a User</h2>
      <form onSubmit={createUser}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <br />
          <input
            type="name"
            id="firstName"
            name="firstName"
            required
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>

        <div>
          <label htmlFor="lastName">lastName:</label>
          <br />
          <input
            id="lastName"
            name="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="role">Role:</label>
          <br />
          <input
            id="role"
            name="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};


export default User;
