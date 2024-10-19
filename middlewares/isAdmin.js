// middleware/checkAdmin.js
const checkAdmin = (req, res, next) => {
    const user = req.user; // Assuming user is added to req by previous middleware
  
    if (user && user.role === 'admin') {
      return next(); // User is an admin, proceed to the next middleware
    }
  
    return res.status(403).json({ message: 'Access denied: Not an admin.' });
  };
  
  module.exports = checkAdmin;
  