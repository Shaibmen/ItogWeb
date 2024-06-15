import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';

const Favorites = ({ addToCart }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/favorites')
            .then(response => response.json())
            .then(data => setFavorites(data))
            .catch(error => console.error('Ошибка при получении избранных товаров:', error));
    }, []);

    const removeFromFavorites = (id) => {
        fetch(`http://localhost:5000/favorites/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            console.log(`Товар с id ${id} удален из избранного`);
            setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== id));
        })
        .catch(error => console.error('Ошибка при удалении товара из избранного:', error));
    };

    const addToCartFromFavorites = (id) => {
        const favoriteItem = favorites.find(item => item.id === id);
        if (favoriteItem) {
            fetch('http://localhost:5000/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(favoriteItem),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Товар успешно добавлен в корзину:', data);
                addToCart(favoriteItem);
                removeFromFavorites(id);
            })
            .catch(error => console.error('Ошибка при добавлении товара в корзину:', error));
        }
    };
    

    return (
        <div className="favorites">
            <h2>Избранное</h2>
            {favorites.length === 0 ? (
                <p>Избранных товаров нет.</p>
            ) : (
                <div className="favorites-list">
                    <AnimatePresence>
                        {favorites.map(favorite => (
                            <motion.div
                                key={favorite.id}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="favorite-item">
                                    
                                <img src={favorite.image} alt={favorite.name} className="favorite-image" />
                                <div className="favorite-info">
                                    <h3>{favorite.name}</h3>
                                    <p>{favorite.price} руб.</p>
                                    <div className="favorite-buttons">
                                        <button onClick={() => addToCartFromFavorites(favorite.id)} className="add-to-cart">Добавить в корзину</button>
                                        <button className="remove-from-favorites" onClick={() => removeFromFavorites(favorite.id)}>Удалить из избранного</button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default Favorites;
