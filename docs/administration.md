# Administration

1. Generate a secret for the `BETTER_AUTH_SECRET` environment variable:
   ```bash
   openssl rand -base64 32
   ```
1. Run the migrations:
   - When the service is running:
     ```bash
     docker compose exec core bun run scripts/migrate.ts
     ```
   - When the service is not running:
     ```bash
     docker compose run --rm --remove-orphans core bun run scripts/migrate.ts
     ```
