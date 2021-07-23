import React, { useState } from 'react';
import TaskEditForm from './TaskEditForm';


const Task = (props) => {
   const [isEdit, setIsEdit] = useState(false);

   const onToggleEditMode = () => {
      setIsEdit(prev => !prev);
   };

   if (isEdit) {
      return <TaskEditForm {...props} onToggleEditMode={onToggleEditMode} />;
   } else {
      return (
         <div className='group__task task'>
            <div className={`task__state ${props.isCompleted ? 'red': 'green'}`}>
               <span></span>
            </div>
            <div className='task__data'>
               <h3 className='task__name'>{props.taskName}</h3>
               <div className='task__tags'>
                  <div className='task__tag'>
                     <svg className='task__clock' width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path className='path' d='M5.79319 10.5895L8.30289 8.70718V4.87297C8.30289 4.48745 8.61451 4.17582 9.00004 4.17582C9.38556 4.17582 9.69719 4.48745 9.69719 4.87297V9.05579C9.69719 9.27538 9.594 9.48245 9.41833 9.61351L6.6298 11.7049C6.50433 11.799 6.3579 11.8444 6.21222 11.8444C5.99959 11.8444 5.79045 11.7488 5.65379 11.5648C5.42229 11.2573 5.48504 10.8202 5.79319 10.5895Z' fill='#DBDBDB'/>
                        <path className='path' d='M9 0C13.9629 0 18 4.0371 18 9C18 13.9629 13.9629 18 9 18C4.0371 18 0 13.9629 0 9C0 4.0371 4.0371 0 9 0ZM9 16.6057C13.1933 16.6057 16.6057 13.1933 16.6057 9C16.6057 4.80674 13.1933 1.39426 9 1.39426C4.80604 1.39426 1.39426 4.80674 1.39426 9C1.39426 13.1933 4.80674 16.6057 9 16.6057Z' fill='#DBDBDB'/>
                     </svg>
                     <span className='task__tagText'>{props.typeName}</span>
                  </div>
               </div>
            </div>
            <div className='task__time'>
               <p className='task__createdAt'>{props.createdAt}</p>
               <p className='task__timeLeft'>Interval: {props.timeLeft}</p>
            </div>
            <button className='edit-button' onClick={onToggleEditMode} style={{ margin: '0 0 0 10px' }}>
               <svg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path className='path' d='M15.8076 1.96028C14.9265 1.08081 13.4998 1.08081 12.6188 1.96028L11.8206 2.76287L3.32365 11.2553L3.30559 11.2735C3.30122 11.2778 3.30122 11.2825 3.29656 11.2825C3.28753 11.296 3.27399 11.3094 3.2651 11.323C3.2651 11.3275 3.26045 11.3275 3.26045 11.332C3.25142 11.3456 3.24705 11.3546 3.23788 11.3681C3.2335 11.3727 3.2335 11.377 3.22899 11.3817C3.22447 11.3952 3.21996 11.4043 3.2153 11.4178C3.2153 11.4222 3.21093 11.4222 3.21093 11.4268L1.32572 17.0959C1.27042 17.2573 1.31246 17.436 1.43392 17.5558C1.51928 17.64 1.63439 17.6871 1.75417 17.6867C1.80312 17.6858 1.85165 17.6782 1.89849 17.6641L7.56315 15.7744C7.56753 15.7744 7.56753 15.7744 7.57218 15.77C7.58643 15.7658 7.60012 15.7597 7.61267 15.7518C7.6162 15.7514 7.6193 15.7498 7.62184 15.7474C7.63525 15.7384 7.6533 15.7292 7.66685 15.7202C7.68025 15.7113 7.69393 15.6978 7.70748 15.6888C7.71199 15.6841 7.71636 15.6841 7.71636 15.6797C7.72102 15.6752 7.73005 15.6708 7.73456 15.6617L17.0297 6.36654C17.9092 5.48551 17.9092 4.0588 17.0297 3.17791L15.8076 1.96028ZM7.41883 14.7145L4.27987 11.5757L12.1363 3.71923L15.2753 6.85805L7.41883 14.7145ZM3.83773 12.41L6.57999 15.1521L2.46223 16.5231L3.83773 12.41ZM16.3939 5.73508L15.9158 6.2177L12.7767 3.0786L13.2594 2.59611C13.7875 2.06849 14.6434 2.06849 15.1716 2.59611L16.3982 3.82278C16.9223 4.35323 16.9204 5.20717 16.3939 5.73508Z' fill='#69C789'/>
               </svg>
            </button>
         </div>
      );
   }
};

export default Task;