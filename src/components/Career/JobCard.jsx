import React from 'react';
import styles from './JobCard.module.css';
import Card from '../shared/Card';
import Badge from '../shared/Badge';
import Button from '../shared/Button';

const JobCard = ({ job }) => {
  const { title, company, location, type, salary, tags, postedAt, logo } = job;

  return (
    <Card className={styles.jobCard}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          {logo ? (
            <img src={logo} alt={`${company} logo`} className={styles.logo} />
          ) : (
            <div className={styles.logoPlaceholder}>
              {company.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className={styles.titleInfo}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.companyName}>{company}</p>
        </div>
        <div className={styles.actionDesktop}>
          <Button variant="primary" size="md">Apply Now</Button>
        </div>
      </div>

      <div className={styles.detailsRow}>
        <div className={styles.infoGroup}>
          <Badge variant="neutral">{location}</Badge>
          <Badge variant="primary">{type}</Badge>
          {salary && <span className={styles.salary}>{salary}</span>}
        </div>
        <span className={styles.postedAt}>{postedAt}</span>
      </div>

      <div className={styles.tagsContainer}>
        {tags && tags.map((tag, index) => (
          <Badge key={index} variant="neutral" className={styles.tag}>
            {tag}
          </Badge>
        ))}
      </div>

      <div className={styles.actionMobile}>
        <Button variant="primary" size="md" className={styles.fullWidthBtn}>Apply Now</Button>
      </div>
    </Card>
  );
};

export default JobCard;
