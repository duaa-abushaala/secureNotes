import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

const user = { username: 'intern', password: 'letmein' };
const SECRET = 'supersecretkey';

// Login route
app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username === user.username && password === user.password) {
        const token = jwt.sign({ username }, SECRET, { expiresIn: '15min' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Middleware
const authenticateToken = (req: any, res: any, next: any): void => {
    const authenHeader = req.headers['authorization'];
    const token = authenHeader && authenHeader.split(' ')[1];

    if (token == null) {
        res.sendStatus(401); // Unauthorised access
        return;
    }

    jwt.verify(token, SECRET, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

interface Note {
    id: number;
    text: string;
    timeStamp: Date;
}

let notes: Note[] = [];

// Routes for notes (GET, POST)
app.get('/notes', authenticateToken, (req: any, res: any) => {
    res.json(notes);
});

app.post('/notes', authenticateToken, (req: any, res: any) => {
    const { text } = req.body;
    const newNote = {
        id: notes.length + 1,
        text,
        timeStamp: new Date(),
    };
    notes.push(newNote);
    res.status(201).json(newNote);
});

app.get('/', (req: Request, res: Response) => {
    res.send('API Running');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

export default app;

