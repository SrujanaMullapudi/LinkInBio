
const dateToday = () =>{
    let date = new Date();
    let str = date.getFullYear()+"-"+date.getMonth()+1+"-"+date.getDate();
    return str;
}

export const getDefaultExpiryDate = () =>{
    let date = new Date();
    date.setDate(date.getDate()+90);
    console.log(date.toISOString());
    return date.toISOString();
}