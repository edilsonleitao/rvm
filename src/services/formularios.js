import axios from "axios";
import { getAll, del, put } from "../databases/formularios";

/**
 * Implementação de todos os serviços para operações no banco remoto
 */

const _API = axios.create({
  baseURL: "https://desenvolve2.dyad.com.br/api/rvm/v1"
});

const _syncData = async () => {
  let remoteForms = [];
  const localForms = await getAll();

  try {
    let { data } = await _API("questionarios");
    remoteForms = data || [];

    await _syncDeletedFormFromRemote(localForms, remoteForms);

    await Promise.all(
      remoteForms.map(async form => {
        try {
          let item = _returnFormByIDFromArr(form.id, localForms);

          if (!item || item.status === "Pendente") {
            await put(form);
          }

          console.log(`Formulário atualizado com sucesso! ID: ${form.id}`);
        } catch (error) {
          console.error(
            `Ocorreu um erro ao atualizar o formulário! ID: ${form.id}`
          );
        }
      })
    );
  } catch (e) {
    console.error(e.stack);
  }
};

const _syncDeletedFormFromRemote = async (localForms, remoteForms) => {
  await Promise.all(
    localForms.map(async form => {
      let remoteForm = _returnFormByIDFromArr(form.id, remoteForms);
      if (!remoteForm) await del(form.id);
    })
  );
};

const _returnFormByIDFromArr = (id, arr) => {
  return arr.find(item => item.id === id);
};

const fetchForms = async remote => {
  if (remote) await _syncData();
  return await getAll();
};

export default fetchForms;
