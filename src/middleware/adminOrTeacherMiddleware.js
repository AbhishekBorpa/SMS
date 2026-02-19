const adminOrTeacher = (req, res, next) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'Teacher')) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin or teacher');
    }
};

module.exports = adminOrTeacher;
