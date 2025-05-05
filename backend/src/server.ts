import express, {Request, Response} from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

//
const app = express();
app.use(cors());
app.use(express.json());

// Middleware to log requests -> middleware is 
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('API Running');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
    });
    const user = {username: 'intern', password: 'letmein'};


const SECRET = 'supersecretkey';

//Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === user.username && password === user.password) {
        const token = jwt.sign({ username }, SECRET, { expiresIn: '15min' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
})

// Middleware to authenticate token
const authenticateToken: RequestHandler = (req, res, next): void => {
    const authenHeader = req.headers['authorization'];
    const token = authenHeader && authenHeader.split(' ')[1];
    if (token == null){
        res.sendStatus(401);
        return;
    }
    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        (req as any).user = user;
        next();
    });
};


//Interface for notes
interface Note {
    id: number;
    text: string;
    timeStamp: Date;
    }

let notes: Note[] = [];

// routes for notes (POST, GET)
app.get('/notes', authenticateToken, (req: express.Request, res: express.Response) => {
    res.json(notes);
});

app.post('/notes', authenticateToken, (req: Request, res: Response) => {
    const { text } = req.body;
    const newNote = {
        id: notes.length + 1,
        text,
        timeStamp: new Date(),
    };
    notes.push(newNote);
    res.status(201).json(newNote);
});


export default app;
