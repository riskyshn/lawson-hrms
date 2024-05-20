## HRMS BASIC by Jobseeker Software

### How to Clone

1. **Fork the Repository**:

   - Navigate to the repository on GitHub.
   - Click the `Fork` button at the top right of the page to create your own copy of the repository. **Important:** Do not clone and push to a new branch without forking.

2. **Clone Your Forked Repository**:
   - Once you have forked the repository, clone it to your local machine using the following command:
     ```sh
     git clone https://github.com/jobseeker-company/[REPO_NAME].git
     ```
   - Replace `REPO_NAME` with the repository name..

### How to Run

#### Prerequisites

Ensure you have the following software installed:

1. **Node.js**:
   - Minimum required version: 18
   - Download and install from [nodejs.org](https://nodejs.org/).
2. **npm**:
   - Minimum required version: 6 (comes with Node.js)
   - Verify installation by running:
     ```sh
     node -v
     npm -v
     ```

#### Steps to Run

1. **Navigate to the Project Directory**:

   - Open your terminal and navigate to the cloned project directory:
     ```sh
     cd repo-name
     ```

2. **Install Dependencies**:

   - Install the required dependencies using npm:
     ```sh
     npm install
     ```

3. **Environment Configuration**:

- Create a `.env.local` file in the root directory and include the required variables. Here's an example:
  ```env
  VITE_TINYMCE_API_KEY=your_tinymce_api_key
  ```
  Ensure to replace `your_tinymce_api_key` with your actual [TinyMCE](https://www.tiny.cloud) API key.

4. **Start the Development Server**:

   - Run the following command to start the development server:
     ```sh
     npm run dev
     ```
   - This will start the server and you can access the application in your browser at `http://localhost:5173/` or the port specified in your environment configuration.

5. **Build the Application for Production**:

   - To create an optimized production build, run:
     ```sh
     npm run build
     ```
   - This will generate a `dist` directory containing your production-ready files.

6. **Preview the Production Build**:
   - To preview the production build locally, you can run:
     ```sh
     npm run preview
     ```
   - This will start a local server that serves the files from the `dist` directory.

### Additional Information

- **Hot Module Replacement (HMR)**: This application supports HMR out of the box. Any changes you make to the source code will automatically be reflected in the browser without needing a manual refresh.
- **Linting and Formatting**: Ensure code quality by running linting and formatting commands:
  ```sh
  npm run lint
  npm run format
  ```

### Troubleshooting

- If you encounter any issues while installing dependencies, try deleting the `node_modules` directory and the `package-lock.json` file, then reinstalling:

  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```

- For issues related to environment variables, ensure your `.env` file is correctly set up and all required variables are defined.

### Conclusion

You are now ready to develop and run the HRMS BASIC application by Jobseeker Software. For more advanced configurations and features, refer to the project documentation or seek help from the community forums.
