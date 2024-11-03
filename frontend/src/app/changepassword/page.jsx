"use client";

import Form from "@/components/FormChangePassword";
import { useEffect } from "react";

const LogOutRegister = () => {

  return (
    <div
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat
          flex justify-center items-center"
        style={{
          backgroundImage:
              "url('/images/house_register.jpg?height=1080&width=1920')",
        }}
    >
      <Form routeToken="/user/resetpassword/" routeChange="/user/changepassword/"/>
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
