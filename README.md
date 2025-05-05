
### Steps to Install

1. **Clone the repository:**

   ```bash
   git clone https://github.com/duaa-abushaala/secureNotes.git
   cd secureNotes

2. **Install backend dependencies and start the server:**
   cd backend
   npm install
   npm start

3. **Open a new terminal, then install frontend dependencies and start it:**
   cd frontend
   npm install
   npm start

4. **To run backend tests:**
   cd backend
   npm test

## Trade-offs and Future Improvements

- **First-time with Express & TypeScript**: This is my first project using Express and TypeScript, so there may be room for improvement or better practices as I gain more experience with these tools.
- **Token Expiry**: The JWT token expires in 15 minutes but this could be made configurable for different cases.
- **In-memory Storage**: The app uses in-memory storage for notes. In future, using a DB such as MongoDB, firestore or mySQL can allow for scalability and flexibility.
- **Error Handling**: Better error handling can be added especially for invalid inputs or failed authentication.

