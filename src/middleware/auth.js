import jwt from "jsonwebtoken";

export const verifyToken  = (req, res, next) => {
    const  authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(401).json({ message: "Access Denied" });
    jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
        if (err) return res.status(403).json({ message: "Invalid Token" });
        req.user = user; // gắn user từ token vào req
        next();
    });
}

export const isAdmin = (req,res,next) => {
    if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Require Admin Role" });
  }
  next();
}
