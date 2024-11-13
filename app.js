import express from 'express';
import { fileURLToPath } from 'url';
import { expressCspHeader, NONCE } from 'express-csp-header';
import router from './src/routes/index.js';
import bodyParser from 'body-parser';
import session from 'express-session';

const app = express();
const port = 3000;
const dirName = fileURLToPath(new URL('.', import.meta.url));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'eddieSecret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        },
    }),
);
app.use('/', router);

app.use(express.static(`${dirName}`));

app.get('/', (req, res) => {
    res.redirect(301, '/auth/login');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
