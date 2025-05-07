import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Header.css';

const Header = () => {
  const [headerVisibile, setHeaderVisible] = useState(true);
  const prevScrollY = useRef(0);
  const { cart } = useCart();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > prevScrollY.current;
    const isThresholdPassed = currentScrollY > 100;

    if (isScrollingDown && isThresholdPassed) {
      setHeaderVisible(false);
    } else if (!isScrollingDown || !isThresholdPassed) {
      setHeaderVisible(true);
    }
    prevScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${!headerVisibile ? 'header--hidden' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src="/BnBLogo.png" alt="Bull & Barrel Logo" />
          </Link>
        </div>

        <nav className="navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li className="cart-item">
              <Link to="/cart">
                <div className="cart-icon-container">
                  <i className="fa fa-shopping-cart"></i>
                  {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
