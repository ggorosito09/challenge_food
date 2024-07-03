
# *Engineering Challenge* - Gonzalo Gorosito

  
## Brainstorming

Since the API provided included geoJson capabilities, I thought working towards (an almost) map-centric application would be the best approach.
Questions like "what can I answer with this data that is both effective and elegant to see more than just a raw table?" and the map solution came as a first idea so I went ahead.
Next step was trying to define the stack and scope of the MVP. Given the time limit of "some" hours and striving for "experiences" the direction resulted in the following trade-off

 - Pick Node as a backend 
   - Ensure speed in the API setup. 
   - Know about  points to be taken later in more depth: Authentication, Configuration (ENVs, secrets, etc)
- Focus more on retrieve data that can be visualized, and has sense.
- Use a combination of React and Leaflet for the FrontEnd, and add some OOB components from Material UI (like for Table easy support) 
   - Define some main ideas of a possible "landing page" and "main page" sections over the "main page", giving more protagonist to the Map component. 
   - See what could be done to make it more "astonishing" (like try to think outside the plain base map we can see everywhere)
 - Caveats to know
   - Testing will be left for another iteration, again for the time constraint. We could later use Mocha and Jest
   - Migrate into a strongly typed version, use TypeScript if possible.
   - Dockerize the application  
   - Analyze pros-cons of another Map Services. 
     - MapBox has many interesting things worth to keep working on them, and the integration with Leaflet (for POCs at least) is interesting. Maybe migrate to ESRI later.  

  

## Features

 - Express route to connect Socrata API, and provide some first steps into the SoQL
 - UI to answer the simple center question "What to eat today?" and use that as super generic broader query
   - A table to visualize quickly results
   - And a Map to visualize custom markers

  
 

## Get Started

  

```sh

git clone https://github.com/ggorosito09/challenge_food.git

Terminal 1
cd backend
npm run dev


Terminal 2
cd frontend
npm run dev

```

 
  


## To Dos

Cleanup API KEYS (specially MAPBOX)
Setup again repository as Private. (for the time being it will be Public for the interview)
... a lot more.
