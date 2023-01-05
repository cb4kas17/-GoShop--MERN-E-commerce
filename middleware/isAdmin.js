const isAdmin = (req, res, next) => {
    console.log(req.role);
    if (req.role !== 1) {
        return res.status(403).json({ message: 'Admin only, access denied' });
    }
    next();
};

module.exports = isAdmin;
