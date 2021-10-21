import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonSubmitSinger: true,
    };
  }

  onInputSinger = ({ target }) => {
    if (target.value.length >= 2) {
      this.setState({ buttonSubmitSinger: false });
    }
  }

  render() {
    const { buttonSubmitSinger } = this.state;
    return (
      <div
        data-testid="page-search"
      >
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
              onChange={ this.onInputSinger }
            />
          </label>
          <label
            htmlFor="earch-artist-button"
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
      </div>
    );
  }
}

export default Search;
