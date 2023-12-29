import { useState } from "react";
import { Link } from "react-router-dom";

// const loggedInUser = () =>{
//   return false;
// }

// Title component for display logo
const Title = () => (
    <a href="/">
      <img className="logo" src="https://d1nfw7b4288zmf.cloudfront.net/shop/img/logo/tasteofindia/c4ef74ef50909a94.png" alt="Taste of India Logo" />
    </a>
  );
  

// Header component for header section: Logo, Nav Items
const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
      <div className="header">
        <Title />
        <div className="nav-items">
          <ul>
            <Link to="/"><li>Home</li></Link>
            <Link to="/about"><li>About</li></Link>
            <Link to="/contact"><li>Contact</li></Link>
            <li>Support</li>
            <li><i className="fa-solid fa-cart-shopping"></i></li>
          </ul>
        </div>
        {loggedIn ? 
        <button className="log-btn" onClick={()=>setLoggedIn(false)}>Logout</button> : 
        <button className="log-btn" onClick={()=>setLoggedIn(true)}>Login</button>}
      </div>
    );
  };

export default Header;