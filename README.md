# README
[![Build Status](https://travis-ci.com/kimoofey/notice-board.svg?branch=dev)](https://travis-ci.com/kimoofey/notice-board)

Project for "Security of Internet applications" in Peter the Great St.Petersburg Polytechnic University

### Tech

In project we use technologies:
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Bootstrap](https://getbootstrap.com/)
* [Express](https://expressjs.com/)

### Installation

Before start you need to have **[Git](https://git-scm.com/)**, **[Node JS](https://nodejs.org/en/)**, **npm**, **[Express](https://expressjs.com/)** installed on your machine.

1. Clone repository using Git.
2. Install project's dependencies by running `npm install` from **both** root and frontend folders.
3. Run `npm run start:dev` from root folder. It will run Express on 3001 port via nodemon. To restart it just save changes and nodemon will automatically restarting the server.
4. Run `npm start` from frontend folder. It will run application on 3000 port.

### Deployment

1. To check if everything working well after working on your branch, you need to create pull request;
2. Then Travis automatically will check your pull request (tests and build);
3. After that on Heroku will be created pipeline (the link on it will be in the pull request);
4. When your request will be approved, it will be merged into dev branch, that also will be checked by Travis and deployed on it own pipeline;
5. Only pipelines from dev stage can be promoted to production stage.

### Links
[Dev server](https://web-notice-board-dev.herokuapp.com/)

[Production server](https://web-notice-board.herokuapp.com/)
