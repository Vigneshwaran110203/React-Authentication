import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const configuration = {
      method: 'post',
      url: 'https://nodejs-mongodb-user-auth.onrender.com/login',
      data: {
        email,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // set the cookie
        cookies.set('TOKEN', result.data.token, {
          path: '/',
        });
        // redirect user to the auth page
        navigate('/auth');

        setLogin(true);
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail" className="mt-2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit"
          className="mt-2">
          Login
        </Button>
      </Form>

      {login ? (
        <p className="text-success">You are Logged in Successfully</p>
      ) : (
        <p className="text-danger">You are Not Logged in</p>
      )}
    </>
  );
}
