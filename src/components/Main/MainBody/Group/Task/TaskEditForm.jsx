import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateTodoTask } from '../../../../../redux/main-reducer';


const TaskEditForm = (props) => {
   // radio-buttons logic:
   const [isSelected, setIsSelected] = useState([false, false]);
   const completeTask = () => {setIsSelected([true, false])};
   const deleteTask = () => {setIsSelected([false, true])};
   const reset = () => {setIsSelected([false, false]);}

   const initialValues = { name: props.taskName, deadline: props.deadline, action: 'none' };

   const handleSubmit = (formData, { setSubmitting }) => {
      // If user didn't change taskName in the form,
      // don't send taskName to the server
      if (formData.name === props.taskName) {
         delete formData.name;
      }
      // If action is 'none', it means that user didn't touch 
      // action buttons or they reset it. So the server mustn't recieve
      // 'none' in action
      if (formData.action === 'none') {
         delete formData.action;
      }
      // Don't send empty deadline to the server
      if (!formData.deadline) {
         delete formData.deadline;
      }
      if (Object.keys(formData).length !== 0) {
         // If after all checks formData is not empty,
         // client send POST request to the server
         formData['id'] = props.id;
         props.updateTodoTask(formData, props.id, formData.name, props.groupId);
      }
      props.onToggleEditMode();
      setSubmitting(false);
   };

   const validate = values => {
      const errors = {};
      if (!values.name) {
         errors.name = 'This field is required!';
      }
      return errors;
   };

   return (
      <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
         {({ isSubmitting }) => (
         <Form className='group__task task'>
            { props.isCompleted ? 
            <div className='task__state red'><span></span></div>
            : <div className='task__state'><p>?</p></div> }
            <div className='task__data'>
               { !props.isCompleted ?
               <>
               <Field type='text' name='name' className='form__input' placeholder='Taskname:' />
               <ErrorMessage name='name' render={msg => <span className='input__error'>{msg}</span>} />
               </>
               : <h3 className='task__name'>{props.taskName}</h3> }
               <div className='task__tags'>
                  <div className='task__tag'>
                     <svg className='task__clock' width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path className='path' d='M5.79319 10.5895L8.30289 8.70718V4.87297C8.30289 4.48745 8.61451 4.17582 9.00004 4.17582C9.38556 4.17582 9.69719 4.48745 9.69719 4.87297V9.05579C9.69719 9.27538 9.594 9.48245 9.41833 9.61351L6.6298 11.7049C6.50433 11.799 6.3579 11.8444 6.21222 11.8444C5.99959 11.8444 5.79045 11.7488 5.65379 11.5648C5.42229 11.2573 5.48504 10.8202 5.79319 10.5895Z' fill='#DBDBDB'/>
                        <path className='path' d='M9 0C13.9629 0 18 4.0371 18 9C18 13.9629 13.9629 18 9 18C4.0371 18 0 13.9629 0 9C0 4.0371 4.0371 0 9 0ZM9 16.6057C13.1933 16.6057 16.6057 13.1933 16.6057 9C16.6057 4.80674 13.1933 1.39426 9 1.39426C4.80604 1.39426 1.39426 4.80674 1.39426 9C1.39426 13.1933 4.80674 16.6057 9 16.6057Z' fill='#DBDBDB'/>
                     </svg>
                     { !props.isCompleted ?
                     <Field type='datetime-local' name='deadline' className='form__input' placeholder='Taskname:' />
                     : <span className='task__tagText'>{props.typeName}</span> }
                     
                  </div>
               </div>
            </div>
            <div className='task__time'>
               <p className='task__createdAt'>{props.createdAt}</p>
               <div className='task__timeLeft'>
                  { !props.isCompleted && <label onClick={completeTask} className={'task__complete' + (isSelected[0] ? ' action_selected' : '')}>
                     <Field type='radio' value='complete' name='action' className='form__input hidden-radio' />
                  Complete</label>}
                  <label onClick={deleteTask} className={'task__delete red-button' + (isSelected[1] ? ' action_selected' : '')}>
                     <Field type='radio' value='delete' name='action' className='form__input hidden-radio' />
                  Delete</label>
                  <label onClick={reset} className='none-button'>
                     <Field type='radio' value='none' name='action' className='form__input hidden-radio' />
                  None</label>
               </div>
            </div>
            <button disabled={isSubmitting} type='submit' className='edit-button save-button'>
               <svg height='19' viewBox='0 0 512.007 512.007' width='26' xmlns='http://www.w3.org/2000/svg'>
                  <g>
                     <path className='path' d='m511.927 126.537c-.279-2.828-1.38-5.666-3.315-8.027-.747-.913 6.893 6.786-114.006-114.113-2.882-2.882-6.794-4.395-10.612-4.394-9.096 0-329.933 0-338.995 0-24.813 0-45 20.187-45 45v422c0 24.813 20.187 45 45 45h422c24.813 0 45-20.187 45-45 .001-364.186.041-339.316-.072-340.466zm-166.927-96.534v98c0 8.271-6.729 15-15 15h-19v-113zm-64 0v113h-139c-8.271 0-15-6.729-15-15v-98zm64 291h-218v-19c0-8.271 6.729-15 15-15h188c8.271 0 15 6.729 15 15zm-218 161v-131h218v131zm355-15c0 8.271-6.729 15-15 15h-92c0-19.555 0-157.708 0-180 0-24.813-20.187-45-45-45h-188c-24.813 0-45 20.187-45 45v180h-52c-8.271 0-15-6.729-15-15v-422c0-8.271 6.729-15 15-15h52v98c0 24.813 20.187 45 45 45h188c24.813 0 45-20.187 45-45v-98h2.787l104.213 104.214z'/>
                  </g>
               </svg>
            </button>
         </Form>
         )}
      </Formik>
   );
};


export default connect((_, ownProps) => ({...ownProps}), { updateTodoTask })(TaskEditForm);