const HomeRouter = require('express').Router();


HomeRouter.route('/')
.get((req, res)=>{
    if(false /* checkAuth() */){
        res.redirect('dashboard');
    }
    else{
        res.send('Home');
    }
        
})
.post((req, res)=>{
    console('post not allowed at home');
})


module.exports = HomeRouter;