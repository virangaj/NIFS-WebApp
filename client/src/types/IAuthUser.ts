export interface IActionAuth {
	type: string;
	payload: IAuth;
}

export default interface IAuth {
	user: number;
	pwd: string;
	role: string;
	token: string;
	division: '';
}
