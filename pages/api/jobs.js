// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jobs from '../../data/jobs';
import { sortArrayByKeyDirection } from '../../utilites/array.util';

export default async function jobQueries(req, res) {
  res.statusCode = 200;
  const keyword = (req.query.keyword || '').toLowerCase();
  const sortType = req.query.sortType;
  const sortDirection = req.query.sortDirection; // 'asc' or 'desc'

  let jobData = JSON.parse(JSON.stringify(jobs));
  jobData.forEach(job => {
    // filter job items by job_title, hospital name and city name
    if (keyword !== '') {
      job.items = job.items.filter(jobItem => {
        if (jobItem.name.toLowerCase().indexOf(keyword) !== -1) { return true; }
        if (jobItem.job_title.toLowerCase().indexOf(keyword) !== -1) { return true; }
        if (jobItem.city.toLowerCase().indexOf(keyword) !== -1) { return true; }
        if (jobItem.type.toLowerCase().indexOf(keyword) !== -1) { return true; }
        return false;
      });
    }

    // sort items by location, role, department, education or experience
    if (!sortDirection) { return; }
    switch (sortType) {
      case 'location':
        job.items = sortArrayByKeyDirection(job.items, sortDirection, 'city');
        break;
      case 'experience':
        job.items = sortArrayByKeyDirection(job.items, sortDirection, 'experience');
        break;
      case 'role':
        break;
      case 'department':
        break;
      case 'education':
        break;
      default:
        break;
    }
  });

  jobData = jobData.filter(job => job.items.length);
  jobData.forEach(job => job.total_jobs_in_hospital = job.items.length);

  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve)=>setTimeout(resolve, 1000 * Math.random()));
  res.json(jobData);
  // res.error('mock error response');
  return jobData;
}
