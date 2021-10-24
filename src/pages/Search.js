import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonSubmitSinger: true,
      name: '',
      albuns: [],
    };
  }

  onInputSinger = ({ target }) => {
    if (target.value.length >= 2) {
      this.setState({ buttonSubmitSinger: false });
    }
  }

  onClickSinger = async () => {
    const getId = document.getElementById('idSinger');
    const singerName = getId.value;
    this.setState({
      name: singerName,
    });
    const listOfAlbuns = await searchAlbumsAPI(singerName);
    getId.value = '';
    if (listOfAlbuns[0] !== undefined) {
      this.setState({
        name: singerName,
        albuns: listOfAlbuns,
      });
    } else {
      this.setState({
        name: singerName,
      });
    }
  }

  render() {
    const { buttonSubmitSinger, name, albuns } = this.state;
    const resultSinger = `Resultado de álbuns de: ${name}`;
    return (
      <div
        data-testid="page-search"
      >
        {albuns.length === 0 ? <h3>Nenhum álbum foi encontrado</h3>
          : albuns.map((album) => (
            <div key={ album.collectionId }>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                {album.collectionId}
              </Link>
              <h3 key={ album.collectionName }>{ album.collectionName }</h3>
              <h3 key={ album.artistName }>{ album.artistName }</h3>
            </div>))}
        <Header />
        <form>
          <label
            htmlFor="search-artist-input"
          >
            <input
              data-testid="search-artist-input"
              type="text"
              name="nameSinger"
              required
              id="idSinger"
              onChange={ this.onInputSinger }
            />
          </label>
          <label
            htmlFor="search-artist-button"
          >
            <input
              data-testid="search-artist-button"
              type="button"
              name="buttonSubmitSinger"
              required
              value="Pesquisar"
              disabled={ buttonSubmitSinger }
              onClick={ this.onClickSinger }
            />
          </label>
        </form>
        {name !== '' ? <h1>{ resultSinger }</h1> : ''}
      </div>
    );
  }
}

export default Search;
