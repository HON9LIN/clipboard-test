import React from 'react';

import SortButton from './SortButton';

const SortBar = ({ activeSortType, setActiveSortType, state, setState }) => {
  const onChange = (newState, key) => {
    setState(newState);
    setActiveSortType(key);
  };

  return (
    <div className="hidden lg:block space-x-6 flex justify-between">
      <span className="text-gray-400">Sort by</span>
      <SortButton label="Location" state={state} setState={newState => onChange(newState, 'location')} sortType="location" activeKey={activeSortType}/>
      <SortButton label="Role" state={state} setState={newState => onChange(newState, 'role')} sortType="role" activeKey={activeSortType}/>
      <SortButton label="Department" state={state} setState={newState => onChange(newState, 'department')} sortType="department" activeKey={activeSortType}/>
      <SortButton label="Education" state={state} setState={newState => onChange(newState, 'education')} sortType="education" activeKey={activeSortType}/>
      <SortButton label="Experience" state={state} setState={newState => onChange(newState, 'experience')} sortType="experience" activeKey={activeSortType}/>
    </div>)
};

export default SortBar;
