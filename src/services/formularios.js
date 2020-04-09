import axios from "axios";
import { get, getAll, del, put } from "../databases/formularios";
import { STATUS_FORM } from "../constants";

/**
 * Implementação de todos os serviços para operações no banco remoto
 */

const _API = axios.create({
  baseURL: "https://desenvolve.salutis.com.br/api/rvm/v1",
});

const _syncData = async () => {
  let remoteForms = [];
  const localForms = await getAll();

  try {
    let { data } = await _API("questionarios");
    remoteForms = data || [];

    await _syncDeletedFormFromRemote(localForms, remoteForms);

    await Promise.all(
      remoteForms.map(async (form) => {
        try {
          let item = _returnFormByIDFromArr(form.id, localForms);

          if (!item || item.status === STATUS_FORM.FILL.PENDENTE.nome) {
            await put({ ...form, status: STATUS_FORM.FILL.PENDENTE.nome });
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
    localForms.map(async (form) => {
      let remoteForm = _returnFormByIDFromArr(form.id, remoteForms);
      if (!remoteForm) await del(form.id);
    })
  );
};

const _returnFormByIDFromArr = (id, arr) => {
  return arr.find((item) => item.id === id);
};

const fetchForms = async (remote) => {
  if (remote) await _syncData();
  return await getAll();
};

export const buscaFormulario = async (id) => {
  return await get(id);
};

export const buscaFormularioPorPrestador = async (prestador) => {
  const forms = await getAll();
  if (!forms) return [];

  return forms.filter(({ hospital }) =>
    hospital.toUpperCase().match(prestador.toUpperCase())
  );
};

export default fetchForms;
