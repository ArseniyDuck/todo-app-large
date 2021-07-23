import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { init } from './redux/app-reducer';
import MainAppPageContainer from './components/MainAppPage/MainAppPageContainer';
import LoginForm from './components/Auth/Login/Login';
import RegistrationForm from './components/Auth/Registration/Registration';
import Preloader from './components/common/Preloader';


class App extends React.Component {
   componentDidMount() {
      this.props.init();
   }

   render() {
      if (!this.props.isInitialized) {
         return (
            <div className='initalizing loading'>
               <Preloader />
            </div>
         );
      }

      return (
         <Switch>
            <Route exact path='/' component={MainAppPageContainer} />
            <Route exact path='/auth/registration' component={RegistrationForm} />
            <Route exact path='/auth/login' component={LoginForm} />
         </Switch>
      );
   }
}


export default connect(state => ({
   isInitialized: state.app.isInitialized
}), { init })(App);