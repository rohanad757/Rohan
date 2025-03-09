import React, { useState, useContext } from 'react';
import './style/AddProduct.css';
import AppContext from '../../Context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    qty: '',
    imgSrc: ''
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addProduct } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!product.title.trim()) return "Title is required";
    if (!product.price) return "Price is required";
    if (!product.qty) return "Quantity is required";
    if (isNaN(product.price) || Number(product.price) <= 0) return "Price must be a positive number";
    if (isNaN(product.qty) || Number(product.qty) < 0) return "Quantity must be a non-negative number";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const result = await addProduct(
        product.title.trim(),
        product.description.trim(),
        Number(product.price),
        product.category.trim(),
        Number(product.qty),
        product.imgSrc.trim()
      );

      if (result) {
        setProduct({
          title: '',
          description: '',
          price: '',
          category: '',
          qty: '',
          imgSrc: ''
        });
        navigate('/');
        alert("Product added successfully!");
      }
    } catch (err) {
      setError("Failed to add product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </div>

        <div className="form-group">
          <label htmlFor="qty">Quantity *</label>
          <input
            type="number"
            id="qty"
            name="qty"
            value={product.qty}
            onChange={handleChange}
            placeholder="Enter quantity"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imgSrc">Image URL</label>
          <input
            type="text"
            id="imgSrc"
            name="imgSrc"
            value={product.imgSrc}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;