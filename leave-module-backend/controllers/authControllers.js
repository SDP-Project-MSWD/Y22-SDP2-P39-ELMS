const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const api = require("../config/api");
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(api.clientId, api.clientSecret)
OAuth2_client.setCredentials( { refresh_token: api.refreshToken } )

exports.userRegister = async (req, res) => {
   try {
       const { empID, email, password, firstName, lastName, dob, phone, designation } = req.body;
       const hashedPassword = await bcrypt.hash(password, 10);
       const user = new User({empID, email, password:hashedPassword, firstName, lastName, dob,phone, designation });
       await user.save();
       return res.status(201).json({ message: 'User registered successfully' });
       } catch (error) {
       return res.status(500).json({ error: 'Registration failed' , error});
   }
}

exports.userLogin = async (req, res) => {
    try {
        const { empID, password } = req.body;
        const user = await User.findOne({ empID });
 
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid empID or password' });
        }
        
        // Extract designation from user object
        const { designation } = user;
        const token = jwt.sign({ userId: user._id, empID: user.empID }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token, designation }); // Send token and designation in response
    } catch (error) {
        console.error(error);
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
        const accessToken = OAuth2_client.getAccessToken()
        const transporter = nodemailer.createTransport({
            service:  'gmail',
            auth: {
                type: 'OAuth2',
                user: api.user,
                clientId: api.clientId,
                clientSecret: api.clientSecret,
                refreshToken: api.refreshToken,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: `E.L.M.S <${api.user}>`,
            to:  email,
            subject: 'Reset your password',
            text: `http://localhost:3000/reset-password/${id}/${token}`
        };

        transporter.sendMail(mailOptions , function(error, result){
            if (error) {
                console.log('Error occurred');
                console.log(error.message); // Changed 'err' to 'error'
                return res.status(400).send({msg:`Error occured while sending the link`});
            }
            else{
                return res.status(200).send({msg:"A reset password link has been successfully"})
            }
            transporter.close()
        });
    }
    catch(error){
        return res.json(error)
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