
### Steps to Install

1. **Clone the repository:**

   ```bash
   git clone https://github.com/duaa-abushaala/secureNotes.git

2. **Install Dependencies:**
   cd secureNotes
   npm install

3. **Start Server:**
     npm start

### Running Tests
  npm test

## Trade-offs and Future Improvements

- **First-time with Express & TypeScript**: This is my first project using Express and TypeScript, so there may be room for improvement or better practices as I gain more experience with these tools.
- **Token Expiry**: The JWT token expires in 15 minutes but this could be made configurable for different cases.
- **In-memory Storage**: The app uses in-memory storage for notes. In future, using a DB such as MongoDB, firestore or mySQL can allow for scalability and flexibility.
- **Error Handling**: Better error handling can be added especially for invalid inputs or failed authentication.

