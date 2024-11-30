import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const config = {
    BASE_URL: 'http://localhost:3000',
    FRONT_URL: 'http://localhost:4444',
    ROOT_DIRECTORY: __dirname.split('public')[0],
};
export default config;
