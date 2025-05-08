import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password match environment variables
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Generate JWT token
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send success response with token
      res.json({ success: true, message: 'Login admin successful', token });
    } else {
      // Send error response for invalid credentials
      res.json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const userSignup = async (req, res) => {
  let { name, email, password } = req.body;
  let hashedPassword = await bcrypt.hash(password, 10);

  try {
    // checking is a user already exists
    const existUser = await User.findOne({ email })
    if (existUser) {
      return res.status(400).json({ status: false, message: "User already exists with this email" });
    }
    // checking if name was entered
    if (!name) {
      return res.status(400).json({ status: false, message: "Name is Required!" })
    }
    // checking the password is good
    if (!password || password.length < 6) {
      return res.status(400).json({ status: false, message: "Password should be at least 6 characters long" })
    }

    //if user doesnt exist create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save()

    if (newUser) {
      return res.status(201).json({ status: true, message: "Created a new user", user: newUser })
    }

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error })
  }

}

const userLogin = async (req, res) => {
  let { email, password } = req.body;
  try {
    // finding user with the email
    let user = await User.findOne({ email: email })

    if (user) {
      // if user exist compare the password submitted with the password in the databse 
      if (await bcrypt.compare(password, user.password)) {
        // if user enter credentials is true create a cookie for the user
        const token = jwt.sign({ email: user.email, id: user._id, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({ user: { id: user._id, email: user.email, role: user.role, name: user.name } });

      } else {
        return res.status(400).json({ status: false, message: "Incorrect Password" })
      }
    } else {
      return res.status(400).json({ status: false, message: "User doesn't exist" })
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server Error" })
  }
}

const getUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      return res.status(200).json({ user });
  } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
  }
}

const userLogout = async (req, res) => {
  res.clearCookie('token')
  return res.status(200).json({ message: 'Logged out' });
}


export { adminLogin, userSignup, userLogin ,getUser,userLogout};