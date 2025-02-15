import React, { useState, useEffect } from 'react';
import './HireACandidate.css';

function HireACandidate() {
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    // Fetch all job posts on page load
    const fetchJobPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/job-posts');
        const data = await response.json();

        if (response.ok) {
          setJobPosts(data.jobPosts);
        } else {
          console.error('Error fetching job posts:', data.error);
        }
      } catch (error) {
        console.error('Error fetching job posts:', error);
      }
    };

    fetchJobPosts();
  }, []);

  const openPdf = () => {
    // Open the fake.pdf in a new tab
    window.open('/images/fake.pdf', '_blank');
  };

  return (
    <div className="job-posts-container">
      <h2>Latest Candidate Applied</h2>
      <div className="job-posts-list">
        {jobPosts.map((post) => (
          <div key={post.id} className="job-post-card">
            <div className="job-post-header">
              <p><strong>Name:</strong>{post.fullName}</p>
              <span className="phone"><strong>Contact:</strong>{post.phone}</span>
            </div>
            <p className="message-to-hr"> <strong>Message to HR:</strong>{post.messageToHR}</p>
            <div className="job-post-details">
              <p><strong>Email:</strong> {post.email}</p>
              <p><small>Posted on: {new Date(post.created_at).toLocaleDateString()}</small></p>
            </div>
            <button className="apply-button" onClick={openPdf}>Review Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HireACandidate;
