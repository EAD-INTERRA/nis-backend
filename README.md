# Monorepo Template


## Setup
- Rename `.env.example` to `.env` and replace the plaeholder `DATABASE_URL` with your db connection string.
- Generate migration files and run them against the DB
  ```bash
    pnpx prisma migrate dev --name <migration_name>
  ```