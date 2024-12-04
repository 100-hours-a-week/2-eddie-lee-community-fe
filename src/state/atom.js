import {atomWithStorage} from "jotai/utils";
import defaultProfileImg from '../assets/images/profile_img.webp'

// sessionStorage를 사용
export const profileImgAtom = atomWithStorage('profileImg', defaultProfileImg, {
    getItem: (key) => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : undefined;
    },
    setItem: (key, newValue) => {
        sessionStorage.setItem(key, JSON.stringify(newValue));
    },
});

export const userIdAtom = atomWithStorage('userId', 0, {
    getItem: (key) => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : undefined;
    },
    setItem: (key, newValue) => {
        sessionStorage.setItem(key, JSON.stringify(newValue));
    },
});