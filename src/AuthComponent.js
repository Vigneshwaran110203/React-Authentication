import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const token = cookies.get("TOKEN");

export default function AuthComponent(){

    const [message, setMessage] = useState("");

    
    useEffect(() => {
        const configuration = {
            method: "get",
            url: "https://nodejs-mongodb-user-auth.onrender.com/auth-endpoint",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        
        axios(configuration)
        .then((result) => {
            setMessage(result.data.message);
        })
        .catch((error) => {
            error = new Error();
        })
        
        // eslint-disable-next-line
    }, []);
    
    const logout = () => {

        cookies.remove("TOKEN", {
            path: "/"
        })
        window.location.href = "/";
    }

    return (
        <div className="text-center">
            <h1 className="text-center">Auth Component</h1>
            <h3 className="text-center text-danger">{message}</h3>

            <Button 
                type="submit" 
                variant="danger"
                onClick={() => logout()} >Logout</Button>   
        </div>
    )
}