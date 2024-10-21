'use client';

import Form from "../app/components/Form.jsx";

function Register() {
    return <Form route="api/user/register/" method="register" />
}

export default Register;