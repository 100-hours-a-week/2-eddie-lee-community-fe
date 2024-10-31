import express from 'express';
import { fileURLToPath } from 'url';
import { expressCspHeader, NONCE } from 'express-csp-header';
import router from './routes/index.js';

const app = express();
const port = 3000;
const dirName = fileURLToPath(new URL('.', import.meta.url));
app.use('', router);

app.use(express.static(`${dirName}`));

app.get('/', (req, res) => {
    res.sendFile(`${dirName}/login.html`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
