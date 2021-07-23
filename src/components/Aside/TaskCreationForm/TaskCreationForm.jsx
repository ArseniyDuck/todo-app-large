import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import {connect} from 'react-redux';
import SelectGroupOptionsContainer from './SelectGroupOptionsContainer';
import { createTask } from '../../../redux/main-reducer';
import { required, maxLengthCreator } from '../../../api/validators';
import { Input, Select } from '../../common/FormControl';


const maxLength30 = maxLengthCreator(30);

let TaskCreationForm = (props) => {
   return (
      <form className='sidePanel__block' method='POST' onSubmit={props.handleSubmit}>
         <div className='sidePanel__field'>
            <Field component={Select} className='sidePanel__select' name='group_id' validate={[required]}>
               <SelectGroupOptionsContainer />
            </Field>
         </div>
         <div className='sidePanel__field'>
            <Field component={Input} className='form__input' name='taskname'
               placeholder='Taskname:' validate={[required, maxLength30]} />
         </div>
         <div className='sidePanel__field'>
            <Field component={Input} name='deadline' type='datetime-local'
               className='form__input sidePanel__deadline' validate={[required, maxLength30]} />
         </div>
         <button type='submit' className='form__submit'>Create</button>
      </form>
   );
};


TaskCreationForm = reduxForm({
   form: 'taskCreation',
   onSubmitSuccess: (_, dispatch) => dispatch(reset('taskCreation')),
})(TaskCreationForm);


const TaskCreation = (props) => {
   const onSubmit = (formData) => {
      props.createTask(formData, +formData.group_id);
   }

   return <TaskCreationForm onSubmit={onSubmit} />;
};

export default connect(null, { createTask })(TaskCreation);