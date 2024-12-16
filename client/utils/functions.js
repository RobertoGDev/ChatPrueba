export const randomUser = (usergenerated) => {
    const charsC = 'bcdfghjklmnpqrstvwxyz';
    const charsV = 'aeiou';
    const charsD = '1234567890';
    return usergenerated + 
        charsC.charAt(Math.floor(Math.random() * charsC.length)) +
        charsV.charAt(Math.floor(Math.random() * charsV.length)) +
        charsC.charAt(Math.floor(Math.random() * charsC.length)) +
        charsV.charAt(Math.floor(Math.random() * charsV.length)) +
        charsD.charAt(Math.floor(Math.random() * charsD.length)) +
        charsD.charAt(Math.floor(Math.random() * charsD.length)) +
        charsD.charAt(Math.floor(Math.random() * charsD.length));
};

export const randomColor = () => {
    const letters = '0123456789ABCDEF';
    return '#' + Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('');
};

export const getdateformat = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};