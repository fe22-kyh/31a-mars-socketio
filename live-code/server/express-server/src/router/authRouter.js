import express from 'express';
import jwtUtil from '../util/jwtUtil.js';

const authRouter = express.Router();


authRouter.post("/auth/login", (request, response) => {
  const username = request.body.username;
  const password = request.body.password;

  if (username == undefined || password == undefined) {
    response.status(400); //bad request --> bad data format
    response.send("Missing authentication details");
  } else {

    // might wanna find the actual user in the database here
    // possibly pass the role value of a user from the database too
    // best practise would be to create a userService that handles such transactions
    // e.g. 
    //  const userDetails = userService.getUser(username, password);
    //  const token = jwtUtil.generate(username, userDetails.role)
    const token = jwtUtil.generate(username);

    response.status(200);
    response.send(token);
  }
});

export default authRouter;

