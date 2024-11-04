import path from 'path';
import { fileURLToPath } from 'url';
import queryString from 'querystring';
import url from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewDirname = path.join(__dirname, '../views');

export const signup = async (req, res) => {
    res.json({ status: 'success', received_data: req.body });
    //console.log(req.file);
};
