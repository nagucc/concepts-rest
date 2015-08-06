/*
微信企业号标签管理
*/

var express = require('express'),
    router = express.Router();
var config = require('../../config/config');
var M = require('concepts').Middleware;

module.exports = function (app, cfg) {
    app.use('/concept', router);
};

/*
获取指定id的Concept
*/
router.get('/:id', function(req, res, next){
    req.concept = {
        _id: req.param.id
    };
    next();
}, M.get, function(req, res, next){
    if(res.err){
        res.send({ret: -1, msg: res.err});
    } else {
        res.send({ret: 0, data: res.concept});
    }
});


/*
创建Concept
*/
router.put('/', M.create, 
    function(req, res, next){
        req.concept.name = req.body.name;
        req.concept.desc = req.body.desc;
        req.concept.data = {creator: req.body.creator};
        next();
    }, M.addName, M.addDesc,
    function(req, res, next) {
        if(res.err){
            res.send({ret: -1, msg: res.err});
        } else {
            res.send({ret: 0, data: res.concept});
        }
    })