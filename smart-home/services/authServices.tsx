import api from "@/utils/api";

export const authService = {
  register: async (name: string, phone: string, password: string) => {
    const res = await api.post("/api/users/userRegister", { name, phone, password });
    return res.data; 
  },

  login: async (phone: string, password: string) => {
    const res = await api.post("/api/users/userLogin", { phone, password });
    return res.data; 
  },
};