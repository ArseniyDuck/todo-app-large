import React from 'react';
import { connect } from 'react-redux';
import { updatePhoto } from '../../../redux/auth-reducer';


const UpdatePhotoForm = (props) => {
   const onSubmit = (e) => {
      if (e.target.children[0].children[0].files.length) {
         props.updatePhoto(e.target.children[0].children[0].files[0]);
         e.target.children[0].children[0].value = '';
      }

      e.preventDefault();
   };

   return (
      <form className='sidePanel__block' method='POST' onSubmit={onSubmit}>
         <div className='sidePanel__field'>
            <input type='file' name='photo' className='form__input' placeholder='Groupname:' accept='.jpg,.jpeg,.png'/>
         </div>
         <button type='submit' className='form__submit'>Update</button>
      </form>
   );
};



export default connect(null, { updatePhoto })(UpdatePhotoForm);