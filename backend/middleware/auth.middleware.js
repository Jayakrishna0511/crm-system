import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // 👈 Bearer <token>

  if (!token) return res.status(403).json({ message: 'Token missing' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT error:', err); // 👈 Add this
       console.log('JWT_SECRET during verify:', process.env.JWT_SECRET);
      return res.status(403).json({ message: 'Token invalid' });
    }
    req.user = user;
    next();
  });
};
