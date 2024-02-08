# KWS2100 Geographic Information Web Systems
Repository accompanying me throughout the GIS (Geographical Information Web Systems) course.
It serves as a log of exercises and lectures, each on their respective branch.
Navigate through the branches to find specific content related to each exercise or lecture.

## Technologies
- OpenLayers
- PostGIS
- React with TypeScript
- Express

## Branch: Exercise/1

Create a React application that displays information on a map

- [x] Use Vite to create a React + Typescript application
- [x] Verify that you can make changes and see them displayed in the web page
- [x] Replace the App component with a component that uses Openlayers to display a map
- [x] Add kommuner in Norway as a vector layer

## Branch: Exercise/2

Build a vite project from scratch, set up GitHub Actions workflow and then deploy a React application
that lets users click on information on a map.

### 1. Set up a vite project and enable GitHub Actions workflow

- [x] Create a new GitHub repository (creating new branch instead)
- [x] Clone the project locally
- [x] Create an empty npm project -> echo {} > package.json
- [x] Add Vite and TypeScript as dependencies
- [x] Create a dev and build script that calls vite and vite build, respectively -> npm pkg scripts.dev/build="vite/vite build"
- [x] Create index.html
- [x] Create a GitHub Action Workflow that calls npm run build
- [x] Update your GitHub Actions workflow to include [GitHub pages deployment](https://github.com/actions/deploy-pages)
  - https://didrichsen.github.io/kws-2100-geographic-information-web-systems/

### 2. Display an interactive map where kommuner can toggles on/off

- [x] Add react, react-dom and @types definitions
- [x] Create a map using ol and OSM
- [x] Add [kommuner in Norway](https://www.eriksmistad.no/norges-fylker-og-kommuner-i-geojson-format/) as a vector layer.
- [x] Commit and make sure the GitHub Actions workflow runs successfully and the page is deployed to GitHub pages.
- [x] Add a click handler on the map that displays the name of the clicked kommuner in a dialog box.
- [x] Add toggle functionality to the kommuner layer to toggle it on/off.

## Branch: Exercise/3

Continue from exercise two. Switch out dialog box with an aside that displays the name of the kommuner
which are in the current view.

### 1. Display and interact with information on map.

- [x] The user should be able to focus on their own position
- [x] The user should be able to toggle display of kommune layer on and off
- [x] When the user clicks on the map with kommuner on, an overlay should show the name of the clicked feature.
- [x] The map should show an overlay with mark of a chosen city.