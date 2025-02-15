#!/bin/bash

# Starting date for commits (365 days ago)
start_date=$(date -d "365 days ago" +"%Y-%m-%d")

# Loop through each day, create a new empty commit, and move back one day
for i in $(seq 0 364); do
  # Calculate the date for each commit (from 365 days ago to today)
  commit_date=$(date -d "$start_date + $i days" +"%Y-%m-%d")
  
  # Set the GIT_AUTHOR_DATE and GIT_COMMITTER_DATE to simulate commits on past dates
  GIT_AUTHOR_DATE="$commit_date 12:00:00" GIT_COMMITTER_DATE="$commit_date 12:00:00" git commit --allow-empty -m "Commit for $commit_date"
  
  # Push the commit to the remote repository
  git push origin main --force
  
  # Optional: Sleep a little to avoid rate limiting
  sleep 1
done
