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
  - https://didrichsen.github.io/kws-2100-geographic-information-web-systems/

## 2. Display an interactive map where kommuner can toggles on/off

- [x] Add react, react-dom and @types definitions
- [x] Create a map using ol and OSM
- [x] Add [kommuner in Norway](https://www.eriksmistad.no/norges-fylker-og-kommuner-i-geojson-format/) as a vector layer.
- [x] Commit and make sure the GitHub Actions workflow runs successfully and the page is deployed to GitHub pages.
- [] Add a click handler on the map that displays the name of the clicked kommuner in a dialog box.
- [x] Add toggle functionality to the kommuner layer to toggle it on/off.
