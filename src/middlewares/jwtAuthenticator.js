const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;

function jwtAuthenticator(sessionRequired) {
    return function (req, res, next) {
        console.log(!sessionRequired);
        console.log(!req.session.userRolType);
        if (!sessionRequired && !req.session.userRolType) {
            next();
            return;
        } else if (!sessionRequired && req.session.userRolType) {
            const token = req.session.token;
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
            try {
                jwt.verify(token, privateKey);
                next();
            } catch (error) {
                return res.status(403).send({ auth: false, message: 'Debe volver a iniciar sesión' });
            }
        } else {
            const token = req.session.token;
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
            try {
                jwt.verify(token, privateKey);
                next();
            } catch (error) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
        }
    }
}

module.exports = { jwtAuthenticator };