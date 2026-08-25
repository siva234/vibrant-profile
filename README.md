# sivakolli.com

My personal portfolio site. Also where I try things out when I want to learn
something new, so parts of it change fairly often.

Live at [sivakolli.com](https://sivakolli.com).

## Stack

- React 18 with TypeScript
- Vite
- Tailwind CSS with shadcn/ui components
- Vercel for hosting, domain through Squarespace

The projects section pulls my public repositories from the GitHub API at runtime,
so it stays current without me editing anything.

There is also a small chat assistant that answers questions about my background.
It runs as a serverless function in `api/chat.ts` and talks to a hosted model
through an OpenAI-compatible endpoint. The knowledge it works from is a fixed
block of text in that file, and it is told not to answer anything outside it.

## Running it locally

```bash
npm install
npm run dev
```

The dev server starts on port 8080.

## Environment variables

The chat endpoint needs an API key. Set `GROQ_API_KEY` in a local `.env` file and
in the Vercel project settings. Without it the endpoint returns a 500 and the rest
of the site carries on working.

## Layout

```
src/components/     page sections plus the shadcn ui components
api/chat.ts         serverless endpoint for the chat assistant
public/             favicons and static files
```
