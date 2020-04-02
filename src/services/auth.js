import axios from "axios";
import { count, del, add } from "../databases/auth";

/**
 * Implementação de todos os serviços para operações no banco remoto
 */

const _API = axios.create({
  baseURL: "https://desenvolvehrp.salutis.com.br/api/rvm/v1/"
});

export const login = async ({ usuario, senha, manterSessao }) => {
  try {
    const { data: token } = await _API({
      method: "post",
      url: "login",
      data: { username: usuario, password: senha }
    });

    if (manterSessao) await add(token);
    return token;
  } catch ({
    response: {
      data: { error },
      status
    }
  }) {
    return { error: { status, error } };
  }
};

export const logoff = async () => {
  await del();
};

const isAuth = async () => {
  const tokenCount = await count();
  return tokenCount === 1;
};

export default isAuth;
