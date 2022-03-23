import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import '../pagesCSS/MusicList.css';

class MusicList extends React.Component {
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
      const startURL = URLAlbum.lastIndexOf('/');
      const endURL = URLAlbum.length;
      const idAlbum = URLAlbum.substring(startURL + 1, endURL);
      const chanceToString = String(idAlbum);
      const albumInfo = await getMusics(chanceToString);
      if (albumInfo !== undefined) {
        this.setState({
          nameArtist: albumInfo[0].artistName,
          allInformation: albumInfo,
        });
      }
    }

    render() {
      const { nameArtist, allInformation, loadFavoritesong } = this.state;
      const { getCheckedSong } = this.props;
      return (
        <div
          className="musicList"
          key={ nameArtist }
        >
          {allInformation !== undefined && allInformation.map((track) => (
            track.previewUrl !== undefined && (
              <MusicCard
                track={ track }
                getCheckedSong={ getCheckedSong }
              />
            )))}
          <h4>{loadFavoritesong}</h4>
        </div>
      );
    }
}

MusicList.propTypes = {
  getCheckedSong: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MusicList;
