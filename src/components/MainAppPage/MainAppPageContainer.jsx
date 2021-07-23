import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectIsAuth } from '../../redux/selectors';
import MainAppPage from './MainAppPage';

const MainAppPageContainer = (props) => {
   return props.isAuth ? <MainAppPage {...props} /> : <Redirect to='/auth/login' />;
};

const mapStateToProps = (state) => ({
   isAuth: selectIsAuth(state),
});

export default connect(mapStateToProps, null)(MainAppPageContainer);;