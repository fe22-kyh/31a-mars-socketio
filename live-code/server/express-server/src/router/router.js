import express from "express";
import { fetchAllTodos, saveTodo } from "../service/todoService.js";
import jwtUtil from "../util/jwtUtil.js";

const router = express.Router();

// Hämta alla todo
router.get("/todo/", async (request, response) => {
  const todos = await fetchAllTodos();

  response.send(todos);
});

// Hämta en todo
router.get("/todo/:id", (request, response) => {

});

// Skapa ny todo
router.put("/todo/", async (request, response) => {
  let todo = request.body;
  if (todo.title == undefined) {
    response.status(400); // 400 - bad client request (expected a todo title)
    response.send("Title was not found"); // ends request
  } else {
    const result = await saveTodo(todo);

    const responseData = {
      content: todo,
    }

    if (result.upsertedId != null) {
      responseData.id = result.upsertedId;
      responseData.event = "Created new todo"
      response.status(201); // 201 <-- "Created new resource"
    } else {
      responseData.event = "Updated todo"
      response.status(200); // 200 <-- "Updated successfully, request ok"
    }

    const data = {
      username: "Yves",
      todo: todo
    }

    const serverAccessToken = jwtUtil.generateServerToken();

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + serverAccessToken
      }
    }

    await fetch("http://127.0.0.1:6060/invalidated-todo", fetchOptions);


    response.send(responseData);
  }
});

// Uppdatera todo
router.put("/todo/:id", (request, response) => {

});

// Ta bort todo
router.delete("/todo/:id", (request, response) => {

});



export default router;