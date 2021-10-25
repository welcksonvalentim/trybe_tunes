import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loadFavoritesong: '',
    };
  }

  componentDidMount() {
    this.showMusic();
  }

    showMusic = async () => {
      const URLAlbum = window.location.href;
      const startURL = 23;
      const endURL = 38;
      const idAlbum = URLAlbum.substring(startURL, endURL);
      const chanceToString = String(idAlbum);
      const albumInfo = await getMusics(chanceToString);
      if (albumInfo !== undefined) {
        this.setState({
          nameArtist: albumInfo[0].artistName,
          nameAlbum: albumInfo[0].collectionName,
          allInformation: albumInfo,
        });
      }
    }

    checkFavoriteMusic = async () => {
      const { allInformation } = this.state;
      this.setState({
        loadFavoritesong: 'Carregando...',
      });
      await addSong(allInformation);
      this.setState({
        loadFavoritesong: '',
      });
    }

    render() {
      const { nameArtist, nameAlbum, allInformation, loadFavoritesong } = this.state;
      return (
        <div
          data-testid="page-album"
          key={ nameArtist }
        >
          <Header />
          {nameArtist !== undefined ? (
            <div
              key={ nameArtist }
            >
              <h3 key="artistName" data-testid="artist-name">{nameArtist}</h3>
              <h3 key="nameAlbum" data-testid="album-name">{nameAlbum}</h3>
            </div>) : 'name of artist undefined'}

          {allInformation !== undefined && allInformation.map((track) => (
            track.previewUrl !== undefined && (
              <div>
                <label
                  htmlFor={ track.trackId }
                  key={ track.trackId }
                >
                  Favorita
                  <input
                    data-testid={ `checkbox-music-${track.trackId}` }
                    type="checkbox"
                    onClick={ this.checkFavoriteMusic }
                  />
                </label>
                <audio
                  data-testid="audio-component"
                  src={ track.previewUrl }
                  key={ track.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                  <h4>{ track.trackName }</h4>
                </audio>
                )
              </div>
            )))}
          <h4>{loadFavoritesong}</h4>
        </div>
      );
    }
}

export default Album;
