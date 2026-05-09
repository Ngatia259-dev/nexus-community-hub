import React, { useState, useEffect } from 'react';
import JobList from '../components/Career/JobList';
import Input from '../components/shared/Input';
import Button from '../components/shared/Button';
import Badge from '../components/shared/Badge';
import styles from './Careers.module.css';

// Mock data for phase 1
const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $150k',
    tags: ['React', 'TypeScript', 'CSS Modules'],
    postedAt: '2 days ago',
    logo: ''
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'InnovateSpace',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$100k - $130k',
    tags: ['Node.js', 'Express', 'MongoDB'],
    postedAt: '5 days ago',
    logo: ''
  },
  {
    id: 3,
    title: 'Full Stack Intern',
    company: 'StartupHub',
    location: 'San Francisco, CA',
    type: 'Internship',
    salary: '$40/hr',
    tags: ['JavaScript', 'React', 'Node.js'],
    postedAt: '1 week ago',
    logo: ''
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    company: 'Creative Studio',
    location: 'Remote',
    type: 'Contract',
    salary: '$80/hr',
    tags: ['Figma', 'Prototyping', 'User Research'],
    postedAt: 'Just now',
    logo: ''
  }
];

const FILTER_CATEGORIES = ['All', 'Remote', 'Frontend', 'Backend', 'Full Stack'];

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    // Simulate API fetch
    const fetchJobs = async () => {
      setLoading(true);
      setTimeout(() => {
        setJobs(mockJobs);
        setLoading(false);
      }, 1000);
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'All') return matchesSearch;
    if (activeFilter === 'Remote') return matchesSearch && job.location === 'Remote';
    
    // Check tags for other filters
    const matchesFilter = job.tags.some(tag => 
      tag.toLowerCase().includes(activeFilter.toLowerCase())
    ) || job.title.toLowerCase().includes(activeFilter.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Career Opportunities</h1>
        <p className={styles.subtitle}>Find your next role in top tech companies.</p>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Search Roles</h3>
            <Input 
              type="text" 
              placeholder="Job title or company..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Categories</h3>
            <div className={styles.filterChips}>
              {FILTER_CATEGORIES.map(category => (
                <button
                  key={category}
                  className={`${styles.filterChip} ${activeFilter === category ? styles.activeChip : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.jobListContainer}>
          <div className={styles.listHeader}>
            <h2 className={styles.resultsCount}>
              {loading ? 'Loading jobs...' : `${filteredJobs.length} Jobs Found`}
            </h2>
          </div>
          
          <JobList jobs={filteredJobs} loading={loading} error={false} />
        </div>
      </div>
    </div>
  );
};

export default Careers;
