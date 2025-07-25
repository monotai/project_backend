// middlewares/auth.js
import jwt from 'jsonwebtoken';

const tokenSecret = 'hello';

class AuthMiddleware {
  static authenticate(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const decoded = jwt.verify(token, tokenSecret);
      req.user = decoded;
      next();
    } catch (error) {
      console.error('JWT auth error:', error);
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}

export default AuthMiddleware;
