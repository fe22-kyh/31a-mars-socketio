import { MongoClient } from 'mongodb';

let db = undefined;
const appDatabaseName = "todo-api-v1";
const username = "fe22-edu-db-mongo";
const password = "tBnrUNJHwqZ8XSRk";

export function fetchCollection(name) {
  return fetchDatabase().collection(name);
}

function fetchDatabase() {
  if (db != undefined) {
    return db;
  }

  const url = `mongodb+srv://${username}:${password}@fe22-cluster.roofn23.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);

  db = client.db(appDatabaseName); // Samling av collections (skapas dynamisk, har ej skapats explicit i atlas)

  return db;
}