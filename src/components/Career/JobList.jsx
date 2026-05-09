import React from 'react';
import JobCard from './JobCard';
import Loader from '../shared/Loader';
import styles from './JobList.module.css';

const JobList = ({ jobs, loading, error }) => {
  if (loading) {
    return (
      <div className={styles.list}>
        <Loader variant="skeleton" />
        <Loader variant="skeleton" />
        <Loader variant="skeleton" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.messageContainer}>
        <p className={styles.errorText}>Failed to load jobs. Please try again later.</p>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className={styles.messageContainer}>
        <div className={styles.emptyIcon}>💼</div>
        <h3 className={styles.emptyTitle}>No jobs found</h3>
        <p className={styles.emptyText}>Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
