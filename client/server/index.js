// server/index.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3001;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root@123",
  database: "guhuza_job_seeking_game",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "your_jwt_secret", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// GET route to fetch user details
app.get("/api/user-details", authenticateToken, (req, res) => {
  const userId = req.user.userId;

  connection.query(
    "SELECT username, email, userType FROM users WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(results[0]);
    }
  );
});

app.post("/api/register", (req, res) => {
  const { username, email, password, userType } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('userType: ',userType)
    connection.query(
      "INSERT INTO users (username, email, password, userType) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, userType], 
      (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.id }, "your_jwt_secret");
        res.json({ message: "Login successful", token,  userType: user.userType });
      });
    }
  );
});

app.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM game_scores", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// API endpoint to fetch job titles from MySQL
app.get("/api/job-titles", (req, res) => {
  const query = "SELECT job_title, description FROM job_titles";
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// POST route to save score
// app.post("/api/save-score", (req, res) => {
//   const { username, email, userType, score } = req.body;

//   console.log("Received data:", username, email, userType, score);

//   // Insert a new record for the user
//   connection.query(
//     "INSERT INTO game_scores (username, email, userType, score) VALUES (?, ?, ?, ?)",
//     [username, email, userType, score],
//     (err) => {
//       if (err) {
//         return res.status(500).json({ error: "Database insertion error" });
//       }
//       res.json({ score: score });
//     }
//   );
// });

// POST route to save score
app.post("/api/save-score", (req, res) => {
  const { username, email, userType, score } = req.body;

  console.log("Received data:", username, email, userType, score);

  // Check if the user already has a score
  connection.query(
    "SELECT score FROM game_scores WHERE username = ? AND email = ?",
    [username, email],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Database query error" });
      }
      
      console.log("Received results:", results.length);

      if (results.length > 0) {
        // User already has a score, check if the new score is higher
        const existingScore = results[0].score;
        if (score > existingScore) {
          // Update the score to the higher value
          connection.query(
            "UPDATE game_scores SET score = ? WHERE username = ? AND email = ?",
            [score, username, email],
            (updateErr) => {
              if (updateErr) {
                console.error("Database update error:", updateErr);
                return res.status(500).json({ error: "Database update error" });
              }
              return res.json({ message: "High score updated", score });
            }
          );
        } else {
          // No update needed, the existing score is higher
          return res.json({ message: "Score not updated (existing score is higher)", score: existingScore });
        }
      } else {
        // No existing score, insert a new record
        connection.query(
          "INSERT INTO game_scores (username, email, userType, score) VALUES (?, ?, ?, ?)",
          [username, email, userType, score],
          (insertErr) => {
            if (insertErr) {
              console.error("Database insertion error:", insertErr);
              return res.status(500).json({ error: "Database insertion error" });
            }
            return res.json({ message: "Score saved successfully", score });
          }
        );
      }
    }
  );
});


// GET route to fetch the best score of a user
app.get("/api/user-best-score", (req, res) => {
  const { email } = req.query;

  connection.query(
    "SELECT best_score FROM game_scores WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length > 0) {
        res.json({ bestScore: results[0].best_score });
      } else {
        res.json({ bestScore: 0 }); // Default score if no record found
      }
    }
  );
});

// GET route to fetch the group best score
app.get("/api/group-best-score", (req, res) => {
  connection.query(
    "SELECT MAX(best_score) AS groupBestScore FROM game_scores",
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ groupBestScore: results[0].groupBestScore || 0 }); // Default score if no record found
    }
  );
});

// Get questions for a particular job title
app.get("/api/questions", (req, res) => {
  const { job_title } = req.query;

  if (!job_title) {
    return res.status(400).json({ error: "Job title is required" });
  }

  // Proceed with querying the database for the questions
  const jobTitleQuery = "SELECT id FROM job_titles WHERE job_title = ?";
  connection.query(jobTitleQuery, [job_title], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Job title not found" });
    }

    const jobTitleId = results[0].id;
    const questionsQuery = "SELECT * FROM questions WHERE job_title_id = ?";
    connection.query(questionsQuery, [jobTitleId], (err, questions) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (questions.length === 0) {
        return res
          .status(404)
          .json({ error: "No questions found for this job title" });
      }

      res.json(questions);
    });
  });
});


// Upload CV
app.post("/apply", (req, res) => {
  const { fullName, email, phone, messageToHR } = req.body;

  // Validate input data
  if (!fullName || !email || !phone || !messageToHR) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // SQL query to insert application data into the database
  const sql = "INSERT INTO job_applications (fullName, email, phone, messageToHR) VALUES (?, ?, ?, ?)";
  
  connection.query(sql, [fullName, email, phone, messageToHR], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Failed to submit the application." });
    }
    
    // Respond with a success message
    res.status(200).json({ message: "Application submitted successfully.", data: result });
  });
});


// View Uploaded CV's
app.get("/job-posts", (req, res) => {
  // SQL query to fetch all job applications ordered by creation date
  const sql = "SELECT * FROM job_applications ORDER BY created_at DESC";

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching job posts:", err);
      return res.status(500).json({ error: "Failed to fetch job posts." });
    }

    // Return job posts
    res.status(200).json({
      jobPosts: result,
    });
  });
});


// post a job
app.post('/post-job', (req, res) => {
  const { jobTitle, jobDescription, companyName, location, salary, jobType } = req.body;

  try {
    const sql = 
      "INSERT INTO job_posts (jobTitle, jobDescription, companyName, location, salary, jobType) VALUES (?, ?, ?, ?, ?, ?)";
     
      connection.query(sql, [jobTitle, jobDescription, companyName, location,salary,jobType], (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).json({ error: "Failed to submit the application." });
        }
        // Respond with a success message
        res.status(200).json({ message: "Job posted successfully!", data: result });
      });
    } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({ error: 'Failed to post the job' });
  }
});


// Get all the Uploaded Jobs
app.get("/job-uploaded", (req, res) => {
  // SQL query to fetch all job posts ordered by creation date
  const sql = "SELECT * FROM job_posts ORDER BY created_at DESC";

  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching job posts:", err);
      return res.status(500).json({ error: "Failed to fetch job posts." });
    }

    // Return job posts
    res.status(200).json({
      jobPosts: result,
    });
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
