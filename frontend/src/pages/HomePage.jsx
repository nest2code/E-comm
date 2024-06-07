import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
   

    const getProducts = async () => {
        try {
            let result = await fetch("http://localhost:5000");
            result = await result.json();
            setProducts(result);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setMessage("Failed to load products");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleDelete = async (e) => {
        const { value } = e.target;

        try {
            let deleteProduct = await fetch(`http://localhost:5000/delete-product/${value}`, {
                method: "Delete"

            });
            const result = await deleteProduct.json();

            if (result.success) {
                // Update state to remove the deleted product
                setProducts(products.filter(product => product._id !== value));
                setMessage('Product deleted successfully');
            } else {
                setMessage('Product not deleted successfully');
            }
        } catch (err) {
            setMessage('Product not deleted successfully');
        }
    };

    return (
        <div className="products">
            <h3>Product List</h3>
            <ul>
                <li>
                    <h6>S. No</h6>
                </li>
                <li>
                    <h6>Name</h6>
                </li>
                <li>
                    <h6>Price</h6>
                </li>
                <li>
                    <h6>Category</h6>
                </li>
                <li>
                    <h6>Action</h6>
                </li>
            </ul>
            {products.length > 0 ? products.map((product, index) => (
                <ul key={product._id}>
                    <li>
                        <h6>{index + 1}</h6>
                    </li>
                    <li>
                        <h6>{product.name}</h6>
                    </li>
                    <li>
                        <h6>{product.price}</h6>
                    </li>
                    <li>
                        <h6>{product.category}</h6>
                    </li>
                    <li>
                      <Link style={{marginRight:20}} className="btn btn-primary btn-sm" to={`/update/${product._id}`}> Update </Link>
                        <button className="btn btn-danger btn-sm"
                            value={product._id}
                            onClick={handleDelete}
                            type="button"
                        >
                            Delete
                        </button>
                    </li>
                </ul>
            )) : <p>No available products</p>}
            {message && <span>{message}</span>}
        </div>
    );
};

export default Home;
