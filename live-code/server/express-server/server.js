import express from 'express';
import router from './src/router/router.js';
import cors from 'cors';
import authRouter from './src/router/authRouter.js';
import jwtFilter from './src/filter/jwtFilter.js';

const addr = "127.0.0.1";
const port = 9090;

const app = express();

/* Server middlewares (app.use) */
app.use(cors()); // <-- alla ips är tillåtna att ansluta
app.use(express.json()); // <-- in-data går från json till javascript-objekt

//Actutor (En endpoint för att se om allt fungerar)
app.get("/health", (request, response) => {
  response.send({ state: "up", message: "Server is healthy" });
});


// Behöver ej authoriz:as då vi hämtar en access token här
app.use(authRouter);

// innan du hämtar upp data från apiet --> authorize med jwt
app.use("/api", jwtFilter.authorize, router); // <-- alla url med api ...:3030/api/...

app.listen(port, addr, () => {
  console.log("Server listening on port: " + port);
});



