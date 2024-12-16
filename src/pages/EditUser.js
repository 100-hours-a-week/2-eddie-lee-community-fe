import styled from 'styled-components';
import SelectProfileImg from '../components/ProfileImage';
import { HelperText, InputField, InputLabel } from '../components/InputFields';
import TextLink from '../components/TextLink';
import { SetMainButton } from '../components/Button';
import { useEffect, useState } from 'react';
import { profileImgAtom } from '../state/atom';
import { useAtomValue } from 'jotai';
import config from '../config';
import { isDuplicate, isValidNickname } from '../utils/validation';
import Toast from '../components/Toast';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

const EditUserArticle = styled.article`
    display: flex;
    flex-direction: column;
    width: 30%;
    justify-content: center;
    margin: 0 auto 0;
`;

const Title = styled.h1`
    font-size: 2rem;
    color: black;
    text-align: center;
    margin-top: 20%;
`;

function EditUser() {
    const [selectedFile, setSelectedFile] = useState(
        useAtomValue(profileImgAtom),
    );
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [validNickname, setValidNickname] = useState(false);
    const [nicknameHelperText, setNicknameHelperText] =
        useState('*닉네임을 입력해주세요.');
    const [viewToast, setViewToast] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setValidNickname(false);
        if (nickname.length === 0) {
            setNicknameHelperText('*닉네임을 입력해주세요.');
        } else if (!isValidNickname(nickname) && nickname.length < 10) {
            setNicknameHelperText('*띄어쓰기를 없애주세요.');
        } else if (!isValidNickname(nickname) && nickname.length > 10) {
            setNicknameHelperText('*닉네임은 최대 10자까지 작성가능합니다.');
        } else {
            setNicknameHelperText('');
        }
    }, [nickname]);

    const handleNicknameBlur = async () => {
        if (
            nicknameHelperText === '' &&
            (await isDuplicate(nickname, 'nickname'))
        ) {
            setNicknameHelperText('*중복된 닉네임입니다.');
        } else {
            setValidNickname(true);
        }
    };

    const handleChange = fileName => {
        setSelectedFile(fileName);
    };

    useEffect(() => {
        const getUserData = async () => {
            const userData = await fetch(`${config.API_URL}/users/session`, {
                method: 'GET',
                credentials: 'include',
            }).then(async res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch user');
                }
                return await res.json();
            });

            setEmail(userData.email);
            setNickname(userData.nickname);
        };
        getUserData();
    }, []);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('nickname', nickname);
        formData.append('profileImg', selectedFile);
        await fetch(`${config.API_URL}/users`, {
            method: 'PATCH',
            body: formData,
            credentials: 'include',
        }).then(res => {
            if (!res.ok) {
                throw new Error('Failed to change user data');
            }
        });

        setViewToast(true);
        setTimeout(() => {
            setViewToast(false);
        }, 3000);
    };

    const handleDeleteUser = () => {
        setViewModal(true);
    };

    const handleModalCancel = () => {
        setViewModal(false);
    };

    const handleModalOk = async () => {
        await fetch(`${config.API_URL}/users`, {
            method: 'DELETE',
            credentials: 'include',
        }).then(res => {
            if (!res.ok) {
                throw new Error('Failed to delete user');
            }
            return res.json();
        });
        setViewModal(false);
        navigate(`/auth/login`);
    };

    return (
        <EditUserArticle>
            <Title>회원정보 수정</Title>
            <InputLabel label={'프로필 사진*'} />
            <SelectProfileImg
                filter={true}
                setSrc={selectedFile}
                onFileChange={handleChange}
            />
            <InputLabel label={'이메일'} />
            <TextLink label={email} align={'left'} />
            <InputLabel label={'닉네임'} />
            <InputField
                placeholder={nickname}
                type={'text'}
                inputListener={e => setNickname(e.target.value)}
                onBlur={handleNicknameBlur}
            />
            <HelperText label={nicknameHelperText} />
            <SetMainButton
                label={'수정하기'}
                onClick={handleSubmit}
                valid={validNickname}
            />
            <TextLink label={'회원 탈퇴'} onClick={handleDeleteUser} />
            {viewToast && <Toast />}
            {viewModal && (
                <Modal
                    title={'회원탈퇴 하시겠습니까?'}
                    content={'작성된 게시글과 댓글은 삭제됩니다.'}
                    okOnClick={handleModalOk}
                    cancelOnClick={handleModalCancel}
                />
            )}
        </EditUserArticle>
    );
}

export default EditUser;
