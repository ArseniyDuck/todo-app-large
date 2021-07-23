import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMiniGroups } from '../../../redux/main-reducer';
import { selectMiniGroups, selectMiniGroupsIsFetching } from '../../../redux/selectors';
import GroupLink from './GroupLink';


const GroupLinks = ({ miniGroups, isFetching, getMiniGroups }) => {
   useEffect(() => {
      getMiniGroups();
   }, [getMiniGroups]);

   return <>
      {(!!miniGroups.length || isFetching) && <p className='sidePanel__heading'>Groups</p>}
      <div className='sidePanel__block'>
         {isFetching ?
            <GroupLinksLoading count={5} />
            :
            miniGroups.map(elem =>
               <GroupLink key={elem.id}>
                  <span className='sidePanel__groupname'>{elem.name}</span>
               </GroupLink>
            )
         }
      </div>
   </>;
};

const GroupLinksLoading = props => {
   const elems = [];
   for (let i = 0; i < props.count; i++) {
      elems.push(
         <GroupLink key={i}>
            <div className='sidePanel__load-group'></div>
         </GroupLink>
      );
   }

   return elems;
};

export default connect(state => ({
   miniGroups: selectMiniGroups(state),
   isFetching: selectMiniGroupsIsFetching(state),
}), { getMiniGroups })(GroupLinks);