import { fetchUtils } from 'react-admin';

const apiUrl = 'http://localhost:5095/api/admin';

export const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const url = `${apiUrl}/${resource}?page=${page}&pageSize=${perPage}`;
    
    const { json } = await fetchUtils.fetchJson(url);
    return {
      data: json.data || [],
      total: json.total || 0,
    };
  },

  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const { json } = await fetchUtils.fetchJson(url);
    return { data: json };
  },

  getMany: async (resource, params) => {
    const data = [];
    for (const id of params.ids) {
      try {
        const { json } = await fetchUtils.fetchJson(`${apiUrl}/${resource}/${id}`);
        data.push(json);
      } catch (e) {
        // Skip failed requests
      }
    }
    return { data };
  },

  getManyReference: async (resource, params) => {
    return dataProvider.getList(resource, params);
  },

  create: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    const { json } = await fetchUtils.fetchJson(url, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return { data: { ...params.data, id: json.id || Date.now() } };
  },

  update: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    await fetchUtils.fetchJson(url, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return { data: { ...params.data } };
  },

  updateMany: async (resource, params) => {
    for (const id of params.ids) {
      await fetchUtils.fetchJson(`${apiUrl}/${resource}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      });
    }
    return { data: params.ids };
  },

  delete: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    await fetchUtils.fetchJson(url, { method: 'DELETE' });
    return { data: { id: params.id } };
  },

  deleteMany: async (resource, params) => {
    for (const id of params.ids) {
      await fetchUtils.fetchJson(`${apiUrl}/${resource}/${id}`, {
        method: 'DELETE',
      });
    }
    return { data: params.ids };
  },
};