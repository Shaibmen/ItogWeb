import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

const ProductDetails = ({ products, addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isFavoriteButtonClicked, setIsFavoriteButtonClicked] = useState(false);
    const [isCartButtonClicked, setIsCartButtonClicked] = useState(false);

    useEffect(() => {
        console.log('Product ID from URL:', id);
        console.log('Products:', products);

        if (products.length > 0) {
            const productData = products.find(product => product.id === id);
            console.log('Found Product:', productData);
            setProduct(productData);
        }
    }, [id, products]);

    const handleAddToFavorites = () => {
        setIsFavoriteButtonClicked(true);
        if (product) {
            fetch('http://localhost:5000/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Товар успешно добавлен в избранное:', data);
            })
            .catch(error => console.error('Ошибка при добавлении товара в избранное:', error));
        }
    };

    const handleAddToCart = () => {
        setIsCartButtonClicked(true);
        if (product) {
            fetch('http://localhost:5000/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Товар успешно добавлен в корзину:', data);
                addToCart(product);
            })
            .catch(error => console.error('Ошибка при добавлении товара в корзину:', error));
        }
    };

    if (!product) {
        return <div>Loading...</div>; /* <----- если локальный сервер не поднимется */
    }

    return (
        <div className="product-details">
            <div className="product-card">
                <div className="product-card-content">
                    <div className="product-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-author">Автор: {product.author || "Неизвестен"}</p>
                        <p className="product-description">{product.fulldescription || product.description}</p>
                        <p className="product-price"><strong>Цена:</strong> {product.price} руб.</p>
                        <p className="product-availability"><strong>Наличие:</strong> {product.available ? 'В наличии' : 'Нет в наличии'}</p>
                        <div className="product-buttons">
                            <button onClick={handleAddToFavorites} className="add-to-favorites">
                                {isFavoriteButtonClicked ? 'Добавлено в избранное!' : 'В избранное'}
                            </button>
                            <button onClick={handleAddToCart} className="add-to-cart">
                                {isCartButtonClicked ? 'Добавлено в корзину!' : 'В корзину'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
