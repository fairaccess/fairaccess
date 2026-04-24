# Development

1. Make sure you have [Docker](https://docs.docker.com/get-docker/) up and running
1. Get [Visual Studio Code](https://code.visualstudio.com/) with [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) ready
1. Install the dependencies with `bun install`
1. Open the project in the Dev Container and run `bun dev`
1. Set environment variables in `apps/core/.env` (see `.env.example` for reference)
   - `BETTER_AUTH_SECRET` can be generated with `openssl rand -hex 32`
   - To enable Google authentication set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
   - In Google Cloud Console add `http://localhost:5001/api/auth/callback/google` as an authorized redirect URI
1. Run tests with `bun test`
