import React from 'react';
import Header from './Header/Header';
import MainBody from './MainBody/MainBody';


const Main = (props) => {
   return (
      <div className="main">
         <Header />
         <MainBody />
      </div>
   );
};

export default Main;