"use client";

import Form from "@/components/Form.jsx";

const Login = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat
        flex justify-center items-center"
      style={{
        backgroundImage:
          "url('/images/house_login.jpg?height=1080&width=1920')",
      }}
    >
      <Form route="api/token/" method="login" />
    </div>
  );
};

export default Login;
