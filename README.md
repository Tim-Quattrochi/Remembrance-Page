# Remembrance-Page

### Summary

---

I began building this tribute site in January 2023 in memory of my brother, who passed away in March 2022. The site includes a Guest Book where family and friends can sign up using their email or Google accounts, create posts, and interact with posts by liking or 'Heart'-ing them.

This project underwent refactoring in August 2023. It is manually deployed to an AWS EC2 instance via the Ubuntu command line. Nginx serves as a reverse proxy to forward requests to my Express server and handles SSL/TLS encryption. Additionally, PM2, a process manager, is used to maintain the application's continuous operation.

[Link to deployed site]

### Table of Contents

---

1. [Development](#development)
2. [Motivation](#motivation)
3. [What I learned](#what-i-learned)
4. [Client ENV Variables](#client-environment-variables)
5. [Server ENV Variables](#server-environment-variables)
6. [Starting the app](#starting-the-app)
7. [Tech Stack](#tech-stack)
8. [Features](#features)
9. [Deployment](#deployment)

#### Current Look of the Landing page.

![picture of the landing](/current-look.png)

### Motivation

I initiated this project in 2022 while I was enrolled at Kenzie Academy through Southern New Hampshire University. Initially, I developed it using vanilla JavaScript. However, I wanted to gain more experience with React, so I created this repository. [Link to other Repo](https://github.com/Tim-Quattrochi/Jerry-Krikava)

The project served as a valuable platform for me to hone my skills in various React aspects, including converting a mock-up into React components, implementing useReducer, creating custom React Hooks, utilizing the Context API, ensuring data persistence, integrating Google OAuth, and designing a solid backend architecture.

By July 2023, I recognized the need for improvements. The background image lacked responsiveness, the text cards needed better spacing, and I wanted to apply my growing knowledge to refactor the components in a more organized manner. Each component now has its own dedicated folder along with its individual CSS file.

### What I learned

---

Working on this app was quite the journey, and it came with its fair share of challenges. I delved deep into the world of authentication, getting a solid grasp of the Google Auth flow, ensuring that logins persisted, and mastering state management using useReducer and the Context API.

Originally, I had implemented Passport.js solely for the Google strategy. However, I wanted to accommodate local users who preferred the traditional email and password login method. So, I decided to implement the local strategy as well, and it made perfect sense. With this setup, I could also tap into Passport.js's convenient req.isAuthenticated check, simplifying user handling and session management.

Form validation was another aspect I got practice on. I worked on customizing Bootstrap inputs to display my own messages, making sure that the inputs were accessible to screen readers and other assistive technologies. Since the project had initially started with React Bootstrap, I stuck with it and deepened my knowledge of customizing React Bootstrap components.

One of the most rewarding experiences came when I tackled the deployment process. I gained more valuable expertise in deploying a full-stack application to an AWS EC2 instance using the Ubuntu command line. Setting up NGINX as a reverse proxy and implementing SSL/TLS for security was a significant milestone. Plus, keeping the app running smoothly was made possible with the help of PM2, a process manager.

### Development

---

Remembrance-Page requires [Node.js](https://nodejs.org/) v10+ to run. Tested on version `18.16.0`

This App uses [NPM](https://www.npmjs.com/) Node Package Manager to manage its dependencies and packages.

from the **Root** directory

```
$ npm install
```

This will install dependencies for the front end and backend simultaneously as I have configured [Workspaces] to define the `client` and `server` directories in the root `package.json`.

### Client environment variables

---

All Vite environment variables must start with `VITE_` Create a .env file in the client folder and add your values.

For example:

```
VITE_ENV=development
VITE_APP_API_URL=YOUR BASE URL FOR YOUR API
```

### Server environment variables

---

Create a .env file in the server folder and add your values.

To set up your google callback url, please follow the instructions by [Google]. You will need to set up credentials and enter your call back url into your Google developer console.

For example:

```
 PORT=3001
 API_URL=YOUR BASE URL FOR YOUR API FOR SERVER
 NODE_ENV=development
 DB_URI=YOUR_OWN_MONGO_DB_CONNECTION_STRING
 JWT_SECRET=YOUR_JWT_SECRET
 JWT_EXPIRES_IN=30d
 GOOGLE_CALLBACK_URL=YOUR VALUE
 CLIENT_HOME_PAGE_URL=YOUR CLIENT URL
 SESSION_SECRET=A SECRET FOR YOUR SESSIONS
```

### Starting the app

---

This App uses [concurrently] to start both the client and server. I have configured the root `package.json` to define workspaces with the client and server. So in the ROOT directory:

```
$ npm start
```

This will start your `client` on `http://localhost:5173/` and backend in development mode on `http://localhost:3001/`, with the server listening on `PORT` 3001.

## Features

- You can create an account by registering with your email and password, or simply sign in using your Google credentials.

- Authentication using JSON web tokens and Express sessions.
- Create, Read, and like posts.
- Image carousel with responsive and optimized images.

## Tech Stack

### **Front-end**

- [Vite] - Build tool that aims to provide a faster and leaner development experience for modern web projects.

- [React] - React is a JavaScript library for building user interfaces, using a declarative and component-based approach for efficient UI development.

- [React Bootstrap] - React Bootstrap is a library that integrates Bootstrap components seamlessly into React applications, simplifying UI development with pre-built, reusable components.

### **Back-end**

---

- [Mongoose] - is an object modeling tool for MongoDB and Node.js.

- [Node.js] - Cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS, and more. Node.js is a backend JavaScript runtime environment that runs on the V8 JavaScript Engine and executes JavaScript code outside a web browser.

- [Express] - is a backend web application framework for building RESTful APIs with Node.js

- [MongoDB] - is a fully managed cloud database service that allows you to quickly deploy, scale, and operate MongoDB databases in the cloud.

- [JSON Web Tokens] - are a secure way to represent claims between parties. They are commonly used for user authentication and authorization in web applications, providing efficient and scalable solutions. JWTs store user information in a compact format and are widely adopted due to their stateless nature, improving performance and scalability. However, security measures must be taken to protect JWTs from potential attacks.

- [Bcrypt] - is a secure cryptographic hashing function used to hash passwords in web applications. It provides strong protection against password-related attacks, making it a preferred choice for password storage and authentication.

- [Passport.js] - is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.

### Deployment

- [Nginx] - Nginx is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.

- [AWS EC2] - An EC2 instance is simply a virtual server in Amazon Web Services terminology. With an EC2 instance, AWS subscribers can request and provision a computer server within the AWS cloud.

- [PM2] - PM2 is a daemon process manager that will help you manage and keep your application online 24/7

**Find a bug?**

I welcome contributions. Simply clone the repository and open a pull request and I will review them.

[Back to top](#remembrance-page)

[Passport.js]: https://www.passportjs.org/
[Bcrypt]: https://www.npmjs.com/package/bcrypt
[nginx]: https://www.nginx.com/
[pm2]: https://pm2.keymetrics.io/
[aws ec2]: https://aws.amazon.com/pm/ec2/?trk=9cd376cd-1c18-46f2-9f75-0e1cdbca94c5&sc_channel=ps&ef_id=CjwKCAjw8-OhBhB5EiwADyoY1QxxcGo4K0YGQjyUr9xX0Ttc1fkrW-xpgjPRjxiHxBuAfvsvbWKh0xoCjfIQAvD_BwE:G:s&s_kwcid=AL!4422!3!651751059309!e!!g!!aws%20ec2!19852662176!145019189697
[Vite]: https://vitejs.dev/
[mongoose]: https://mongoosejs.com/
[mongodb]: https://www.mongodb.com/atlas/database
[React Bootstrap]: https://react-bootstrap.netlify.app/
[node.js]: http://nodejs.org
[JSON Web Tokens]: https://jwt.io/
[express]: http://expressjs.com
[react]: https://react.dev/
[concurrently]: https://www.npmjs.com/package/concurrently
[http://54.90.137.205/]: http://54.90.137.205/
[Workspaces]: https://docs.npmjs.com/cli/v8/using-npm/workspaces
[Link to deployed site]: https://jerrykrikava.com
[Google]: https://developers.google.com/identity/sign-in/web/sign-in
