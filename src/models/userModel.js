const pathToUsers = 'http://localhost:3000/public/dummyData/userDummyData.json';

export const getUsers = async (req, res) => {
    {
        try {
            const usersRes = await fetch(pathToUsers);
            const users = await usersRes.json();
            res.status(200).json(users);
        } catch (e) {
            res.status(404).json({
                result: '전체 유저 데이터 가져오기 실패',
                message: e.message,
            });
        }
    }
};
