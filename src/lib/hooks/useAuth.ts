import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { loginUser, signupUser, logoutUser } from '@/store/auth-slice';

export const useAuth = () => {
	const dispatch = useDispatch<AppDispatch>();
	const auth = useSelector((state: RootState) => state.auth);

	const login = (email: string, password: string) => {
		return dispatch(loginUser(email, password));
	};

	const signup = (email: string, password: string, username: string) => {
		return dispatch(signupUser(email, password, username));
	};

	const logout = () => {
		dispatch(logoutUser());
	};

	return {
		...auth,
		login,
		signup,
		logout,
	};
};
