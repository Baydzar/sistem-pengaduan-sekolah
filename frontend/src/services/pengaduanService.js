import api from "./api";

export const getAllPengaduan = async () => {
  const res = await api.get("/pengaduan");
  return res.data;
};

export const getPengaduan = async (id) => {
  const res = await api.get(`/pengaduan/${id}`);
  return res.data;
};

export const createPengaduan = async (data) => {
  const res = await api.post("/pengaduan", data);
  return res.data;
};

export const updatePengaduan = async (id, data) => {
  const res = await api.put(`/pengaduan/${id}`, data);
  return res.data;
};

export const deletePengaduan = async (id) => {
  const res = await api.delete(`/pengaduan/${id}`);
  return res.data;
};

export const trackPengaduan = async (id) => {
    const res = await api.get(
      `/pengaduan/tracking/${id}`
    );
  
    return res.data;
};
