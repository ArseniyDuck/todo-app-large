import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../redux/auth-reducer';
import { selectIsAuth } from '../../../redux/selectors';
import Search from './SearchForm';




const Header = (props) => {
   return (
      <header className='main__header'>
         <Search />
         {props.isAuth && <button className='red-button' onClick={props.logout}>Logout</button> }
      </header>
   );
};

const mapStateToProps = (state) => ({
   isAuth: selectIsAuth(state),
});

export default connect(mapStateToProps, { logout })(Header);;