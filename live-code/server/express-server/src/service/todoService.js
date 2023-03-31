import { fetchCollection } from "../mongo/todoMongoClient.js";

// Save - lägga in nytt och att uppdatera existerande
export function saveTodo(todo) { // Create and update
  const critera = { title: todo.title } // Finns title redan i databasen?
  const data = { $set: todo } // Datan ska skrivas in 

  return fetchCollection("todo").updateOne(critera, data, { upsert: true }); //update-insert (om ej finns, skapa ny)
}

export function fetchAllTodos() { // Read all
  return fetchCollection("todo").find().toArray();
}

export function fetchTodo(query) { // Read one specific todo
  return fetchCollection("todo").findOne(query);
}

export function deleteTodo(title) {
  return fetchCollection("todo").deleteOne({ title: title });
}