import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    const getProductDetails = async () => {
        try {
            let result = await fetch(`http://localhost:5000/update/${params.id}`);
            result = await result.json();
            setName(result.name);
            setCategory(result.category);
            setPrice(result.price);
            setCompany(result.company);
        } catch (error) {
            console.error("Failed to fetch product details:", error);
        }
    };

    useEffect(() => {
        getProductDetails();
    }, [params.id]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await fetch(`http://localhost:5000/update/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({ name, category, price, company }),
                headers: {
                    'Content-Type': "application/json"
                }
            });
            result = await result.json();
            console.log("Update response:", result);
            setName(result.name);
            setCategory(result.category);
            setPrice(result.price);
            setCompany(result.company);
            navigate('/');
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <div className="register">
                <h1>Update Product</h1>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                        console.log("Name changed:", e.target.value);
                        setName(e.target.value);
                    }}
                    placeholder="Enter product name"
                    id="name"
                />
                <input
                    type="text"
                    onChange={(e) => {
                        console.log("Category changed:", e.target.value);
                        setCategory(e.target.value);
                    }}
                    value={category}
                    name="category"
                    placeholder="Category"
                    id="category"
                />
                <input
                    type="text"
                    value={price}
                    onChange={(e) => {
                        console.log("Price changed:", e.target.value);
                        setPrice(e.target.value);
                    }}
                    name="price"
                    placeholder="Enter price"
                    id="price"
                />
                <input
                    type="text"
                    value={company}
                    onChange={(e) => {
                        console.log("Company changed:", e.target.value);
                        setCompany(e.target.value);
                    }}
                    name="company"
                    placeholder="Enter company"
                    id="company"
                />
                <button type="submit" className="">Update Product</button>
            </div>
        </form>
    );
};

export default UpdateProduct;
