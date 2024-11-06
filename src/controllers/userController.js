import path from 'path';
import { fileURLToPath } from 'url';
import queryString from 'querystring';
import url from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viewDirname = path.join(__dirname, '../views');

export const signup = async (req, res) => {
    const textData = req.body;
    const fileData = req.file; // 파일이 없으면 undefined가 됩니다.

    console.log('텍스트 데이터:', textData);
    console.log('파일 데이터:', fileData);

    res.json({
        status: 'success',
        received_data: textData,
        received_file: fileData ? fileData : 'No file uploaded',
    });
};
