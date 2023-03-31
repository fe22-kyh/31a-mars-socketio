# 31a Mars

## Live-kod

- [Live coding examples](live-coding/)
- [Live coding RSA example](https://github.com/fe22-kyh/31a-mars-socketio/tree/RSA-solution/live-code)

With RSA solution: Generate public.pem and private.pem with
```
ssh-keygen -t rsa -b 2048 -m pem -f keys              <-- creates two files keys and keys.pub
ssh-keygen -e -f keys.pub -m PEM >> public.pem        <-- reads public key from keys.pub into public.pem
cat keys >> private.pem                               <-- reads private key from keys into private.pem
```

## Material
- [Python SocketIO](https://python-socketio.readthedocs.io/en/latest/)
- [Exampel på express/socketio integration](https://dev.to/admirnisic/real-time-communication-with-socketio-and-nodejs-3ok2)
- [SocketIO Server API](https://socket.io/docs/v4/server-api/)

Ifall en tjänst går att lösa enbart med REST API:n bör detta göras då det spar på banbredden, vilket resulterar i mindre driftkostnad. Sockets är användbara men används främst till realtids kommunikation. En mer teknisk tumregel är att sockets ENDAST bör användas då data förväntas skickas med en hög frekvens (många mindre meddelanden i rad) som i en chatt, eller streaming av videos/ljud. 

## Övning
Medan denna övning är frivilig så kommer det förväntas en djupare förståelse av sockets för att nå ett högre betyg. 

Övningen är att översätta lektionens socket integration till javascript. För denna övning är material länkarna "Exampel på express/socketio integration" samt "SocketIO Server API" användbara. Observera att anledningen till att implementation är lik i bägge språken är pågrund av att socketio är en specifikation (protokoll) och inte en implementation, se https://github.com/socketio/socket.io-protocol för mer detaljer.


### Altenrativ övning
Bygg en tic-tac-toe med sockets och spela mot ditt syskon, föräldrar eller bekanta över en kopp kaffe.

En tic tac toe kan bestå utav en socket för varje spelare samt följande REST endpoints.
- [POST] /tictactoe/room/ <-- skapar ett nytt rum, returnerar ett roomId
- [PATCH] /tictactoe/room/:roomId <-- anslut till ett rum
- [PUT] /tictactoe/room/:roomId <-- markerar en ruta i spelet

för varje put request så bör en broadcast göras till samtliga deltagare i ett rum över spelarens socket.

Hint: en halvlösning finns i ett tidigare github repo 
- [Klient 14e december tictac](https://github.com/fe22-kyh/tic-14-december/tree/main/live-coding/tictac/src)
- [Server tictac](https://github.com/Rolandsson/tictactoe-server/blob/main/index.js)

## Inför nästa vecka
Nästa vecka börjar projektarbetet som är att bygga en chattapplikation (tekniska detaljer släpps på onsdagen). Tills dess är det bra att ha koll på
- Hur du skapar ett REST API med CRUD operationerna (GET, POST, DELETE ...)
- Vilka riktlinjer som gäller för ett REST API
- Hur du sätter upp en databas för att lagra och hämta data som är användbarspecifik

Mot slutet av projektarbete bör du även ha koll på
- Hur filter används för att neka eller godkänna traffik
- Hur du skapar och användar JWT tokens för att verifiera data:ns integeritet (med hjälp av token:ets signatur)
- Hur du använder JWT tokens för att ge olika behörigheter
- För och nackdelar med server och klient rendering 
- Hur och när det är mer lämpligt att använda sockets för datakommunikation
