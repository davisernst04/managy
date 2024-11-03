"use client";

import { useEffect, useState } from "react";
import { isAuthorized } from "./ProtectedRoute.jsx";

/*import { useRouter } from 'next/navigation'*/
import { navigate } from "./actions.js";
import { ROLE } from "@/constants";

/*Options for role are "admin", "member", "worker". And "" allow any authenticated user*/
export const withAuth = (WrappedComponent, role) => {
  return function WithAuth(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const authorized = await isAuthorized();
        if (!authorized) {
          /*redirect("/login");*/
          navigate("/login");
          setIsAuth(false);
        } else {
          setIsAuth(true);
        }
        setIsLoading(false);
      };

      checkAuth();
    }, []);

    if (isLoading) {
      return <div>Loading...</div>; // You can show a loading indicator here
    }

    if (!isAuth) {
      alert("User is no authenticated");
      navigate("/login");
      return null; // No need to render the component if not authorized
    }

    if (role === "") {
      return <WrappedComponent {...props} />;
    }

    const cur_role = localStorage.getItem(ROLE);
    console.log("Role is "+cur_role);
    if (cur_role !== role ){
      alert("User has no permission to get this page");
      navigate(`/${cur_role}`);
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};
