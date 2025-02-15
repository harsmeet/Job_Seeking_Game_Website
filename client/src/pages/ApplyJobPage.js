import React, { useState } from 'react';
import './ApplyJobPage.css';

function ApplyJobPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    messageToHR: '',
    cv: null,
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
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          messageToHR: formData.messageToHR,
        };
        console.log('Form data submitted:', payload);

        try {
          // Send the POST request to the /apply endpoint
          const response = await fetch("http://localhost:3000/apply", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",  // Set content type to JSON
            },
            body: JSON.stringify(payload),  // Send the payload as a JSON string
          });
    
          // Check if the response is okay (status 2xx)
          if (!response.ok) {
            throw new Error("Failed to submit the application");
          }
    
          // Parse the response data
          const result = await response.json();
    
          // Handle the response data (e.g., display a success message or redirect)
          alert(result.message || "Application submitted successfully.");
        } catch (error) {
          console.error("Error submitting application:", error);
          alert("Failed to submit the application.");
        }

  };

  return (
    <div className="apply-job-container">
      <h2>Apply for Your Dream Job</h2>
      <form className="apply-job-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cv">Upload Your CV</label>
          <input type="file" id="cv" name="cv" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        </div>

        <div className="form-group">
          <label htmlFor="messageToHR">Say Something to HR</label>
          <textarea
            id="messageToHR"
            name="messageToHR"
            value={formData.messageToHR}
            onChange={handleInputChange}
            placeholder="Why do you want this job?"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
    </div>
  );
}

export default ApplyJobPage;
