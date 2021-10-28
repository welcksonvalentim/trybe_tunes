import React from 'react';
import MusicList from './MusicList';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      getCheckedSong: [],
      checkedDSong: '',
      nameArtist: '',
      nameAlbum: '',
    };
  }

  componentDidMount() {
    this.orderOfLoad();
  }

  orderOfLoad = async () => {
    this.loadCheckedSongs();
    await this.showMusic();
  }

  loadCheckedSongs = async () => {
    this.setState({
      checkedDSong: 'Carregando...',
    });
    const getCheckedSongs = await getFavoriteSongs();
    if (getCheckedSongs !== undefined) {
      this.setState({
        checkedDSong: '',
        getCheckedSong: getCheckedSongs,
      });
    }
  }

    showMusic = async () => {
      const URLAlbum = window.location.href;
      const startURL = URLAlbum.lastIndexOf('/');
      const endURL = URLAlbum.length;
      const idAlbum = URLAlbum.substring(startURL + 1, endURL);
      const chanceToString = String(idAlbum);
      const albumInfo = await getMusics(chanceToString);
      if (albumInfo !== undefined) {
        this.setState({
          nameArtist: albumInfo[0].artistName,
          nameAlbum: albumInfo[0].collectionName,
        });
      }
    }

    render() {
      const { nameArtist, nameAlbum, checkedDSong, getCheckedSong } = this.state;
      return (
        <div
          key={ nameArtist }
        >
          <Header />
          {nameArtist !== undefined ? (
            <div
              data-testid="page-album"
              key={ nameArtist + nameAlbum }
            >
              <h3 key={ nameArtist } data-testid="artist-name">{nameArtist}</h3>
              <h3 key={ nameAlbum } data-testid="album-name">{nameAlbum}</h3>
            </div>) : nameArtist}
          <MusicList
            getCheckedSong={ getCheckedSong }
          />
          <h4>{checkedDSong}</h4>
        </div>
      );
    }
}

export default Album;
