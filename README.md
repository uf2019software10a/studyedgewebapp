# Study Edge (Study Social) Reservation Web App
This is the github code for CEN3031 Group 10A's Project, which is a reservation system for Study Edge. 

## Overview
Study Edge wants to implement tutoring for small groups ranging around 5-10 individuals. A student will first sign in through Study Edge's Facebook app, and then be redirected to the reservation system. Students can pick their exam or class, and reserve slots that are availible. After reserving, the location or url(if an online review) will be displayed. The admin side of the site is able to create and edit the exam review slots. It can also reivew a specific slot in order to see which students signed up and what they want to be covered.

## Features
* Students Verified through Study Edge's Facebook App
* Filter View Slots by Exams and/or Class 
* Students can enter prefered email and topics they want covered in the review session
* Confirmation Email with details of exam sessions sent to user's prefered email. 
* Students can only sign up for 1 review session per distinct exam (Ex. can't sign up for multiple MAC2311 Exam 1)
* Administration Side can Add, Edit, and Delete exam Slots
* Administration Side can also view current slots to see specific students and topic they want to have covered

## Sourced code
* Eliminate duplicates from an array of objects based on an element of that object
=> https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep

## Dependencies
These can be found in package.json . These must be installed on local in order to run development scripts.
* "all": "0.0.0",
* "axios": "^0.19.0",
* "body-parser": "^1.19.0",
* "concurrently": "^4.1.0",
* "cookie-parser": "^1.4.4",
* "cors": "^2.8.5",
* "express": "^4.17.1",
* "express-session": "^1.17.0",
* "is-empty": "^1.2.0",
* "mocha": "^6.2.1",
* "mongoose": "^5.7.1",
* "morgan": "^1.9.1",
* "nodemailer": "^6.3.1",
* "nodemon": "^1.18.10",
* "passport": "^0.4.0",
* "passport-local": "^1.0.0",
* "react-history": "^0.18.2",
* "should": "^13.2.3",
* "supertest": "^4.0.2",
* "validator": "^12.1.0"
 

## Running Project Locally
Cloning the GitHub and running 'npm run-script dev' sets up the development to run locally

##
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project contains an example project board meant to showcase how one can be used. The issues posted to it are not real issues.


## Getting Started

Since this project will hold both the client application and the server application there will be node modules in two different places. First run `npm install` from the root. After this you will run `npm run-script install-all` from the root. From now on run this command anytime you want to install all modules again. This is a script we have defined in package.json .


## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components.
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!


## Available Scripts

In the project directory, you can run:

### `npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


### `npm run-script server`

Runs just the server in development mode.<br>


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn how to setup a local MongoDB instance for testing, check out how to [Connect to MongoDB](https://docs.mongodb.com/guides/server/drivers/).

To learn how to deploy a full-stack web app to heroku, check out [this great guide](https://daveceddia.com/deploy-react-express-app-heroku/).

To learn React, check out the [React documentation](https://reactjs.org/).

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

