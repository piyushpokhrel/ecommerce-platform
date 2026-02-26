import api from "./api";

export const login = (data: any) => {
return api.post("/auth/login", data);
};
