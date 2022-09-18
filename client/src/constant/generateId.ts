export function generateID (key:any) {
    let x = Math.floor(Math.random() * 10000);
        // let i = Math.floor(Math.random() * 25)
        // let j = Math.floor(Math.random() * 25)
        // let k = Math.floor(Math.random() * 25)
        // var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const today = new Date();
    var time = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds();
   

    return(x.toString().substring(0, 3) + key + time)
       
}