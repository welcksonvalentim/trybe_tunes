import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

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
        {loading && <h2>Carregando...</h2>}
        {nameLoad && <h4 data-testid="header-user-name">{ name }</h4>}
        <nav>
          <ul>
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
