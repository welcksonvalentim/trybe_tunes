import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const { name, buttonSubmit, onInputChange, onClick, load } = this.props;
    return (
      <form>
        <div data-testid="page-login">
          { load }
        </div>
        <label
          htmlFor="name"
        >
          <input
            data-testid="login-name-input"
            type="text"
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
            type="button"
            name="buttonSubmit"
            required
            value="Entrar"
            disabled={ buttonSubmit }
            onClick={ onClick }
          />
        </label>
      </form>
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
