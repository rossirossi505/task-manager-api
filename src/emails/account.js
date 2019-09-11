const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail= (email, name )=>{sgMail.send({
  to: email ,
  from: 'sherors79@gmail.com',
  subject: 'welcome',
  text: `WElcome ${name} to our comunity! `
  
})
}

const sendCancelationEmail= (email, name )=>{sgMail.send({
    to: email ,
    from: 'sherors79@gmail.com',
    subject: 'Cancelation',
    text: `Mr. ${name} hope to see u again in our comunity! `
    
  })
  }

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}