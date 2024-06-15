import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import ContactForm from "../components/ContracrtForm"; 

const Home = () => {
    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setNewProducts(data.slice(0, 4))); 
    }, []);

    return (
        <div className="home-container">
            <div className="container">
                <div className="intro">
                    <motion.h1 
                        initial={{ opacity: 0, y: -50 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 1 }}>
                        Добро пожаловать в Book Store
                    </motion.h1>

                    <motion.div 
                        className="info-section"
                        initial={{ opacity: 0, x: -100 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8 }}>
                        <div className="icon">📚</div>
                        <div className="text">
                            <h2>О нас</h2>
                            <p>Book Store - это интернет-магазин, предлагающий широкий ассортимент книг на любой вкус и предпочтение. Мы гордимся тем, что предоставляем нашим клиентам доступ к лучшей литературе со всего мира.</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="info-section"
                        initial={{ opacity: 0, x: -100 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8, delay: 0.2 }}>
                        <div className="icon">🚚</div>
                        <div className="text">
                            <h2>Быстрая доставка</h2>
                            <p>Мы обеспечиваем быструю и надежную доставку всех ваших заказов. Независимо от того, где вы находитесь, ваш заказ будет доставлен вовремя и в отличном состоянии.</p>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="info-section"
                        initial={{ opacity: 0, x: -100 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8, delay: 0.4 }}>
                        <div className="icon">💳</div>
                        <div className="text">
                            <h2>Удобные способы оплаты</h2>
                            <p>Мы принимаем множество способов оплаты, включая кредитные карты, электронные кошельки и банковские переводы, чтобы сделать процесс покупки максимально удобным для вас.</p>
                        </div>
                    </motion.div>
                </div>
                <div className="products">
                    <h2>Новинки</h2>
                    <div className="product-list">
                        {newProducts.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id} className="product-item">
                                <motion.div
                                    className="product-item-content"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}>
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
                <ContactForm />
            </div>
        </div>
    );
}

export default Home;
