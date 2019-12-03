nodemailer = require('nodemailer'),
bodyParser = require('body-parser');

exports.sendEmail = function(req, res) {

    console.log('body ');
    console.log(req.body);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ufsoftware10a@gmail.com',
        pass: require('../config/config').email.password
      }
    });

    var mailOptions = {
      from: 'ufsoftware10a@gmail.com',
      to: req.body.email,
      subject: 'Your Study Edge Reservation has been Confirmed!',
      text: 'Hello '+req.body.name +
      '! Your Study Edge '+req.body.className+' Exam '+req.body.examNum+' Review with ' +req.body.tutor
      +' has been Confirmed for '+req.body.month+' '+req.body.day +' from '
      +req.body.start+' - '+req.body.end+'. Have  great day!'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
      }
      else{
        console.log('Email Sent');
      }
    });

};
