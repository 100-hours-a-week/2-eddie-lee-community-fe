import config from '../config';

export const getImgURL = imgPath => {
    return `${config.CDN_URL}${imgPath}`;
};
