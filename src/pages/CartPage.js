import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import '../App.css';
import Captcha from '../components/Captcha'; 

const Cart = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [cartItems, setCartItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaPassed, setCaptchaPassed] = useState(false);
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/cart')
            .then(response => response.json())
            .then(data => setCartItems(data))
            .catch(error => console.error('Ошибка при получении товаров в корзине:', error));
    }, []);

    const removeFromCart = (id) => {
        fetch(`http://localhost:5000/cart/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            console.log(`Товар с id ${id} удален из корзины`);
            setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== id));
        })
        .catch(error => console.error('Ошибка при удалении товара из корзины:', error));
    };

    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price, 0);
    };

    const onSubmitOrder = (data) => {
        setOrderData(data); 
        setShowCaptcha(true); 
    };

    const handleCaptchaChange = (isPassed) => {
        setCaptchaPassed(isPassed);
        if (isPassed && orderData) { 
            const serviceId = 'service_rmxvk4i'; 
            const templateId = 'template_tapt68w'; 
            const userId = 'xyG2cIpf1bcMts_dn'; 

            const itemsString = cartItems.map(item => `${item.name}: ${item.price} руб.`).join('\n');
        
            const orderDataToSend = {
                to_name: orderData.name,
                email: orderData.email,
                address: orderData.address,
                paymentMethod: paymentMethod,
                items: itemsString, 
                total: calculateTotal()
            };
        
            emailjs.send(serviceId, templateId, orderDataToSend, userId)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Ваш заказ успешно оформлен!');
                    setShowCaptcha(false); 
                })
                .catch((error) => {
                    console.error('FAILED...', error);
                    alert('Произошла ошибка при оформлении заказа. Попробуйте еще раз.');
                    setShowCaptcha(false);
                });
        } else {
            alert('Неправильный ввод капчи. Попробуйте еще раз.');
        }
    };

    return (
        <div className="cart">
            <div className="cart-items">
                <h2>Корзина</h2>
                {cartItems.length === 0 ? (
                    <p>Ваша корзина пуста.</p>
                ) : (
                    <div className="cart-items-list">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-image" />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>Цена: {item.price} руб.</p>
                                    <button className="remove-from-cart" onClick={() => removeFromCart(item.id)}>Удалить</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="cart-total">
                    <h3>Итоговая стоимость: {calculateTotal()} руб.</h3>
                </div>
            </div>
            <div className="order-form">
                <h2>Оформление заказа</h2>
                <form onSubmit={handleSubmit(onSubmitOrder)}>
                    <input type="text" placeholder="Ваше имя" {...register('name', { required: true })}/>
                    {errors.name && <span>Это поле обязательно для заполнения</span>}

                    <input type="email" placeholder="Ваш Email" {...register('email', { required: true })}/>
                    {errors.email && <span>Это поле обязательно для заполнения</span>}

                    <input type="text" placeholder="Ваш адрес" {...register('address', { required: true })}/>

                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="">Выберите способ оплаты</option>
                        <option value="cash">Наличными</option>
                        <option value="card">Картой</option>
                    </select>
                    <button className="order-button" type="submit">Оформить заказ</button>
                </form>
            </div>
            {showCaptcha && <Captcha onCaptchaChange={handleCaptchaChange} />}
        </div>
    );
};

export default Cart;
