import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }

    },[navigate])
    const handleOnchangeName = (e) => {
        setName(e.target.value);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.warn(name, email, password);
        try {
            let result = await fetch('http://localhost:5000/register', {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            console.warn(result);
            localStorage.setItem("user",result)
            navigate('/')
            setMessage(result.message);

        } catch (error) {
            console.error("Error:", error);
            setMessage("Registration failed");
        }
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <div className="register">
                <h1>Register</h1>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" id="email" required />
                <input type="text" onChange={handleOnchangeName} value={name} name="name" placeholder="Username" id="username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Enter password" id="Password1" required />
                <button type="submit" className="">Submit</button>
                {message && <p>{message}</p>}
            </div>
        </form>
    );
};

export default Register;
