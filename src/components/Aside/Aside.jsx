import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../../redux/auth-reducer';
import { selectGroups, selectUsername, selectUserPhoto, selectIsFetchingUser, selectIsFetchingGroups } from '../../redux/selectors';
import GroupCreationForm from './GroupCreationForm/GroupCreationForm';
import UpdatePhotoForm from './UpdatePhotoForm/UpdatePhotoForm';
import TaskCreationFormContainer from './TaskCreationForm/TaskCreationForm';
import GroupLinks from './GroupLinks/GroupLinks';
import Avatar from './Avatar/Avatar';


const Aside = () => {
   return (
      <aside className='sidePanel'>
         <Avatar />
         <p className='sidePanel__heading'>Update photo</p>
         <UpdatePhotoForm />
         <GroupLinks />
         <p className='sidePanel__heading'>Create group</p>
         <GroupCreationForm />
         <p className='sidePanel__heading'>Create task</p>
         <TaskCreationFormContainer />
      </aside>
   );
};


export default connect(state => ({
   groups: selectGroups(state),
   username: selectUsername(state),
   photoUrl: selectUserPhoto(state),
   isFetchingUserData: selectIsFetchingUser(state),
   isFetchingGroups: selectIsFetchingGroups(state),
}), { getUserData })(Aside);

