const express = require('express');

const app = express();
app.use(express.json());
const port = 5200;

app.post('/', (request, response) => {
    console.log(`PACS has created study ${request.body.StudyInstanceUid}`);
    response.end();
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
