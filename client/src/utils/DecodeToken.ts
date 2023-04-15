import jwt_decode from 'jwt-decode';

//decode the token
function decodeToken(token: string) {
	const decoded = jwt_decode(token);
	return decoded;
}

function getDivision(token: string) {
	const decoded: any = decodeToken(token);
	return decoded.division;
}
function getDesignation(token: string) {
	const decoded: any = decodeToken(token);
	return decoded.designation;
}
function isAdmin(token: string) {
	const decoded: any = decodeToken(token);
	return decoded.role;
}

const TokenService = {
	decodeToken,
	getDivision,
	isAdmin,
	getDesignation,
};

export default TokenService;
