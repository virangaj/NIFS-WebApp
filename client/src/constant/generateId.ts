<<<<<<< HEAD
export function generateID (key:any) {
    let x = Math.floor(Math.random() * 10000);
        // let i = Math.floor(Math.random() * 25)
        // let j = Math.floor(Math.random() * 25)
        // let k = Math.floor(Math.random() * 25)
        // var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const today = new Date();
    var time = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds();
   

    return(x.toString().substring(0, 3) + key.toUpperCase() + time)
       
}
=======
export function generateID(key: any) {
	let x = Math.floor(Math.random() * 10000);
	// let i = Math.floor(Math.random() * 25)
	// let j = Math.floor(Math.random() * 25)
	// let k = Math.floor(Math.random() * 25)
	// var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const today = new Date();
	
	let d = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
	let month = today.getMonth() + 1
	let mo =
		month < 10 ? '0' + month : month;
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
>>>>>>> fd3210359d6c143215aef639c14815d77d7d10c7
