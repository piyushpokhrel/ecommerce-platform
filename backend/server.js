import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors({
origin: process.env.CORS_ORIGIN || "*",
}));

app.use(express.json());

app.get("/health", (req, res) => res.send("ok"));

app.get("/api/projects", async (req, res) => {
try {
    const username = process.env.GITHUB_USERNAME;

    if (!username) {
    return res.status(400).json({ error: "Missing GITHUB_USERNAME" });
    }

    const response = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
    );

    const projects = response.data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    url: repo.html_url,
    language: repo.language,
    }));

    res.json(projects);
} catch (err) {
    res.status(500).json({ error: "Failed to fetch repos" });
}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
