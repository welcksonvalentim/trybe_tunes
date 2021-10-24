import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
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
      if (albumInfo.length !== 0) {
        this.setState({
          nameArtist: albumInfo[0].artistName,
          nameAlbum: albumInfo[0].collectionName,
          allInformation: albumInfo,
        });
      }
    }

    render() {
      const { nameArtist, nameAlbum, allInformation } = this.state;
      return (
        <div
          data-testid="page-album"
        >
          <Header />
          {nameArtist !== undefined && (
            <div
              key="1"
            >
              <h3 key="artistName" data-testid="artist-name">{nameArtist}</h3>
              <h3 key="nameAlbum" data-testid="album-name">{nameAlbum}</h3>
            </div>)}

          {allInformation !== undefined && allInformation.map((track) => (
            track.previewUrl !== undefined && (
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
              </audio>)))}
        </div>
      );
    }
}

export default Album;
