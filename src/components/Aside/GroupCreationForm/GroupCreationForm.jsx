import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { createGroup } from '../../../redux/main-reducer';
import { Input } from '../../common/FormControl';
import { required, maxLengthCreator } from '../../../api/validators';


const maxLength30 = maxLengthCreator(30);

let GroupCreationForm = (props) => {
   return (
      <form className='sidePanel__block' method='POST' onSubmit={props.handleSubmit}>
         <div className='sidePanel__field'>
            <Field component={Input} name='name' className='form__input'
               placeholder='Groupname:' validate={[required, maxLength30]} />
         </div>
         <button type='submit' className='form__submit'>Create</button>
      </form>
   );
};


GroupCreationForm = reduxForm({
   form: 'groupCreation',
   onSubmitSuccess: (_, dispatch) => dispatch(reset('groupCreation')),
})(GroupCreationForm);


const GroupCreation = (props) => {
   const onSubmit = (formData) => {
      props.createGroup(formData);
   };

   return <GroupCreationForm onSubmit={onSubmit} />;
};


export default connect(null, { createGroup })(GroupCreation);