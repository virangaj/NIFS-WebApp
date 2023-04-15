export function generateID(key: any) {
	const today = new Date();

	let d = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
	let month = today.getMonth() + 1;
	let mo = month < 10 ? '0' + month : month;
	let y =
		today.getFullYear() < 10 ? '0' + today.getFullYear() : today.getFullYear();

	let h = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
	let min =
		today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
	let s =
		today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();

	let time = `${h}${min}${s}`;
	let day = `${y.toString().substring(2, 4)}${mo}${d}`;

	return day + key.toUpperCase() + time;
}

export function dateConveter(data: string) {
	const parts = data.split('/');
	const year = parts[2];
	const month = parseInt(parts[1]);
	const day = parts[0];
	return `${year}-${month < 10 ? '0' + month : month}-${day}`;
}
