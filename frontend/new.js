const validator = require('validator');
const isEmail = require("validator/lib/isEmail");
const deepEmailValidator = require("deep-email-validator");

const email = 'exampledfasd.com';


if (validator.isEmail(email)) {
  console.log('Valid email!');
} else {
  console.log('Invalid email!');
}