# topm-spa
## requirements
You will be creating 3 mini spa apps that demonstrate senior level angular requirements for the UI developer position.
[REQ-0.1] Use gulp tasks or webpack configs with npm scripts to load each app served with browser-sync.

Use angular 1.5.5 (latest stable release at the time of this writing). Use only npm dependencies, no bower. We don't like bower anymore. Document your reasons for using any dependencies.
Also document your thought process, notes, google searches, etc, as much as possible. Build each angular app in a modular fashion (no 10k line single app.js, unless it's a production bundle!). We prefer ES6 but es5 is fine. [REQ-0.2] Code linting is encouraged as part of the build process but not required.

## [REQ-1] First Mini App: LoadMe
==============================
Create a simple crud angular app with simulated splash loading delay.

1. [REQ-1.1] Load the angular app with a synthetic 3 second delay.
2. [REQ-1.2] Prior to loading, display a nice svg animated loading text, shape or progress bar.
3. [REQ-1.3] Once the app is loaded, display a simple form with Name, email fields with proper labels and a submit button.
4. [REQ-1.4] Also add a 2 option checkbox field labeled as "Contact via" with options "email,text".
5. [REQ-1.5] somewhere in the same view display a live binded model of the form in angular fashion.
6. [REQ-1.6] When the form is submitted, transition to a nice Thank you view that shows the data submitted.

### initial set-up [REQ-0.1]
- created topm-spa directory
- run git init to create git repo
- run npm init to initialize package.json
- google browser-sync // heard of it, but I have not used it before
- run npm browser-sync gulp --save-dev
- create test index.html
- run gulp serve-loadme, see contents of index.html in browser
- added loadme script tp package.json
- **[REQ-0.1] complete**

### loadme set-up [REQ-1.1]
- update gulp serve-me task to used 'loadme/'
- review angular-ui-router on github to a) identify correct version (using stable legacy version rather than 1.0alpha), and review route syntax.  I have set-up many routes, but these change infrequently, so I do not have the syntax memorized.
- run npm install angular angular-ui-router --save-dev
- create app.js with "loadMeApp" injecting "ui-router"
- Create states for "loading" and "loaded"
- create loadme/index.html with ng-app and ng-controller attributes
- add script tags for angular.js, angular-ui-router.js, and app.js
- add div with ui-view attribute
- create partial/loading.html and partial/loaded.html
- At this point, I spent more time than I would have liked to get the browserSync config to work.  I had trouble serving the  node_modules. Like many configuration issues, there was little feedback when broken, and the solution was simple once identified.
- inject $interval (googled syntax) to loadMeController to create 3 second timer (1 sec. interval), and display the counter on hte loading page.
- inject $state, added $state.go('loaded') to interval stop function.
- **[REQ-1.1] complete**


### code linting (and reload) [REQ-0.2]
- install gulp-eslint and create .eslintrc to configure for ES6
- create linting task in gulpfile.js
- refactor serve task to include watches, linting and browser-sync reload
- **[REQ-0.2] complete**

### loading animation [REQ-1.2]
- download animated svg and embed in loading.hmtl
- define positioning and animation in css
- **[REQ-1.2] complete**

### name and email form [REQ-1.3]
- add name and email form controls to partials/loaded.html
- add submit button to form
- install gulp-sass and bootstrap for styling assistance
- create gulp tasks for sass and watches
- map bootstrap classes and add some custom styling for effective presentation.
- **[REQ-1.3] complete**

### Also add a 2 option checkbox field labeled as "Contact via" with options "email,text" [REQ-1.4]
- add checkbox group to loaded.html
- **[REQ-1.4] complete**

### somewhere in the same view display a live binded model of the form in angular fashion [REQ-1.5]
- added bootstrap grid to provide page structure
- added disalbled form controls on right side (or bottom, depending on responsive layout) to echo valid entered values.
- added loadedController to maintain modularity
- **[REQ-1.5] complete**

### When the form is submitted, transition to a nice Thank you view that shows the data submitted [REQ-1.6]
- create thanks route with thanks.html template and thanksController
- create loadMeService to save and get contact information between controllers.
- **[REQ-1.6] complete**

**[REQ-1] minimum requirements complete**

## [REQ-2] Second Mini App: DirectMe
==============================
Create a simple app that takes an address input and displays google map.

1. [REQ-2.1] Create a parent/child angular directive for the address input and display of google map. Child being the google map display and parent being the required input map.
2. [REQ-2.2] Create another directive that stores address inputs into localstorage to be retrievable in a "history list" in the ui somewhere.

### directMe initial set-up [REQ-2.0]
- set-up guplfile tasks for directMe
- create directMe directory and app.js
- **[REQ-2.0] complete**

### Create a parent/child angular directive for the address input and display of google map. Child being the google map display and parent being the required input map. [REQ-2.1]
- created directMe.html as a container for the director directive.
- created director (parent) directive and template.  This contains an address form and the mapper (child) directive.
- installed angular-google-maps and google-maps-api to create the map feature.
- using Google Maps API site, and posting from [Sten Hougaard] (http://codepen.io/netsi1964/post/angularjs-google-maps-directive), I displayed a map inside our mapper.
- Also had to install lodash and angular-simple-logger to resolve dependencies with angular-google-maps.
- created geocoder service to convert address to geocode via Google API.
- Changed layout from horizontal to vertical. 
- **[REQ-2.1] complete**

### 2. [REQ-2.2] Create another directive that stores address inputs into localstorage to be retrievable in a "history list" in the ui somewhere.



## [REQ-3] Third Mini App: TestMe
==============================
Reusing the "LoadMe" mini app, create e2e tests using protractor.

1. Create protractor run tasks that execute successfully for Chrome as the target browser.
2. Create as many e2e tests as you can for the LoadMe app.


## TODO:
- ES6ify
- documentation
- architecture notes
