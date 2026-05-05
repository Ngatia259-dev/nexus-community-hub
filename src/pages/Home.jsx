import React, { useEffect } from 'react';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Users, Briefcase, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';

const Home = () => {
  const { posts, fetchPosts, loading } = usePosts();
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            The nexus for <span className={styles.highlight}>developers</span> to build, connect, and grow.
          </h1>
          <p className={styles.heroDescription}>
            A community hub blending networking, project building, and career opportunities for the next generation of tech talent.
          </p>
          <div className={styles.heroActions}>
            <Link to="/posts/create">
              <Button size="lg">Start a Discussion</Button>
            </Link>
            <Link to="/network">
              <Button variant="secondary" size="lg">Grow Your Network</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className={styles.featureGrid}>
        <Card className={styles.featureCard}>
          <div className={`${styles.iconWrapper} ${styles.networkingIcon}`}>
            <MessageSquare size={24} />
          </div>
          <h3 className={styles.featureTitle}>Networking</h3>
          <p className={styles.featureDescription}>Share knowledge, ask questions, and collaborate on projects with peers.</p>
        </Card>
        <Card className={styles.featureCard}>
          <div className={`${styles.iconWrapper} ${styles.communityIcon}`}>
            <Users size={24} />
          </div>
          <h3 className={styles.featureTitle}>Community</h3>
          <p className={styles.featureDescription}>Connect with developers globally and find your next project partner.</p>
        </Card>
        <Card className={styles.featureCard}>
          <div className={`${styles.iconWrapper} ${styles.careersIcon}`}>
            <Briefcase size={24} />
          </div>
          <h3 className={styles.featureTitle}>Careers</h3>
          <p className={styles.featureDescription}>Explore hand-picked opportunities and take the next step in your career.</p>
        </Card>
      </section>

      {/* Recent Activity */}
      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Discussions</h2>
          <Link to="/posts" className={styles.viewAll}>
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className={styles.postList}>
            {[1, 2, 3].map(i => (
              <Card key={i} className={styles.postCard} style={{ height: '160px' }}>
                <div className={styles.skeleton} style={{ height: '100%', width: '100%' }}></div>
              </Card>
            ))}
          </div>
        ) : (
          <div className={styles.postList}>
            {posts.slice(0, 3).map(post => (
              <Link key={post.id} to={`/posts/${post.id}`}>
                <Card className={styles.postCard}>
                  <div className={styles.postAuthor}>
                    <img src={post.author.avatar} alt={post.author.name} className={styles.authorAvatar} />
                    <span className={styles.authorName}>{post.author.name}</span>
                    <span className={styles.postDate}>• {post.date}</span>
                  </div>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postExcerpt}>{post.body}</p>
                  <div className={styles.postMeta}>
                    <span>{post.likes} likes</span>
                    <span>{Math.floor(Math.random() * 20)} comments</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
