import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap"
import axios from "axios";

export default function Register(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();

        const configuration = {
            method: "post",
            url: "https://nodejs-mongodb-user-auth.onrender.com/register",
            data: {
                email,
                password,
            }
        }
        
        axios(configuration)
        .then((result) => {
            setRegister(true);
        })
        .catch((error) => {
            error = new Error();
        })
    }

    return(
        <>
            <h2>Register</h2>
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <Form.Group controlId="formBasicEmail" className="mt-2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email"
                        name='email'
                        value={email} 
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='formBasicPassword' className="mt-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        name='password'
                        value={password} 
                        placeholder="Enter Email"
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button 
                    variant="primary" 
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    className="mt-2" >
                    Register
                </Button>
            </Form>
            {register ? (
                <p className='text-success'>You are registered successfully</p>
            ) : (
                <p className='text-danger'>You are not registered</p>
            )
            }
        </>
    )
}