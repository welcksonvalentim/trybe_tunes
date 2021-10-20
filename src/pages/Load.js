import React from 'react';
import PropTypes from 'prop-types';

class Load extends React.Component {
  render() {
    const { load } = this.props;
    return (
      <div>
        { load }
      </div>
    );
  }
}

Load.propTypes = {
  load: PropTypes.string.isRequired,
};

export default Load;
