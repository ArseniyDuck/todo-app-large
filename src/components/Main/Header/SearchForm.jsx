import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from 'redux-form';
import { getUserGroups } from '../../../redux/main-reducer';
import { selectIsFetchingGroups, selectIsFiltered } from '../../../redux/selectors';
import { Input } from '../../common/FormControl';


let Search = ({ handleSubmit, isFiltered, isFetching, getUserGroups, reset }) => {
   const handleReset = () => {
      reset('search');
      getUserGroups();
   };
      
   return <>
      <form autoComplete='off' className='main__form search' method='GET' onSubmit={handleSubmit}>
         <Field name='filterText' component={Input} className='search__input'
            placeholder='Search a task:' />
         <button disabled={isFetching} type='submit' className='search__button'>
            <svg width='13' height='13' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
               <path className='path' d='M12.5847 11.8409L9.49065 8.623C10.2862 7.67732 10.7221 6.48745 10.7221 5.24875C10.7221 2.35463 8.36742 0 5.47331 0C2.5792 0 0.224564 2.35463 0.224564 5.24875C0.224564 8.14286 2.5792 10.4975 5.47331 10.4975C6.5598 10.4975 7.59517 10.1698 8.48038 9.5477L11.5979 12.7901C11.7282 12.9254 11.9035 13 12.0913 13C12.2691 13 12.4377 12.9322 12.5657 12.809C12.8378 12.5472 12.8464 12.1132 12.5847 11.8409ZM5.47331 1.36924C7.61251 1.36924 9.35282 3.10954 9.35282 5.24875C9.35282 7.38795 7.61251 9.12825 5.47331 9.12825C3.3341 9.12825 1.5938 7.38795 1.5938 5.24875C1.5938 3.10954 3.3341 1.36924 5.47331 1.36924Z' fill='black' />
            </svg>
         </button>
      </form>
      { isFiltered && <button onClick={handleReset} className='reset-filtering'>Reset</button> }
   </>;
};

Search = reduxForm({ form: 'search' })(Search);

const SearchForm = (props) => {
   const onSubmit = (formData) => {
      if (formData.filterText) {
         props.getUserGroups(formData.filterText);
      }
   };

   return <Search onSubmit={onSubmit} {...props} />;
}

export default connect(state => ({
   isFiltered: selectIsFiltered(state),
   isFetching: selectIsFetchingGroups(state),
}), { getUserGroups, reset })(SearchForm);