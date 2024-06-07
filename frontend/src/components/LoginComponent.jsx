import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        const auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
       
    })

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.warn(email, password);
        try {
            let result = await fetch('http://localhost:5000/login', {
                method: "POST",
                body: JSON.stringify({email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            console.warn(result);
            if (result.name){
                localStorage.setItem('user',JSON.stringify(result))
                navigate('/')
                
            }
            else{
                alert('Invalid Credentials')
               
            }
           

        } catch (error) {
            // console.error("Error:", error);
            setMessage("login failed");
        }
    };

    return ( 
        <form onSubmit={handleOnSubmit}>
            <div className="register">
                <h1>Login</h1>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" id="email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Enter password" id="Password1" required />
                <button type="submit" className="">Submit</button>
                {message && <p>{message}</p>}
            </div>
        </form>
     );
}
 
export default Login;