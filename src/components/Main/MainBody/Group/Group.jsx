import React, { useState } from 'react';
import GroupEditForm from './GroupEditForm';
import Task from './Task/Task';


const Group = (props) => {
   const [isEdit, setIsEdit] = useState(false);

   const tasks = props.data.map(elem => {
      return <Task key={elem.id}
         id={elem.id}
         groupId={props.id}
         isCompleted={elem.is_completed}
         deadline={elem.deadline}
         groupname={props.heading}
         taskName={elem.name}
         typeName={elem.task_type}
         createdAt={elem.created_at}
         timeLeft={elem.timedelta} />
   });

   const onToggleEditMode = () => {
      setIsEdit(prev => !prev);
   };

   return (
      <section className='main__group group'>
         {isEdit ?
            <GroupEditForm id={props.id} heading={props.heading} onToggleEditMode={onToggleEditMode} />
            :
            <header className='group__header'>
               <h2 className='group__heading'>{props.heading}</h2>
               <div onClick={onToggleEditMode} className='group__settings'>
                  <span></span>
               </div>
            </header>
         }
         {tasks}
      </section>
   );
};

export default Group;