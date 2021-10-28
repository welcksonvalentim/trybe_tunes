import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

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
      const { track, getCheckedSong } = this.props;
      const { checkbox, loadFavoritesong } = this.state;
      if (loadFavoritesong.length) return <p>{loadFavoritesong}</p>;
      return (
        <div>
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
          <label
            htmlFor={ track.trackId }
            key={ track.trackId }
          >
            Favorita
            <input
              data-testid={ `checkbox-music-${track.trackId}` }
              id={ track.trackId }
              type="checkbox"
              name="checkbox"
              onChange={ (e) => this.checkFavoriteMusic(e, track) }
              checked={ getCheckedSong.length ? getCheckedSong.some(
                (song) => song.trackId === track.trackId,
              ) : checkbox }
            />
          </label>
        </div>
      );
    }
}

MusicCard.propTypes = {
  track: PropTypes.objectOf(PropTypes.string).isRequired,
  getCheckedSong: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MusicCard;
