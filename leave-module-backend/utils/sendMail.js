const nodemailer = require('nodemailer');

const sendMail = async(id, token, sent_from, sent_to, reply_to)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        PORT: "587",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        },
        tls:{
            rejectUnauthorized:false,
        }
    })

    const options = {
        from : {
            name:"E.L.M.S - Forgot Password Link",
            address:sent_from,
        },
        to : sent_to,
        replyTo: reply_to,
        subject: 'Reset your password',
        text: `https://elms-frontend.onrender.com/reset-password/${id}/${token}`
    }

    transporter.sendMail(options,function(err,info){
        if(err){
            console.log(err)
        }
        else{
            console.log(info)
        }
    })
}

module.exports = sendMail
