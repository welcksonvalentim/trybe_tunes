import React from 'react';
import { getUser } from './services/userAPI';
import './pagesCSS/Head.css';
import fone from './images/fone-de-ouvido-de-audio.png';

class Head extends React.Component {
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
      <header className="header">
        <img className="fone" src={ fone } alt="fone-sound" />
        <h1 className="title-Header">TrybeTunes</h1>
        {loading && <h4 className="loading">Carregando...</h4>}
        {nameLoad
        && (
          <h4 data-testid="header-user-name" className="nameUser">
            { name }
          </h4>
        )}
      </header>

    );
  }
}

export default Head;
