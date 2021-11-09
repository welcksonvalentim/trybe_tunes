import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../pagesCSS/Search.css';

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
        className="search"
      >
        <Header />
        <form>
          <label
            htmlFor="search-artist-input"
          >
            <input
              className="inputSearch"
              data-testid="search-artist-input"
              type="text"
              placeholder="Digite o albúm ou cantor"
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
              className="inputButtonSearch"
              type="button"
              name="buttonSubmitSinger"
              required
              value="Pesquisar"
              disabled={ buttonSubmitSinger }
              onClick={ this.onClickSinger }
            />
          </label>
        </form>
        {name !== '' ? <h4>{ resultSinger }</h4> : ''}
        {albuns.map((album) => (
          album === '' ? <h3>Nenhum álbum foi encontrado</h3>
            : (
              <div key={ album.collectionId } className="cardAlbum">
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <img alt="mySearch" src={ album.artworkUrl100 } />
                  <h4 key={ album.collectionName }>{ album.collectionName }</h4>
                  <h4 key={ album.artistName }>{ album.artistName }</h4>
                </Link>
              </div>)
        ))}
      </div>
    );
  }
}

export default Search;
