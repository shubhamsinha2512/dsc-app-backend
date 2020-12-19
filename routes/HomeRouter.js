const HomeRouter = require('express').Router();


HomeRouter.route('/')
.get((req, res)=>{
        res.send('Home');
})
.post((req, res)=>{
    console('post not allowed at home');
})


module.exports = HomeRouter;