const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const sendMail = require('../utils/sendMail');
const nodemailer = require("nodemailer");
const axios = require('axios');
exports.userRegister = async (req, res) => {
    try {
        const { empID, email, password, firstName, lastName, dob, phone, designation } = req.body;
        
        // Check if empID or email already exist in the database
        const existingUser = await User.findOne({ $or: [{ empID }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Employee ID or Email already exists' });
        }

        // If not found, proceed with registration
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ empID, email, password: hashedPassword, firstName, lastName, dob, phone, designation });
        await user.save();
        
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Registration failed', error });
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { empID, password, recaptchaValue } = req.body;
        SECRET_KEY_CAPCHA = process.env.SECRET_KEY
        axios({url: `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY_CAPCHA}&response=${recaptchaValue}`,  method: 'POST',
    }).then(async ({ data }) => {
        
        const user = await User.findOne({ empID });
 
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid empID or password' });
        }
        
        // Extract designation from user object
        const { designation } = user;
        if(data.success){
        const token = jwt.sign({ userId: user._id, empID: user.empID }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token: token, designation: designation }); // Send token and designation in response
    }else{
        res.status(400).json({ message: 'Recaptcha verification failed!' });

    }
});
} catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
 };


 exports.forgotPassword = async (req, res) => {
    try{
        const { empID, email } = req.body;
        if(!empID || !email){
            return res.status(400).json({msg:"Please provide both employee ID and Email"});
        }
        const user = await User.findOne({empID : empID})

        if(!user){
            return res.status(400).json({msg:"No account with this Employee Id found"});
        }
        //console.log(user);
        if(user.email !== email) {
            return res.status(400).send({msg:'Email does not match'});
        }
        const token = jwt.sign({ userId: user._id, empID: user.empID }, process.env.JWT_SECRET, { expiresIn: '1h' });
        //console.log(token);
        const id = user._id;
        //const accessToken = OAuth2_client.getAccessToken()
        const sent_to = email;
        const reply_to = email;
        const sent_from = process.env.EMAIL_USER;

        await sendMail(id, token, sent_from, sent_to, reply_to);
        res.status(200).json({ success: true, message: "Email sent Successfully" });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

exports.resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.findByIdAndUpdate(id, { password: hashedPassword });
        
        res.status(200).send({ msg: 'The password has been changed successfully.' });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).send({ msg: 'Token expired. Please try again.' });
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).send({ msg: 'Invalid token. Please try again.' });
        } else {
            console.error(error);
            res.status(500).send({ msg: 'Internal server error.' });
        }
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
}

exports.updateUser = async (req, res) => {
    try {
        const empID = req.params.empID;
        const updatedData = req.body;

        // Check if the provided email is already present in the database
        const existingUser = await User.findOne({ email: updatedData.email, empID: { $ne: empID } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const filter = { empID }; // Filter based on the userID field
        const options = { new: true }; // Return the updated document
        const user = await User.findOneAndUpdate(filter, updatedData, options);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.toString() });
    }
};
  
  exports.deleteUser = async (req, res) => {
    try {
      const empID = req.params.empID;
      const filter = { empID }; // Filter based on the userID field
      const deletedUser = await User.findOneAndDelete(filter);
      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.toString() });
    }
  };
  

exports.getProfile = async (req, res) => {
    try {
        const empID = req.params.empID;
        const profileDetails = await User.findOne({ empID: empID });
        
        if(!profileDetails){
            res.status(401).json({message:"Employee is not registered"});
        }
        else{
            res.status(201).json(profileDetails);
        }
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error", error : error});
    }
}

exports.editProfile = async (req,res) => {
    try{
        const empID = req.params.empID;
        const editProfile = req.body;
        const filter = { empID: empID};
        const options = { new: true};
        const  updatedProfile = await User.findOneAndUpdate(filter, editProfile, options);
        if(!updatedProfile){
            res.status(404).json({message:"No employee with this id was found"});
        }
        else{
            res.status(201).json(updatedProfile);
        }
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error", error : error});
    }
}

exports.filterByDesignation = async (req, res) => {
    try {
        const { designation } = req.params;
        const filteredEmployees = await User.find({ designation });
        res.json(filteredEmployees);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};