import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { getUserGroups } from '../../../redux/main-reducer';
import { selectIsFetchingGroups, selectGroups, selectIsFiltered } from '../../../redux/selectors';
import { useWindowSize } from '../../../api/hooks';
import { getColumns } from '../../../api/tools';
import Preloader from '../../common/Preloader';
import Group from './Group/Group';


const MainBody = ({ getUserGroups, ...props }) => {
   const windowDimensions = useWindowSize();

   let columns = 2;
   if (windowDimensions.width < 900) {
      columns = 1;
   }

   useEffect(() => {
      getUserGroups();
   }, [getUserGroups]);

   return <>
      {props.isFetching ?
         <main className='main__body loading'>
            <Preloader />
         </main>
         :
         <main className='main__body'>
            {getColumns(columns, props.groups).map((elem, index) =>
               <div key={index} className='main__side'>
                  {createGroupElements(elem, props.isFiltered)}
               </div>
            )}
         </main>
      }
   </>;
};

function createGroupElements(data, dependency) {
   return data.map(elem => {
      if (dependency && elem.tasks.length === 0) {
         return null;
      }
      return <Group key={elem.id} id={elem.id} heading={elem.name} data={elem.tasks} isEdit={elem.isEdit} />
   });
}

export default connect(state => ({
   groups: selectGroups(state),
   isFiltered: selectIsFiltered(state),
   isFetching: selectIsFetchingGroups(state),
}), { getUserGroups })(MainBody);