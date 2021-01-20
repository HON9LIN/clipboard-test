import React from 'react';

import HospitalCard from './HospitalCard';

const HospitalJobs = ({ jobs }) => {
  return (<div className="border-b-1 border-gray-400">
    {jobs.map((job, index) => <HospitalCard job={job} key={index}/>)}
  </div>);
};

export default HospitalJobs;
