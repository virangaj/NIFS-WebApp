import { ActionStatus } from '../constant/action';
import IAuth, { IActionAuth } from '../types/IAuthUser';

export const initialState: IAuth = {
	user: 0,
	pwd: '',
	role: '',
	token: '',
	division: '',
};

export const authReducer = (state = initialState, action: IActionAuth) => {
	switch (action.type) {
		case ActionStatus.AUTHENTICATED:
			return { ...action.payload };
		case ActionStatus.LOGOUT:
			return { ...action.payload };
		default:
			return state;
	}
};
