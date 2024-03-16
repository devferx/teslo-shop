## Run Development Server

1. Clone the repository
2. Create a copy of the `.env.example` file, rename it to `.env`, and fill in the necessary environment variables
3. Run `npm install` to install the dependencies
4. Run `docker-compose up` to start the database
5. Run `npx prisma migrate dev` to apply the migrations
6. Run `npm run dev` to start the server
