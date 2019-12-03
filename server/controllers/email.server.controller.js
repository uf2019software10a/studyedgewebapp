nodemailer = require('nodemailer'),
bodyParser = require('body-parser');

exports.sendEmail = function(req, res) {

    console.log('body ');
    console.log(req.body);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ufsoftware10a@gmail.com',
        pass: 'fallsoftware2019'
      }
    });

    var mailOptions = {
      from: 'ufsoftware10a@gmail.com',
      to: req.body.email,
      subject: 'Your Study Edge Reservation has been Confirmed!',
      text: 'Hello 'req.body.name + '! Your Study Edge Exam Review has been Confirmed. Have  great day!'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
      }
      else{
        console.log('Emailsent');
      }
    });

};
