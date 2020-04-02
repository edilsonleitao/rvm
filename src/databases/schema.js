import Dexie from "dexie";

const database = new Dexie("RVM");
database.version(1).stores({
  token: "&token",
  formularios: "&id"
});

export default database;
