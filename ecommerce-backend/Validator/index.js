
const userSignupValidator = (req,res,next)=>{

    req.check('name','Name is required').notEmpty()
    .isLength({
        min:3,
        max:30
    })
    .withMessage("Name must be of length between 3 to 10")

    req.check('email','Email is required').notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @')
    .isLength({
        min:3,
        max:32
    })
    .withMessage("Email Must be between 3 to 32 character")

    req.check('password','Password is required').notEmpty()

    req.check('password').isLength({
        min:6
    }).withMessage('Password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage("Password must contain at least one digit")
    
    const errors = req.validationErrors();

    if(errors){
        console.log(errors);
        const firstError = errors.map( err => err.msg )[0]  // out of all possible error i am talking first error only tp display on UI

        return res.status(400).json({error:firstError});
    }

    next();

}

module.exports = {

    userSignupValidator

}