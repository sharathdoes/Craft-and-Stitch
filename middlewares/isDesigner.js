// middleware/checkDesigner.js
const checkDesigner = (req, res, next) => {
  const user = req.user; // Assuming user is added to req by previous middleware

  if (user && user.role === 'designer') {
    return next(); // User is a designer, proceed to the next middleware
  }

  return res.status(403).json({ message: 'Access denied: Not a designer.' });
};

module.exports = checkDesigner;
