import type { RequestHandler } from '@sveltejs/kit';

const USERNAME = 'Mooshieblob1';

export const GET: RequestHandler = async () => {
    try {
        const response = await fetch(
            `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=5`
        );
        if (!response.ok) {
            return new Response('Failed to fetch GitHub data', { status: 500 });
        }
        const data = await response.json();
        const repos = data.map((repo: any) => ({
            name: repo.name,
            html_url: repo.html_url,
            description: repo.description
        }));
        return new Response(JSON.stringify(repos), {
            headers: { 'content-type': 'application/json' }
        });
    } catch (err) {
        return new Response('Error fetching GitHub data', { status: 500 });
    }
};
