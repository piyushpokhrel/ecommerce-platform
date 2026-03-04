export async function fetchRepos(username: string) {
const res = await fetch(
    `https://api.github.com/users/${username}/repos`
);

return res.json();
}