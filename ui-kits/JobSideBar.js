import React from 'react';

import FilterJobCard from './FilterJobCard';
import Spinner from './Spinner';

const departmentDisplayCount = 10;

const JobSideBar = ({ jobTypes, departments, workSchedules, experiences, isLoading, onShowMoreDepartments }) => {
  const departmentCount = departments.length;
  const departmentsToShow = departments.slice(0, Math.min(departmentDisplayCount, departmentCount));
  return (<div className="w-full h-full">
    { isLoading ? <div className="flex justify-center items-center h-full"><Spinner/></div> : <><FilterJobCard name="JOB TYPE" items={jobTypes}/>
      <FilterJobCard name="DEPARTMENT" items={departmentsToShow} hasMore={departmentCount > departmentDisplayCount} onShowMore={onShowMoreDepartments}/>
      <FilterJobCard name="WORK SCHEDULE" items={workSchedules}/>
      <FilterJobCard name="EXPERIENCE" items={experiences}/></>}

  </div>);
};

export default JobSideBar;
