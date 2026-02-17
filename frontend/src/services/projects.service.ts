import { api } from "./api";

export type GithubRepo = {
id: number;
name: string;
description: string | null;
stars: number;
forks: number;
url: string;
language: string | null;
};



export const getGithubProjects = async () => {
const res = await api.get<GithubRepo[]>("/projects");
return res.data;
};
