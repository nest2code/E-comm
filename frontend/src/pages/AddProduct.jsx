import {useState } from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
    const [name,setName] = useState('')
    const navigate = useNavigate()
    const [category,setCategory]= useState('')
    const [price, setPrice] = useState('')
    const [company,setCompany] = useState('')
    const [message,setMessage] = useState('')
    const [error,setError] = useState(false)
    const handleOnSubmit = async(e)=>{
        const auth = localStorage.getItem('user')
        e.preventDefault();
        console.log(auth)
        const userId = JSON.parse(auth)._id

        if (!name || !price || !category || !company){
            setError(true)
            return false
        }
        console.log(userId,name,price,category,company);
        try{
        let result = await fetch("http://localhost:5000/add-product",{
            method:"POST",
            body:JSON.stringify({name,price,category,userId,company}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        result = await result.json()
        navigate('/')
       setMessage(result.message)
    }
    catch(error){
        setMessage('Product not added successfuly')
    }
    }

    return ( 

        <form onSubmit={handleOnSubmit}>
        <div className="register">
            <h1>Add Product</h1>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name" id="name"  />
            {error && !name &&<span className="error-check">product name missing</span>}
            <input  type="text" onChange={(e)=>setCategory(e.target.value)} value={category} name="category" placeholder="Category" id="category"  />
            {error && !category && <span className="error-check">product category missing</span>}
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} name="price" placeholder="Enter price" id="price"  />
            {error && !price && <span className="error-check">product price missing</span>}
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} name="company" placeholder="Enter company" id="company" />
            {error && !company &&  <span className="error-check">company name missing</span>}
            <button type="submit" className="">Add Product</button>
            {message && <p>{message}</p>}
        </div>
    </form>

     );
}
 
export default AddProduct;