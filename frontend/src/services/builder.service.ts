import api from "./api";

export type GithubRepoDTO = {
    id: number;
    name: string;
    description: string | null;
    stars: number;
    forks: number;
    url: string;
    language: string | null;
};

// If your backend is still only GET /api/projects (env-based),
// we’ll call that for now.
// Later we’ll switch to /api/github/:username/repos.
export async function getGithubReposForUser(_username: string) {
    const res = await api.get<GithubRepoDTO[]>("/projects");
    return res.data;
}