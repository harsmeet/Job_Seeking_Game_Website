import React, { useState } from 'react';
import './UploadAJob.css';

function UploadAJob() {
 
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    companyName: '',
    location: '',
    salary: '',
    jobType: '', // For example: full-time, part-time, contract
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cv: e.target.files[0] });
  };

  // Mark handleSubmit as async
  const handleSubmit = async (e) => {
    e.preventDefault();

      
    // Create a JSON object to send
    const payload = {
      jobTitle: formData.jobTitle,
      jobDescription: formData.jobDescription,
      companyName: formData.companyName,
      location: formData.location,
      salary: formData.salary,
      jobType: formData.jobType,
    };
    console.log('Job posted:', payload);

    try {
      // Send the POST request to the /post-job endpoint
      const response = await fetch("http://localhost:3000/post-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Set content type to JSON
        },
        body: JSON.stringify(payload),  // Send the payload as a JSON string
      });

      // Check if the response is okay (status 2xx)
      if (!response.ok) {
        throw new Error("Failed to post the job");
      }

      // Parse the response data
      const result = await response.json();

      // Handle the response data (e.g., display a success message or redirect)
      alert(result.message || "Job posted successfully.");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post the job.");
    }
  };

  return (
    <div className="apply-job-container">
      <h2>Post a Job for the Candidates</h2>
      <form className="apply-job-form" onSubmit={handleSubmit}>
        <div className="form-group">
          
        <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            required
          />

        </div>

        <div className="form-group">
        <label htmlFor="jobDescription">Job Description</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            placeholder="Describe the responsibilities and qualifications"
            required
          />
        </div>

        <div className="form-group">
        <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
        <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
        <label htmlFor="salary">Salary</label>
          <input
            type="text"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
        <label htmlFor="jobType">Job Type</label>
          <select
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
    </div>
  );
}

export default UploadAJob;
