import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
  try {
    console.log("Cookies received on request:", req.cookies);
    const token = req.cookies.token;

    if (!token) {
      console.log("No token found in cookies.");
      return res.status(WAR401).json({
        message: "Unauthorized: No token provided",
        success: false,
      });
    }

    console.log("Token found:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token data:", decoded);
    if (!decoded.userId) {
      console.log("No userId in decoded token.");
      return res.status(401).json({
        message: "Unauthorized: Invalid token payload",
        success: false,
      });
    }

    req.id = decoded.userId;
    console.log("Authenticated user ID:", req.id);
    next();
  } catch (error) {
    console.error("Error in authentication:", error.message);
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
      success: false,
    });
  }
};