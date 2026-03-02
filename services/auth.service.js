const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const RoleService = require('./role.service');

class AuthService {

    async login(identifier, password) {

        const user = await User.findOne({
            $or: [
            { email: { $regex: new RegExp(`^${identifier}$`, 'i') } },
            { username: { $regex: new RegExp(`^${identifier}$`, 'i') } }
            ]
        });

        if (!user) throw new Error("Identifiants invalides");

        if(user.state !== 5) throw new Error("Compte en attente de validation");
        
        const isMatch = await bcrypt.compare(password, user.password);
        //const isMatch = password === user.password; // A supprimer apres le hashage des mots de passe
        if (!isMatch) throw new Error("Identifiants invalides");

        const generateTokens = async (user) => {

            const role = await RoleService.findById(user.role_id);

            const accessToken = jwt.sign(
            { id: user._id, role: role?.name },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
            );

            const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: process.env.JWT_REFRESH_EXPIRES }
            );

            return { accessToken, refreshToken };
        };

        return await generateTokens(user);
    }
}

module.exports = new AuthService();