import jwt from 'jsonwebtoken';

const token = jwt.sign({ id: 1, username: 'john_doe' }, 'hello');  // 'hello' = your secret
console.log(token);
const decoded = jwt.verify(token, 'hello');
console.log(decoded);  // { id: 1, username: 'john_doe', iat: <timestamp> }