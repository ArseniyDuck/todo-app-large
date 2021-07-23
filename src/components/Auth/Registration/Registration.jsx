import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Field, reduxForm, reset } from 'redux-form';
import { registrate } from '../../../redux/auth-reducer';
import { selectIsAuth } from '../../../redux/selectors';
import { Input } from '../../common/FormControl';
import { required, maxLengthCreator, usernameTemplate } from '../../../api/validators';


const maxLength150 = maxLengthCreator(150);

let Registration = (props) => {
   return (
      <div className='auth wrapper'>
         <form className='auth__form' method='POST' onSubmit={props.handleSubmit}>
            <h1 className='auth__heading'>User registration</h1>
            <Field name='username' component={Input} className='form__input'
               placeholder='Username:' validate={[required, maxLength150, usernameTemplate]} />
            <Field name='password1' component={Input} type='password' className='form__input'
               placeholder='Password:' validate={[required]} />
            <Field name='password2' component={Input} type='password' className='form__input'
               placeholder='Password again:' validate={[required]} />
            {props.error && <p className='input__error'>{props.error}</p>}
            <button type='submit' className='form__submit'>Registrate</button>
         </form>
         <Link className='registration-link' to='/auth/login'>Already have an account? Login</Link>
      </div>
   );
};

Registration = reduxForm({
   form: 'registration',
   onSubmitSuccess: (_, dispatch) => dispatch(reset('registration')),
})(Registration);


const RegistrationForm = (props) => {
   const onSubmit = (formData) => {
      props.registrate(formData);
   };

   return props.isAuth ? <Redirect to='/' /> : <Registration onSubmit={onSubmit} />;
};

export default connect(state => ({
   isAuth: selectIsAuth(state),
}), { registrate })(RegistrationForm);