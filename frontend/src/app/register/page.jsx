"use client";

import Form from "@/components/FormRegister";
import { useEffect } from "react";

const LogOutRegister = () => {
  useEffect(() => {
    const handleLogoutRegister = () => {
      localStorage.clear();
    };

    handleLogoutRegister(); // Call the logout function when the component mounts
  }, []);

  return (
    <div
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat
          flex justify-center items-center"
        style={{
          backgroundImage:
              "url('/images/house_register.jpg?height=1080&width=1920')",
        }}
    >
      <Form routeRecr="/api/recreational_venue/create/" routeAdmin="/users/register/admin/"/>
    </div>
);
};

export default LogOutRegister;


/*

      <div className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
           style={{
             backgroundImage:
                 "url('/images/house_register.jpg?height=1080&width=1920')",
           }}>

        <div className="absolute inset-0 bg-black opacity-30"></div>

<div className="h-full flex justify-center items-center">
  <div className="myform-container">
    <Form routeRecr="/api/recreational_venue/create/" routeAdmin="/users/register/admin/"/>
  </div>
</div>
</div>

* */
