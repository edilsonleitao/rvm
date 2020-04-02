import Database from "./schema";
import { READONLY, READWRITE } from "../constants";

/**
 * Implementação de todos os serviços para operações no banco local
 */

const FORMULARIOS = Database.formularios;

export const add = async data => {
  try {
    return await Database.transaction(READWRITE, FORMULARIOS, async () => {
      return await FORMULARIOS.add(data);
    });
  } catch (e) {
    console.error(e.stack);
  }
};

export const get = async id => {
  try {
    return await Database.transaction(READONLY, FORMULARIOS, async () => {
      return await FORMULARIOS.get(id);
    });
  } catch (e) {
    console.error(e.stack);
  }
};

export const getAll = async () => {
  try {
    return await Database.transaction(READONLY, FORMULARIOS, async () => {
      return await FORMULARIOS.toArray();
    });
  } catch (e) {
    console.error(e.stack);
  }
};

export const put = async data => {
  try {
    return await Database.transaction(READWRITE, FORMULARIOS, async () => {
      return await FORMULARIOS.put(data);
    });
  } catch (e) {
    console.error(e.stack);
  }
};

export const del = async id => {
  try {
    return await Database.transaction(READWRITE, FORMULARIOS, async () => {
      return await FORMULARIOS.delete(id);
    });
  } catch (e) {
    console.error(e.stack);
  }
};

export const delAll = async () => {
  try {
    return await Database.transaction(READWRITE, FORMULARIOS, async () => {
      return await FORMULARIOS.clear();
    });
  } catch (e) {
    console.error(e.stack);
  }
};
