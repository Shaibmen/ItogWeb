import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="catalog-container">
            <div className="container">
                <h1>Каталог</h1>
                <div className="filter-section">
                    <input type="text" placeholder="Поиск товаров..." value={searchTerm} onChange={handleSearch}/>
                    <select value={selectedCategory} onChange={handleCategoryChange}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            marginLeft: '1rem',
                        }}>
                        <option value="all">Все категории</option>
                        <option value="Антиутопия">Антиутопия</option>
                        <option value="Манга">Манга</option>
                        <option value="Приключение">Приключение</option>
                    </select>
                </div>
                <div className="product-list">
                    {filteredProducts.map(product => (
                        <Link to={`/product/${product.id}`} key={product.id} className="product-item">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}>
                                    
                                <img src={product.image} alt={product.name} style={{ width: '200px', height: '250px' }} />
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p><strong>Категория:</strong> {product.category}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Catalog;
