import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="container">
                <nav>
                    <div className="brand">Book Store</div>
                    <div className="nav-links">
                        <Link to="/">Главная</Link>
                        <Link to="/catalog">Каталог</Link>
                        <Link to="/favorites">Избранное</Link>
                        <Link to="/cart">Корзина</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
