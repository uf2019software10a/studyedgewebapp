//This file holds any configuration variables we may need
//'config.js' is usually ignored by git to protect sensitive information, such as your database's username and password

module.exports = {

    db: {
        uri: process.env.MONGODB_URI, //place the URI of your mongo database here.
    },
    email: {
      password: process.env.EMAIL_CRED,
    }

};
