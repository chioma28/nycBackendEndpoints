const { body, validationResult } = require('express-validator');

function validateBody(){
 // businessName must be a name greater than 5 characters
 body('businessName').isLength({min : 5}),
 // email must be a valid email
 body('email').isEmail,
 // password must be at least 5 chars long
 body('password').isStrongPassword({ minLength: 5, minLowercase: 1, minUppercase : 1, minNumbers: 1, returnScore: false,
     pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10 }),
 (req, res, next) => {
 // Finds the validation errors in this request and wraps them in an object with handy functions
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
 }
 next()
 }
}

[ 
  check('email', 'Email length should be 10 to 30 characters') 
                  .isEmail(), 
  check('Businessname', 'Name length should not be less than 5 characters') 
                  .isLength({ min: 10, max: 20 }), 
  check('password', 'Password length should not be less than 8 characters') 
  .isStrongPassword({ minLength: 5, minLowercase: 1, minUppercase : 1, minNumbers: 1, returnScore: false,
    pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10 })
], (req, res) => { 

  // validationResult function checks whether 
  // any occurs or not and return an object 
  const errors = validationResult(req); 

  // If some error occurs, then this 
  // block of code will run 
  if (!errors.isEmpty()) { 
      res.json(errors) 
  } 

  // If no error occurs, then this 
  // block of code will run 
  else { 
      res.send("Successfully validated") 
  } 
}