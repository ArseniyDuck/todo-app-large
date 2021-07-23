import React from 'react';


export const Input = ({ input, meta, ...props }) => {
   const hasError = meta.touched && meta.error;
   return (
      <div className={hasError ? 'authField field_wrapper_error' : 'authField'}>
         <input {...input} {...props} />
         { hasError && <span className='input__error'>{meta.error}</span>}
      </div>
   );
};


export const Select = ({ input, meta, children, ...props }) => {
   const hasError = meta.touched && meta.error;
   return (
      <div className={hasError ? 'field_wrapper_error' : ''}>
         <select {...input} {...props}>
            {children}
         </select>
         { hasError && <span className='input__error'>{meta.error}</span>}
      </div>
   );
};