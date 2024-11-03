"use client";

import Form from "@/components/FormAdminUsers";
import { useEffect } from "react";
import {navigate} from "@/components/actions";

const CreateUsers = () => {

    return (
        <div
            className="fixed top-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat
        flex flex-col justify-center items-center"
            style={{
                backgroundImage:
                    "url('/images/house_register.jpg?height=1080&width=1920')",
            }}
        >
        </div>
    );
};

export default CreateUsers;

/*<Form routeCreate="/users/admin/createuser/" routeCreateBatch="/user/admin/createuserbatch/"/>*/