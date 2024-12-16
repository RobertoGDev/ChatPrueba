

function randomUser(usergenerated) {
    let charsC = 'bcdfghjklmnpqrstvwxyz';
    let charsV = 'aeiou';
    let charsD = '1234567890';
    usergenerated += charsC.charAt(Math.floor(Math.random() * charsC.length));
    usergenerated += charsV.charAt(Math.floor(Math.random() * charsV.length));
    usergenerated += charsC.charAt(Math.floor(Math.random() * charsC.length));
    usergenerated += charsV.charAt(Math.floor(Math.random() * charsV.length));
    usergenerated += charsD.charAt(Math.floor(Math.random() * charsD.length));
    usergenerated += charsD.charAt(Math.floor(Math.random() * charsD.length));
    usergenerated += charsD.charAt(Math.floor(Math.random() * charsD.length));
    return usergenerated;
}

function randomColor() {
    let combo = '';
    let chars = '1234567890';
    for (let i = 6; i--; ) {
        combo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    let color = '#' + combo;
    return color;
}

function getdateformat() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0!
    let hh = today.getHours();
    let mn = today.getMinutes();
    let ml = today.getSeconds();

    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (hh < 10) {
        hh = '0' + hh;
    }
    if (mn < 10) {
        mn = '0' + mn;
    }
    if (ml < 10) {
        ml = '0' + ml;
    }
    today = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + mn + ':' + ml;

    return today;
}

export { randomUser, randomColor, getdateformat };