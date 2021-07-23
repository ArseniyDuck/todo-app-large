import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Field, reduxForm, reset } from 'redux-form';
import { login } from '../../../redux/auth-reducer';
import { selectIsAuth } from '../../../redux/selectors';
import { Input } from '../../common/FormControl';
import { required, maxLengthCreator } from '../../../api/validators';


const maxLength150 = maxLengthCreator(150);

let Login = ({ error, handleSubmit }) => {
   return (
      <div className='auth wrapper'>
         <form method='POST' className='auth__form' onSubmit={handleSubmit}>
            <h1 className='auth__heading'>User authorization</h1>
            <Field name='username' component={Input} className='form__input'
               placeholder='Username:' validate={[required, maxLength150]} />
            <Field name='password' component={Input} type='password' className='form__input'
               placeholder='Password:' validate={[required]} />
            {error && <p className='input__error'>{error}</p>}
            <button type='submit' className='form__submit'>Login</button>
         </form>
         <Link className='registration-link' to='/auth/registration'>Registrate</Link>
      </div>
   );
};

Login = reduxForm({
   form: 'login',
   onSubmitSuccess: (_, dispatch) => dispatch(reset('login')),
})(Login);

const LoginForm = (props) => {
   const onSubmit = (formData) => {
      props.login(formData);
   };

   return props.isAuth ? <Redirect to='/' /> : <Login onSubmit={onSubmit} />;
};

export default connect(state => ({
   isAuth: selectIsAuth(state),
}), { login })(LoginForm);