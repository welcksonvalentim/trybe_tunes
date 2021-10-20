import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header
        data-testid="header-component"
      >
        <nav>
          <ul>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/album/:id">Album</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/profile/edit">ProfileEdit</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
