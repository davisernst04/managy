"use client";

import Form from "@/components/Form.jsx";
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
      <Form route="api/user/register/" method="register" />
    </div>
  );
};

export default LogOutRegister;
