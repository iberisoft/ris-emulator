const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
const port = 5200;
const secretKey = 'mysecretkey';
const userName = 'admin';

app.get('/token', (_, response) => {
    const token = jwt.sign({ userName }, secretKey);
    response.json(token);
});

app.patch('/', (request, response) => {
    if (authorize(request) == userName) {
        console.log(`PACS has created study ${request.body.studyInstanceUid}`);
    }
    else {
        response.statusCode = 401;
    }
    response.end();
});

function authorize(request) {
    const token = request.headers.authorization.split(' ')[1];
    if (token) {
        return jwt.verify(token, secretKey).userName;
    }
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
