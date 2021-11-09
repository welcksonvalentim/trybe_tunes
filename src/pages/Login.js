import React from 'react';
import PropTypes from 'prop-types';
import UserSoundImage from '../images/UserSoundImage.png';
import '../pagesCSS/Login.css';

class Login extends React.Component {
  render() {
    const { name, buttonSubmit, onInputChange, onClick, load } = this.props;
    return (
      <div>
        <form>
          <div data-testid="page-login">
            <h3 className="load">{ load }</h3>
          </div>
          <label
            htmlFor="name"
          >
            <input
              data-testid="login-name-input"
              className="input-name"
              type="text"
              placeholder="Digite seu nome"
              name="name"
              required
              value={ name }
              onChange={ onInputChange }
            />
          </label>
          <label
            htmlFor="login-submit-button"
          >
            <input
              data-testid="login-submit-button"
              className="button-input-name"
              type="button"
              name="buttonSubmit"
              required
              value="Entrar"
              disabled={ buttonSubmit }
              onClick={ onClick }
            />
          </label>
        </form>
        <div>
          <img
            className="image-user-sound"
            src={ UserSoundImage }
            alt="user-sound"
          />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string.isRequired,
  buttonSubmit: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  load: PropTypes.string.isRequired,
};

export default Login;
