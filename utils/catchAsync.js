module.exports = func =>{
    return(req,res,next) =>{
        //that is just a simplification; you can, instead of e => next(e), 
        //write just next because the next() function will automatically be called with the parameter catch() receives.
        func(req,res,next).catch(next);
    }
}