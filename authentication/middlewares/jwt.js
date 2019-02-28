const jwtvalidate = require('../lib/jwt-validate');
const salt = process.env.JTWSALT;

module.exports = async function(req, res, next) {
    try {
        const decoded = await jwtvalidate(req.query.token, salt);
        req.userId = decoded;

        next();
    } catch(err) {
        return res.status(401).send();
    }
}