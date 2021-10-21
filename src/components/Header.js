import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
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
