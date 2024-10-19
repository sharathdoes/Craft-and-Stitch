// middleware/checkProducer.js
const checkProducer = (req, res, next) => {
    const user = req.user; // Assuming user is added to req by previous middleware
  
    if (user && user.role === 'producer') {
      return next(); // User is a producer, proceed to the next middleware
    }
  
    return res.status(403).json({ message: 'Access denied: Not a producer.' });
  };
  
  module.exports = checkProducer;
  