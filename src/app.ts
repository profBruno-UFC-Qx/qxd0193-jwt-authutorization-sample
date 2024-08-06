import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express()
const PORT = 3000

app.use(express.json())

const secret = 'your_secret_key';

type User = {
  id: number 
  username: string,
  email: string,
  password: string,
}


const users: User[] = [
  {
    id: 1,
    username: 'test',
    email: 'teste@teste.com',
    password: bcrypt.hashSync('password', 8)
  }
];

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ error: 'Username or password is incorrect'});
  }

  const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
  res.json({ token });
});


app.post('/logout', (req: Request, res: Response) => {
  res.status(200).json({ data: 'Logged out successfully' });
});

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error:'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid Token' });
  }
};

app.get('/protected', authenticateToken, (req: Request, res: Response) => {
  res.status(200).json({ data: 'This is a protected route' });
});


app.listen(PORT, () => {
  console.log("Server listening requets")
})