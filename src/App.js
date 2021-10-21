import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Load from './pages/Load';
import { createUser } from './services/userAPI';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      buttonSubmit: true,
      test: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, nameSinger } = target;
    this.setState({
      [name]: target.value,
      [nameSinger]: target.value,
    }, this.validationInputs);
  }

  validationInputs = () => {
    const { name } = this.state;
    const minLengtName = 3;
    if (name.length >= minLengtName) {
      this.setState({ buttonSubmit: false });
    } else {
      this.setState({ buttonSubmit: true });
    }
  }

  onClick = async () => {
    const { name } = this.state;
    this.setState({
      load: 'Carregando...',
    });
    await createUser({ name });
    this.setState({
      load: '',
      test: true,
    });
  }

  render() {
    const { name, buttonSubmit, load, test } = this.state;
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Login
              name={ name }
              buttonSubmit={ buttonSubmit }
              onInputChange={ this.onInputChange }
              load={ load }
              onClick={ this.onClick }
            />) }
          >
            {test === true && <Redirect to="/search" />}
          </Route>
          <Route
            exact
            path="/load"
            render={ () => (<Load
              load={ load }
            />) }
          />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
