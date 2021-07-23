import React from 'react';
import { connect } from 'react-redux';
import { selectIsFetchingUser, selectUsername, selectUserPhoto, selectIsFetchingPhoto } from '../../../redux/selectors';
import Preloader from '../../common/Preloader';

const Avatar = ({ isFetchingUserData, isFetchingPhoto, photoUrl, username }) => {
   return <>
      <div className='sidePanel__avatar'>
         {isFetchingUserData ?
            <div className='avatar_loading'></div>
            :
            <>
               {isFetchingPhoto && <Preloader styles={{position: 'absolute'}} />}
               {isFetchingPhoto && <div className='avatar_blur'></div>}
               {photoUrl && <img src={photoUrl} alt='user avatar' />}
            </>
         }
      </div>
      {isFetchingUserData ?
         <div className='username_loading'></div>
         :
         <h2 className='sidePanel__username'>{username}</h2>
      }
   </>;
};

export default connect(state => ({
   isFetchingUserData: selectIsFetchingUser(state),
   isFetchingPhoto: selectIsFetchingPhoto(state),
   photoUrl: selectUserPhoto(state),
   username: selectUsername(state),
}))(Avatar);