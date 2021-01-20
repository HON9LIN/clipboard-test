import React, { useEffect, useState } from 'react';

import Layout from '../layout/Layout';
import JobSearchBar from '../ui-kits/JobSearchBar';
import JobSideBar from '../ui-kits/JobSideBar';
import JobList from '../ui-kits/JobList';
import Spinner from '../ui-kits/Spinner';
import DepartmentModalDialog from '../ui-kits/DepartmentModalDialog';
import SortBar from '../ui-kits/SortBar';
import Notification from '../ui-kits/Notification';

import useDebounce from '../hooks/debounce';

import { JobService } from '../services/job.service';

const defaultNotification = {
  show: false,
  type: 'error',
  message: '',
};

const defaultFilters = {
  job_type: [],
  work_schedule: [],
  experience: [],
  department: [],
};

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);
  const [activeSortType, setActiveSortType] = useState(null);
  const [sortState, setSortState] = useState('asc');

  const [notification, setNotification] = useState(defaultNotification);

  const [isDepartmentDialogOpen, setDepartmentDialogOpen] = useState(false);

  const [isFiltersLoading, setFiltersLoading] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const loadFilter = async () => {
    setFiltersLoading(true);
    try {
      const res = await JobService.filters();
      setFilters(res);
    } catch (e) {
      showNotification('error', 'Failed to fetch data from the server.');
    } finally {
      setFiltersLoading(false);
    }
  };

  const [isJobsLoading, setJobsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [totalJobCount, setTotalJobCount] = useState(0);
  const loadJob = async () => {
    setJobsLoading(true);
    try {
      const res = await JobService.query(keyword, activeSortType, sortState);
      setJobs(res);
      setTotalJobCount(res.reduce((sum, job) => sum + job.total_jobs_in_hospital, 0));
    } catch (e) {
      showNotification('error', 'Failed to fetch data from the server.');
    } finally {
      setJobsLoading(false);
    }
  };

  useEffect(async () => {
    await loadFilter();
  }, []);

  useEffect(async () => {
    await loadJob();
  }, [debouncedKeyword, activeSortType, sortState]);

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
  };

  return (
    <Layout>
      <div className="w-full pt-28">
        <section className="mt-2 mx-4">
          <JobSearchBar keyword={keyword} onKeywordChange={setKeyword}/>
        </section>
        <section className="mt-4 mx-4 flex">
          <div className="w-64 hidden lg:block">
            <JobSideBar jobTypes={filters.job_type}
                         departments={filters.department}
                         workSchedules={filters.work_schedule}
                         experiences={filters.experience}
                         onShowMoreDepartments={() => setDepartmentDialogOpen(true)}
                         isLoading={isFiltersLoading}/>
          </div>
          <div className="ml-0 lg:ml-4 mb-4 w-full bg-white">
            <div className="mt-8 ml-4 mr-8 flex justify-between text-sm">
              <div>
                <span className="font-bold">{totalJobCount.toLocaleString()} </span><span>job postings</span>
              </div>
              <SortBar state={sortState} activeSortType={activeSortType} setState={setSortState} setActiveSortType={setActiveSortType}/>
            </div>
            { isJobsLoading ? <div className="flex justify-center items-center h-48"><Spinner size={10}/></div> : <JobList jobs={jobs}/> }
          </div>
        </section>
      </div>
      { isDepartmentDialogOpen && <DepartmentModalDialog departments={filters.department} onClose={() => setDepartmentDialogOpen(false)}/> }
      { notification.show && <Notification {...notification} onClose={() => setNotification({ show: false })}/> }
    </Layout>
  );
}
