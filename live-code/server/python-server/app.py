#py -m pip install flask
#py -m pip install flask_socketio

from flask_jwt_extended import JWTManager, get_jwt, jwt_required
from flask_socketio import SocketIO, emit
from flask import Flask, request

app = Flask(__name__) #referens till denna filens mapp
socketio = SocketIO(app) # samma sak som "new SocketIO" i javascript
socketio.init_app(app, cors_allowed_origins="*")
jwt = JWTManager(app)

app.config["JWT_SECRET_KEY"] = 'catsareawesomebutdogsareawesometoo';

# const clients = {}
clients = {}

#app.get("/home", (request, response) => response.send("Hey batman"))
@app.route("/home")
def handleHome(): # function handleHome() {}
    socketio.emit("new-connection", {"server-message": "User entered home addr"});
    return "Hey batman"


@app.route("/new-message", methods=["POST"])
def handleNewMessage():
    data = {"message": request.json["message"]}
    receiver = request.json["receiver"]

    if receiver in clients:
      receiverSid = clients[receiver]
      socketio.emit("new-message", data, to=receiverSid)

    return "New message sent", 200

# socketio.on("connect")
@socketio.on("connect") # connect är en socketio kanal
@jwt_required() # samma sak som jwtFiltret i express (presence, and verify)
def connected(): # function connected() {}
    print("New connection established")

    claims = get_jwt()
    username = claims["username"]

    if not(username in clients):
      clients[username] = []
    
    clients[username].append(request.sid)
    
    data = {"welcome-text": "You look amazing"}
    emit("new-connection", data)


@socketio.on("disconnect")
@jwt_required()
def disconnect():
   claims = get_jwt()
   username = claims["username"]
   
   clients[username].remove(request.sid)

@app.route("/invalidated-todo", methods=["POST"])
@jwt_required()
def invalidated_todo():
    claims = get_jwt()
    subjectClaim = claims["sub"] # sub <-- jwt subject

    if not(subjectClaim == "server-communication"):
       return "Wrong subject for intended action", 401

    username = request.json["username"]
    todo = request.json["todo"]

    if username in clients:
      receiverSid = clients[username] # hämta en lista över alla sessioner med ett viss användarnamn
      socketio.emit("todo-invalid", todo, to=receiverSid)

    return "invalidation sent", 200
  



socketio.run(app, port = 6060, debug = True)