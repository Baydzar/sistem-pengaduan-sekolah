import api from "./api";

export const getAllKategori = async () => {
  const res = await api.get("/kategori");
  return res.data;
};

export const getKategoriById = async (id) => {
  const res = await api.get(`/kategori/${id}`);
  return res.data;
};

export const createKategori = async (data) => {
  const res = await api.post("/kategori", data);
  return res.data;
};

export const updateKategori = async (id, data) => {
  const res = await api.put(`/kategori/${id}`, data);
  return res.data;
};

export const deleteKategori = async (id) => {
  const res = await api.delete(`/kategori/${id}`);
  return res.data;
};