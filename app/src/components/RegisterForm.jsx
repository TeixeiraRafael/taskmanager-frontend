import { useState } from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const RegisterForm = ({registerUser}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(username, email, password);
    }
    return(
        <>
            <Form onSubmit={ e => handleSubmit(e)}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Usename</Form.Label>
                    <Form.Control required type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </>
    )
}

export default RegisterForm;