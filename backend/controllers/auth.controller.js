import { mysqlPool } from "../config/db.mysql.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await mysqlPool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    const user = rows[0];

    console.log("User from DB:", user);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

//     const plainPassword = '123456';
// const hash = await bcrypt.hash(plainPassword, 10);
// console.log('Hashed password:', hash);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password match?", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log('JWT_SECRET during login:', process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
  console.log('Login failed:', err.response?.data || err.message);
  alert(err.response?.data?.message || 'Invalid credentials');
}
};
