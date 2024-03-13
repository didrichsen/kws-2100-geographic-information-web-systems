# KWS2100 Kartbaserte Websystemer: Exercise 8
## Serve vector layer from PostGIS

### Prerequisites
#### What you should already have done:
- Create a local React application with OpenLayers.
- Show a polygon vector layer in OpenLayers (e.g., kommune).
- Show a point vector layer in OpenLayers (e.g., schools).

#### Expected knowledge from before:
- Create an Express application.
- Run a Docker Compose script.
- Connect to a database using IntelliJ.

### The task
Instead of serving geographical data from a static file, we want to serve it from a database.

#### Part 1: Import data in PostGIS
1. Create a `docker-compose.yaml` with postgis. [x]
2. Download kommuner from Geonorge. [x]
3. Import kommuner into PostGIS. [x]
    - Hint: "docker exec -i postgis /usr/bin/psql --user postgres norway_data < path to .sql-file"
4. Download addresses from Geonorge and import into PostGIS.
    - Hint: "docker exec -i postgis /usr/bin/psql --user postgres norway_data < path to .sql-file"
5. Download grunnkrets from Geonorge and import into PostGIS.
    - Hint: "docker exec -i postgis /usr/bin/psql --user postgres norway_data < path to .sql-file"
6. Connect to the database using IntelliJ and copy data from imports.[x]
7. Create table `public.kommune` as select `kommunenummer`, ... from `schema.kommune`.[x]
    - Hint: If you use `st_transform` to convert the reference system to the data, you will be able to join later.
8. Alter table `public.kommune` add primary key.[x]
9. Create index `kommune_omrade` on `kommune` using `gist (omrade)`.[x]

#### Part 2: Explore data in PostGIS
- Find the address id for the schools address.
- Find all addresses within 100 meters of a given address.
    - Hint: Use the `ST_DWithin` function.
- Include the distance of each match from the given address.
    - Hint: Use the `ST_Distance` function.
- Join the addresses from the previous step with the `grunnkrets` where they reside.
    - Hint: Use the `ST_Contains` function.

#### Part 3: Consume APIs with a Vite project
- Set up `vite.config.js` to use Express as backend:

```javascript
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
