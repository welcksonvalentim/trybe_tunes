import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../pagesCSS/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    this.showName();
  }

  showName = () => {
    this.setState({
      loading: true,
    }, async () => {
      const profileUser = await getUser();
      this.setState({
        name: profileUser.name,
        loading: false,
        nameLoad: true,
      });
    });
  }

  render() {
    const { loading, name, nameLoad } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        {loading && <h4 className="loading">Carregando...</h4>}
        {nameLoad
        && (
          <h4
            data-testid="header-user-name"
            className="nameUser"
          >
            Usuário:
            { name }
          </h4>
        )}
        <nav>
          <ul className="linksToPages">
            <Link to="/search" data-testid="link-to-search">Search</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
