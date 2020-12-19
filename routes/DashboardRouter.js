const DashboardRouter = require('express').Router();


DashboardRouter.route('/')
.get((req, res)=>{
    res.send("Dashboard");
})

module.exports = DashboardRouter;
