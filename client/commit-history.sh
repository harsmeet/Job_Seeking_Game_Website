#!/bin/bash

# Starting date for commits (365 days ago)
start_date=$(date -d "365 days ago" +"%Y-%m-%d")

# File to modify (You can change this to any file in your repo)
file_to_modify="your_file.txt"

# Ensure the file exists or create it
if [ ! -f "$file_to_modify" ]; then
  echo "Initial content" > "$file_to_modify"
fi

# Loop through each day, create a new commit, and move back one day
for i in $(seq 0 364); do
  # Calculate the date for each commit (from 365 days ago to today)
  commit_date=$(date -d "$start_date + $i days" +"%Y-%m-%d")
  
  # Modify the file (e.g., add a dot to the file)
  echo "." >> "$file_to_modify"
  
  # Stage the file for commit
  git add "$file_to_modify"
  
  # Set the GIT_AUTHOR_DATE and GIT_COMMITTER_DATE to simulate commits on past dates
  GIT_AUTHOR_DATE="$commit_date 12:00:00" GIT_COMMITTER_DATE="$commit_date 12:00:00" git commit --allow-empty -m "Commit for $commit_date"
  
  # Push the commit to the remote repository (Note: If you already have commits, remove --force to avoid overwriting history)
  git push origin main
  
  # Optional: Sleep a little to avoid rate limiting
  sleep 1
done
