import React from 'react';
import { Link } from 'react-router-dom';
import '../pagesCSS/Header.css';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <nav>
          <ul className="linksToPages">
            <Link to="/search" data-testid="link-to-search">Search</Link>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
