import React, { useState, useEffect } from 'react';
import './ApplyJob.css';

function ApplyJob() {
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    // Fetch all job posts on page load
    const fetchJobPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/job-uploaded');
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
    <h2>Available Jobs</h2>
      <div className="job-posts-list">
        {jobPosts.map((post) => (
          <div key={post.id} className="job-post-card">
            <div className="job-post-header">
              <p><strong>Job Title:</strong> {post.jobTitle}</p>
              <span className="company"><strong>Company:</strong> {post.companyName}</span>
            </div>
            <p className="job-description"> <strong>Description:</strong> {post.jobDescription}</p>
            <div className="job-post-details">
              <p><strong>Location:</strong> {post.location}</p>
              <p><strong>Salary:</strong> {post.salary}</p>
              <p><strong>Type:</strong> {post.jobType}</p>
              <p><small>Posted on: {new Date(post.created_at).toLocaleDateString()}</small></p>
            </div>
            <button className="apply-button">Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplyJob;
