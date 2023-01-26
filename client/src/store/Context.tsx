import { createContext, useReducer, ReactNode } from 'react';
import IAuth, { IActionAuth } from '../types/IAuthUser';
import { authReducer, initialState } from './reducer';

const init = () => {
	const hashData = localStorage.getItem('employee');
	if (hashData == null) {
		return initialState;
	}
	return JSON.parse(hashData);
};

type IProps = { children: ReactNode };

type IContextDispatch = (action: IActionAuth) => void;

type IContext = { auth: IAuth };

export const ContextAuth = createContext<IContext>({
	auth: { user: 0, pwd: '', role: '', token: '', division: '' },
});

export const ContextDispatch = createContext<IContextDispatch>(() => {});

export const AuthContext = ({ children }: IProps) => {
	const [auth, dispatch] = useReducer(authReducer, initialState, init);

	return (
		<ContextDispatch.Provider value={dispatch}>
			<ContextAuth.Provider value={{ auth }}>{children}</ContextAuth.Provider>
		</ContextDispatch.Provider>
	);
};
