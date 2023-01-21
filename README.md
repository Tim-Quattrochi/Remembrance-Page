# Remembrance-Page

A tribute site built in memory of my brother who passed away in March 2022. This project was first started as another repo using vanilla JS but I have used my knowledge from my studies from my 9 month Full Stack Web Development program at Kenzie Academy. [Link to other Repo](https://github.com/Tim-Quattrochi/Jerry-Krikava) What a difference!

## Tech Stack

- [React](https://reactjs.org/)

- [Express](https://expressjs.com/)

- [MongoDB](https://www.mongodb.com/)

- [Node.js](https://nodejs.org/)

- [React Bootstrap](https://react-bootstrap.github.io/)

## Features

- Guestbook where visitors can sign up and make posts that are saved in MongoDB.

- "Heart" feature where users can show their support for a post by clicking on a heart icon. Each post will display the number of hearts and the users who hearted it.

- User authentication

- Mobile responsive design

- Global state management using React Context and useReducer

## Challenges

- Converting a mockup layout from AdobeXD into React components

- Learning and implementing React Bootstrap for styling

- Creating a user and post schema that references likes

- Guarding against multiple clicks on the heart icon to prevent excessive HTTP calls

- Reinforcing my understanding of user authentication and implementing it in the project

## Running the project

1. Clone the repository

```bash

git clone https://github.com/[Tim-Quattrochi]/Remembrance-Page.git
```

2. Navigate to the project root

```bash
cd Remembrance-Page
```

2. Install the dependencies

```bash
npm install
```

3. Add your MongoDB URI in the `/packages/server/config/db.js` file.

4. Add your `PORT` to the `express` server in `packages/server/server.js`

```bash
npm start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

```

```
