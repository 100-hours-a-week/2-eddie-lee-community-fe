import Header from './components/Header';
import styled from 'styled-components';
import Login from './pages/Login'
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Posts from "./pages/Posts";
import PostInfo from "./pages/PostInfo";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import EditUser from "./pages/EditUser";
import EditPasswd from "./pages/EditPasswd";
import {useEffect} from "react";
import {atomWithStorage} from "jotai/utils";

const PageFrame = styled.section`
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: transparent;
	padding: 30px 0;
	align-items: stretch;
`

function App() {
	useEffect(() => {
		atomWithStorage("apiAddress",'http://localhost:3000');
	}, []);
	return (
		<Router>
			<PageFrame>
				<ChangeHeader />
				<main>
					<Routes>
						<Route path='/' element={ <Navigate to='/auth/login' replace/> }/>
						<Route path='/auth/login' element={ <Login /> } />
						<Route path='/auth/signup' element={<Signup />}/>
						<Route path='/posts' element={ <Posts /> } />
						<Route path='/posts/:postId/info' element={ <PostInfo /> } />
						<Route path='/posts/edit' element={<AddPost/>}/>
						<Route path='/posts/:postId' element={<EditPost/>}/>
						<Route path='/users' element={<EditUser/>}/>
						<Route path='/users/passwd' element={<EditPasswd/>}/>
					</Routes>
				</main>
			</PageFrame>
		</Router>

	);
}

function ChangeHeader() {
	return <Header pathName={useLocation().pathname} />
}

export default App;
