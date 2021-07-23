import React from 'react';
import { connect } from 'react-redux';
import { selectMiniGroups } from '../../../redux/selectors';

const SelectGroupOptions = (props) => {
   return props.groups.map(elem => <option key={elem.id} value={elem.id}>{elem.name}</option>);
};

export default connect(state => ({
   groups: selectMiniGroups(state),
}), {})(SelectGroupOptions);