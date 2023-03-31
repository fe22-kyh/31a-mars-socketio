import jwt from 'jsonwebtoken'; // npm install jsonwebtoken https://github.com/auth0/node-jsonwebtoken#readme
import { readFileSync } from 'fs'; // fs <-- filestream

const SUPER_SECRET = 'catsareawesomebutdogsareawesometoo';

const privateKey = readFileSync('./config/private.pem');
const publicKey = readFileSync('./config/public.pem');

function generateServerToken() {
  let payloadOptions = {
    issuer: "express-server",
    subject: "server-communication",
    expiresIn: "3min", // 15 minutes
    algorithm: "RS256"
  }

  let token = jwt.sign({}, privateKey, payloadOptions);

  return token;
}

function generate(username) {
  // registered claims (pre defined payload variables)
  let payloadOptions = {
    issuer: "express-rest-jwt-demo",
    subject: "send and receive access token",
    expiresIn: "15m",
    algorithm: "RS256" // 15 minutes
  }

  // private claims (custom payload)
  let payload = {
    username: username,
    role: "USER"
  }

  let token = jwt.sign(payload, privateKey, payloadOptions);

  return token;
}

function verify(token) {
  try {
    return jwt.verify(token, publicKey); // verify signature and return payload
  } catch (err) {
    let verfError = new Error(); //custom verification error

    if (err.name == "JsonWebTokenError") {
      verfError.clientMessage = "Digital signing is invalid, request new token";
      verfError.serverMessage = "Token verification failed";
    }

    if (err.name == "TokenExpiredError") {
      verfError.clientMessage = "Digital signing is invalid, request new token";
      verfError.serverMessage = "Token expired";
    }

    throw verfError;
  }
}

export default { generate, verify, generateServerToken }