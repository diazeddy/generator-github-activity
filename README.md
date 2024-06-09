# Generator-GitHub-Acitivity

## Description
Additionally, user should be able to generate GitHub activity project and download as a *.zip file.
Parameters:
 - Activity Period: Start Date, End Date
 - Maximum commits per day:
 - Frequency: How much percentage of the activity period is used
   For example, 100% -> there's git commit history for all the days during the period.
   60% -> there's git commit history about 60% of the days in the period
Notes: Validation is required

## Description
- Generate git history
- Convert mkdir, writeFile, and exec function with promisify
- Make a zip file and download it on frontend.

## Environment
- Windows 11
- Node v16.14.0
- Npm 8.3.1

## Tech stacks
- Vite + React + Typescript
- Express

## Steps to run program
1. Install node modules
   ```shell
   npm install
   ```

2. Create .env file
   ```
   GIT_USERNAME="Generator GitHub Acitivity"
   GIT_EMAIL="generator.github.activity@gmail.com"
   ```

3. Run project
   ```shell
   npm run dev
   ```
This will host the project on http://localhost:3000. 