import Dexie from "dexie";
import { READONLY, READWRITE } from "../constants";

/**
 * Implementação de todos os serviços para operações no banco local
 */

const DB_VERSION = 1;

const database = new Dexie("RVM");
database.version(DB_VERSION).stores({
  formularios: "&id"
});

const FORMULARIOS = database.formularios;

export const add = async data => {
  try {
    return await database.transaction(READWRITE, FORMULARIOS, async () => {
      return await FORMULARIOS.add(data);
    });
  } catch (e) {
    console.error(e.stack);
  }
};

export const get = async id => {
  try {
    return await database.transaction(READONLY, FORMULARIOS, async () => {
      return await FORMULARIOS.get(id);
    });
  } catch (e) {
    console.error(e.stack);
  }
};

export const getAll = async () => {
  try {
    return await database.transaction(READONLY, FORMULARIOS, async () => {
      return await FORMULARIOS.toArray();
    });
  } catch (e) {
    console.error(e.stack);
  }
};

export const put = async data => {
  try {
    return await database.transaction(READWRITE, FORMULARIOS, async () => {
      return await FORMULARIOS.put(data);
    });
  } catch (e) {
    console.error(e.stack);
  }
};

export const del = async id => {
  try {
    return await database.transaction(READWRITE, FORMULARIOS, async () => {
      return await FORMULARIOS.delete(id);
    });
  } catch (e) {
    console.error(e.stack);
  }
};

export const delAll = async () => {
  try {
    return await database.transaction(READWRITE, FORMULARIOS, async () => {
      return await FORMULARIOS.clear();
    });
  } catch (e) {
    console.error(e.stack);
  }
};
