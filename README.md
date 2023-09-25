# Short-Url-Project
Short-Url Project using Node and Express Js


Database:
Need mongodb to use this application. Please install mongosh and create database named as urlShortner. 

Technology Stack: Javascript,NodeJS,ExpressJS
User can give any url and he will get the shorturl of it. Also total number of user visited to that shorturl.
![image](https://github.com/Selenium100/Short-Url-Project/assets/48276449/0d2ec802-d94a-4d21-b746-7f0513ad5578)

Day2:
Implemented Stateless Authentication:

Problem in Statefull Authentication:
1. Once server is restarted, user are logged out.
2. Stateful authentication is memory intensive. This is usingour server memory. Server is having limited memory. So make sure we should use minimum memory in server.

We can use JWT Web token to achieve stateless authentication.
npm i jsonwebtoken

Once user is logged in, one jwt token is generated and now its the identity of our user.
![image](https://github.com/Selenium100/Short-Url-Project/assets/48276449/6d713eee-3590-401b-8158-1d56404c8b1e)

