import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Headergpt_3.css';
import logo from "../../img/logo.png";
const Headergpt_3 = () => {
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const updateCartCount = () => {
            const savedCart = localStorage.getItem('cart');
            if (!savedCart) {
                setCartCount(0);
            } else {
                try {
                    const cart = JSON.parse(savedCart);
                    const totalItems = cart.reduce(
                        (sum, item) => sum + (item.quantity || 0),
                        0
                    );
                    setCartCount(totalItems);
                } catch (error) {
                    console.error('Lỗi đọc giỏ hàng:', error);
                    setCartCount(0);
                }
            }
        };

        const updateCurrentUser = () => {
            const savedUser = localStorage.getItem('currentUser');
            if (!savedUser) {
                setCurrentUser(null);
                return;
            }

            try {
                const user = JSON.parse(savedUser);
                setCurrentUser(user);
            } catch (error) {
                console.error('Lỗi đọc thông tin người dùng:', error);
                setCurrentUser(null);
            }
        };

        // Cập nhật ngay khi load trang
        updateCartCount();
        updateCurrentUser();

        // Lắng nghe khi giỏ hàng hoặc user được cập nhật
        window.addEventListener('cartUpdated', updateCartCount);
        window.addEventListener('userUpdated', updateCurrentUser);
        window.addEventListener('storage', () => {
            updateCartCount();
            updateCurrentUser();
        });

        return () => {
            window.removeEventListener('cartUpdated', updateCartCount);
            window.removeEventListener('userUpdated', updateCurrentUser);
            window.removeEventListener('storage', () => {
                updateCartCount();
                updateCurrentUser();
            });
        };
    }, []);

    // Dropdown menu items (Đã đổi sang đồ ăn nhanh)
    const fastfoodMenuItems = [
        { text: 'Gà Rán Giòn', href: '/menu/ga-ran' },
        { text: 'Burger Các Loại', href: '/menu/burger' },
        { text: 'Pizza Đậm Vị', href: '/menu/pizza' },
        { text: 'Món Phụ & Ăn Vặt', href: '/menu/mon-phu' }
    ];

    return (
        <header className="fastfood-header">
            {/* Top Section: Header Bar */}
            <div className="header-top-bar">
                <div className="header-top-content">
                    {/* Left: Free Delivery Info */}
                    <div className="header-delivery-info">
                        <span className="delivery-text">Giao Hàng Miễn Phí</span>
                        <i className="fas fa-phone delivery-icon"></i>
                        <span className="delivery-phone">0799957954</span>
                        <div className="delivery-scooter">
                            <i className="fas fa-motorcycle"></i>
                        </div>
                    </div>

                    
                   <div className="header-logo-container">
                        <div className="fastfood-logo">
                            <img src={logo} alt="Logo" className="header-logo-image" />
                        </div>
                    </div> 

                    {/* Right: User Actions */}
                    <div className="header-user-actions">
                        <button
                            className="login-link"
                            onClick={() => navigate('/login')}
                        >
                            <i className="fas fa-user"></i> {/* Thêm icon user vào đây */}
                            <span>{currentUser ? (currentUser.name || currentUser.user) : 'Đăng nhập'}</span>
                        </button>
                        <span className="action-separator">|</span>
                        <div className="language-selector">
                            <span className="lang-active">VN</span>
                            <span className="lang-separator">|</span>
                            <span className="lang-option">EN</span>
                        </div>
                        <button
                            className="cart-button"
                            onClick={() => navigate('/cart')}
                        >
                            <i className="fas fa-shopping-cart"></i>
                            <span>Giỏ hàng</span>
                            <span className="cart-badge">{cartCount}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Navigation Bar (Đã đổi menu) */}
            <nav className="header-navigation">
                <div className="nav-content">
                    <a href="/" className="nav-link">TRANG CHỦ</a>

                    {/* THỰC ĐƠN với Dropdown */}
                    <div
                        className="nav-item-with-dropdown"
                        onMouseEnter={() => setHoveredMenu('menu')}
                        onMouseLeave={() => setHoveredMenu(null)}
                    >
                        <a href="/menu" className={`nav-link ${hoveredMenu === 'menu' ? 'active' : ''}`}>
                            THỰC ĐƠN
                        </a>
                        {hoveredMenu === 'menu' && (
                            <div className="dropdown-menu">
                                {fastfoodMenuItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className="dropdown-item"
                                    >
                                        {item.text}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    <a href="/combo" className="nav-link">COMBO SIÊU TIẾT KIỆM</a>
                    <a href="/drinks-desserts" className="nav-link">THỨC UỐNG & TRÁNG MIỆNG</a>
                    <a href="/promotions" className="nav-link">KHUYẾN MÃI</a>
                    <a href="/about" className="nav-link">VỀ CHÚNG TÔI</a>
                </div>
            </nav>
        </header>
    );
};

export default Headergpt_3;