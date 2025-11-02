
 
const nodemailer=require('nodemailer')

  // const EmailSend=async(Emailto,EmailText,EmailSubject)=>{
   
  //   let transport=nodemailer.createTransport({
  //       host:'mail.teamrabbil.com',
  //       port:25,
  //       secure:false,
  //       auth: {user: "info@teamrabbil.com", pass: '~sR4[bhaC[Qs'},
  //       tls:{rejectUnauthorized:false}
  //   })

  //   let mailOption={
  //       from:'Dipto Ecommerce Solution',
  //       to:Emailto,
  //       subject:EmailSubject,
  //       text:EmailText
  //   }

  //   return await transport.sendMail(mailOption)
  // }

//const nodemailer = require("nodemailer");

const EmailSend = async (Emailto, EmailText, EmailSubject) => {
  try {
    // 1. Create transporter
    let transport = nodemailer.createTransport({
      host: 'mail.teamrabbil.com',
      port: 587,            
      secure: false,        
      auth: {
        user: "info@teamrabbil.com", 
        pass: '~sR4[bhaC[Qs'         
      },
      tls: {
        rejectUnauthorized: false 
      }
    });

   
    await transport.verify();
    console.log("SMTP server is ready to send messages");

  
    let mailOptions = {
      from: '"Team Rabbil" <info@teamrabbil.com>',
      to: Emailto,
      subject: EmailSubject,
      text: EmailText,
     
    };


    let info = await transport.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {EmailSend};


  //module.exports={EmailSend}