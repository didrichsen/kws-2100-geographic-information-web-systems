# KWS2100: Exercise 2

Build a vite project from scratch, set up GitHub Actions workflow and then deploy a React application 
that lets users click on information on a map.

## 1. Set up a vite project and enable GitHub Actions workflow
- [x] Create a new GitHub repository (creating new branch instead)
- [x] Clone the project locally
- [x] Create an empty npm project -> echo {} > package.json
- [x] Add Vite and TypeScript as dependencies 
- [x] Create a dev and build script that calls vite and vite build, respectively -> npm pkg scripts.dev/build="vite/vite build"
- [x] Create index.html
- [x] Create a GitHub Action Workflow that calls npm run build
- [x] Update your GitHub Actions workflow to include [GitHub pages deployment](https://github.com/actions/deploy-pages)