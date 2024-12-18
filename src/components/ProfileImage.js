import styled from 'styled-components';
import { useEffect, useState } from 'react';
import defaultProfileImg from '../assets/images/profile_img.webp';

const AddProfileImgBoxStyle = styled.div`
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 70%;
    margin-left: auto;
    padding: 0;
    position: relative;
    cursor: pointer;
`;

const SelectProfileImgStyle = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const InputImgStyle = styled.input`
    display: none;
`;

const LabelStyle = styled.label`
    margin: auto;
`;

const ProfileImgFilter = styled.div`
    position: absolute;
    z-index: 1;
    background: #4646468c;
    width: 100%;
    height: 100%;
`;

const ProfileImgChangeBtn = styled.p`
    position: absolute;
    z-index: 80;
    font-size: 1rem;
    color: white;
    border: solid white 1px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
    border-radius: 10px;
    width: 40%;
    text-align: center;
`;

function SelectProfileImg({ name, filter, onFileChange, setSrc }) {
    const [selectedImage, setSelectedImage] = useState(defaultProfileImg);
    const [isFiltered, setIsFiltered] = useState(false);

    useEffect(() => {
        if (setSrc) setSelectedImage(setSrc);
    }, []);

    // 파일 선택 시 이미지 업데이트
    const handleImageChange = event => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);
            onFileChange(file);
        } else {
            setSelectedImage(defaultProfileImg);
            onFileChange(null);
        }
    };

    const handleMouseEnter = () => {
        if (filter) setIsFiltered(true);
    };

    const handleMouseLeave = () => {
        if (filter) setIsFiltered(false);
    };

    return (
        <>
            <LabelStyle htmlFor={'profileImg'}>
                <AddProfileImgBoxStyle
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {isFiltered && <ProfileImgFilter />}
                    {isFiltered && (
                        <ProfileImgChangeBtn>변경</ProfileImgChangeBtn>
                    )}
                    <SelectProfileImgStyle src={selectedImage} />
                    <InputImgStyle
                        type="file"
                        name={name}
                        accept={'image/*'}
                        id="profileImg"
                        onChange={handleImageChange}
                    />
                </AddProfileImgBoxStyle>
            </LabelStyle>
        </>
    );
}

export default SelectProfileImg;
