import React, { useState, useEffect } from 'react';
import '../css/ProductManagement.css';

// Mock data (replace with API calls)
const mockProducts = [
  {
    id: "sc1",
    adminId: "monu",
    image: "example.jpg",
    product_name: "Banana - Yelakki",
    quantity: 1,
    weight: "500 g",
    price: 48,
    discount: 10,
    total_price: null,
    status: null,
    description: "Fresh, tiny small sized, directly procured from the farm, this variety…"
  }
  // Add more products as needed
];

const ProductManagement = () => {
  const [products, setProducts] = useState(mockProducts);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form, setForm] = useState({
    adminId: '',
    image: null,
    product_name: '',
    quantity: '',
    weight: '',
    price: '',
    discount: '',
    total_price: '',
    status: '',
    description: ''
  });

  useEffect(() => {
    if (currentProduct) {
      setForm({
        adminId: currentProduct.adminId,
        image: null,
        product_name: currentProduct.product_name,
        quantity: currentProduct.quantity,
        weight: currentProduct.weight,
        price: currentProduct.price,
        discount: currentProduct.discount,
        total_price: currentProduct.total_price,
        status: currentProduct.status,
        description: currentProduct.description
      });
    } else {
      setForm({
        adminId: '',
        image: null,
        product_name: '',
        quantity: '',
        weight: '',
        price: '',
        discount: '',
        total_price: '',
        status: '',
        description: ''
      });
    }
  }, [currentProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentProduct) {
      // Update product
      setProducts(products.map((prod) =>
        prod.id === currentProduct.id
          ? { ...prod, ...form, image: form.image ? URL.createObjectURL(form.image) : prod.image }
          : prod
      ));
    } else {
      // Create product
      setProducts([...products, { id: Date.now().toString(), ...form, image: form.image ? URL.createObjectURL(form.image) : null }]);
    }
    setCurrentProduct(null);
    setForm({
      adminId: '',
      image: null,
      product_name: '',
      quantity: '',
      weight: '',
      price: '',
      discount: '',
      total_price: '',
      status: '',
      description: ''
    });
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="adminId"
          value={form.adminId}
          onChange={handleInputChange}
          placeholder="Admin ID"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        {form.image && <img src={URL.createObjectURL(form.image)} alt="Preview" className="image-preview" />}
        <input
          type="text"
          name="product_name"
          value={form.product_name}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          required
        />
        <input
          type="text"
          name="weight"
          value={form.weight}
          onChange={handleInputChange}
          placeholder="Weight"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="discount"
          value={form.discount}
          onChange={handleInputChange}
          placeholder="Discount"
          required
        />
        <input
          type="text"
          name="total_price"
          value={form.total_price}
          onChange={handleInputChange}
          placeholder="Total Price"
        />
        <input
          type="text"
          name="status"
          value={form.status}
          onChange={handleInputChange}
          placeholder="Status"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <button type="submit">{currentProduct ? 'Update Product' : 'Add Product'}</button>
        {currentProduct && <button type="button" onClick={() => setCurrentProduct(null)}>Cancel</button>}
      </form>
      <div className="product-list">
        <h3>Product List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Admin ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.adminId}</td>
                <td><img src={product.image} alt={product.product_name} className="image-preview" /></td>
                <td>{product.product_name}</td>
                <td>{product.quantity}</td>
                <td>{product.weight}</td>
                <td>${product.price}</td>
                <td>{product.discount}%</td>
                <td>{product.total_price ? `$${product.total_price}` : '-'}</td>
                <td>{product.status || '-'}</td>
                <td>{product.description}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
