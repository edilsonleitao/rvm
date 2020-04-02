import Database from "./schema";
import { READONLY, READWRITE } from "../constants";

/**
 * Implementação de todos os serviços para operações no banco local
 */

const TOKEN = Database.token;

export const add = async data => {
  try {
    return await Database.transaction(READWRITE, TOKEN, async () => {
      return await TOKEN.add(data);
    });
  } catch (e) {
    console.error(e.stack);
  }
};

export const count = async () => {
  try {
    return await Database.transaction(READONLY, TOKEN, async () => {
      return await TOKEN.count();
    });
  } catch (e) {
    console.error(e.stack);
  }
};

export const del = async () => {
  try {
    return await Database.transaction(READWRITE, TOKEN, async () => {
      return await TOKEN.clear();
    });
  } catch (e) {
    console.error(e.stack);
  }
};
