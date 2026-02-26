const authService = require('../services/auth.service');

exports.login = async (req, res) => {
  try {
    const result = await authService.login(
        req.body.identifier,
        req.body.password
    );    
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};


exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken)
        return res.status(401).json({ message: "Refresh token requis" });
    try {

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const newAccessToken = jwt.sign(
        { id: decoded.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
        );

        res.json({ accessToken: newAccessToken });

    } catch {
        res.status(403).json({ message: "Refresh token invalide" });
    }
};