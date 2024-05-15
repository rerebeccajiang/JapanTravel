# JapanGo

![Screen Shot 2023-06-03 at 3 35 14 PM](https://github.com/rerebeccajiang/JapanTravel/assets/118489430/7990dbf8-40cb-45e9-a685-fcdb540cd77b)
Japango is a dedicated platform designed to empower travelers and enthusiasts with a passion for Japanese culture. This website serves as an invaluable resource for discovering and sharing the best Japanese establishments worldwide. Users are invited to contribute their favorite Japanese places, ranging from renowned destinations to hidden gems waiting to be uncovered.

## Table of Contents
- [Japango Features](#Japango-Features)
  - [Register/Login](#Register/Login)
  - [Browse all Places](#Browse-all-Places)
  - [Add/Edit your review](#Add/Edit-your-review)
  - [Add/Edit your place](#Add/Edit-your-place)
- [Getting Started](#getting-started)

## JapanGo Features

### Register/Login
User needs to register in order to add your favourite places and provide reviews.
![Screen Shot 2023-06-03 at 4 05 10 PM](https://github.com/rerebeccajiang/JapanTravel/assets/118489430/40c91dc8-c28a-4155-8222-f703218ce171)


Authentication via user login is required for editing the places and reviews you have contributed.
![Screen Shot 2023-06-03 at 4 12 07 PM](https://github.com/rerebeccajiang/JapanTravel/assets/118489430/ed6f6dca-9c71-4f76-9342-5d6fd7d8b8b8)


### Browse all Places
![Jun-03-2023 16-33-08](https://github.com/rerebeccajiang/JapanTravel/assets/118489430/d37fb786-8570-443d-8a87-1c6f0bbee212)


Mapbox is used to seamlessly display all the currently added places for users to explore visually.
![Jun-03-2023 16-48-37](https://github.com/rerebeccajiang/JapanTravel/assets/118489430/c9ebcf1a-b05a-45d1-a8f5-e9c5595f4017)


### Add/Edit your review
![Jun-03-2023 16-51-26](https://github.com/rerebeccajiang/JapanTravel/assets/118489430/ea882a06-bca2-4862-a5d0-a9e472c22063)


### Add/Edit your place
![Jun-03-2023 17-11-34](https://github.com/rerebeccajiang/JapanTravel/assets/118489430/bbf16ce9-3de1-4972-adc9-75f475ad62e1)


## Getting Started
This guide will help you get started with the app and start exploring its features.

### Prerequisites
Before you begin, you'll need to make sure you have the following installed:

- Nodejs
- MongoDB

You also need to signup for a new free mapbox and cloudinary account at the following link:

- Mapbox: https://www.mapbox.com/
- Cloudinary: https://cloudinary.com/

Then, create a .env file at the same directory level as where app.js is, to store the environment variables from mapbox and cloudinary.
In order to do this, simply fill in the following template and paste into .env created by you.

- CLOUNDINARY_CLOUD_NAME=
- CLOUNDINARY_KEY=
- CLOUNDINARY_SECRET=
- MAPBOX_TOKEN=


### Installation
To try out this website:

- run `npm install` to install all dependencies
- run `node seeds/index.js` to seed the initial places
- run `node app.js` to start the application
