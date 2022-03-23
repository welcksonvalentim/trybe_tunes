import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import '../pagesCSS/MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loadFavoritesong: '',
      checkbox: false,
    };
  }

    checkFavoriteMusic = ({ target }, track) => {
      this.setState({
        loadFavoritesong: 'Carregando...',
        checkbox: target.checked,
      }, async () => {
        const { checkbox } = this.state;
        if (checkbox === true) {
          await addSong(track);
          this.setState({
            loadFavoritesong: '',
          });
        }
      });
    }

    render() {
      const { track } = this.props;
      const { loadFavoritesong } = this.state;
      if (loadFavoritesong !== '') return <p>{loadFavoritesong}</p>;
      return (
        <div className="musicCard">
          <h4>{ track.trackName }</h4>
          <audio
            data-testid="audio-component"
            src={ track.previewUrl }
            key={ track.previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
      );
    }
}

MusicCard.propTypes = {
  track: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MusicCard;
