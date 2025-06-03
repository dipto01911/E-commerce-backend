
 
const nodemailer=require('nodemailer')

  const EmailSend=async(Emailto,EmailText,EmailSubject)=>{
   
    let transport=nodemailer.createTransport({
        host:'mail.teamrabbil.com',
        port:25,
        secure:false,
        auth: {user: "info@teamrabbil.com", pass: '~sR4[bhaC[Qs'},
        tls:{rejectUnauthorized:false}
    })

    let mailOption={
        from:'Dipto Ecommerce Solution',
        to:Emailto,
        subject:EmailSubject,
        text:EmailText
    }

    return await transport.sendMail(mailOption)
  }

  module.exports={EmailSend}