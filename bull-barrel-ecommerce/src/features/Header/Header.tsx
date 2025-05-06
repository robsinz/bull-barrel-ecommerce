import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Header.css';

const Header = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
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
          </ul>
        </nav>

        <div className="cart-container">
          <Link to="/cart">
            <div className="cart-icon-container">
              <i className="fa fa-shopping-cart"></i>
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
