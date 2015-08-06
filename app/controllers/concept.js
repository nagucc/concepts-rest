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
通用中间件，将执行结果以json的方式返回客户端。
*/
var sendResult = function(req, res, next){
    if(res.err){
        res.send({ret: -1, msg: res.err});
    } else {
        res.send({ret: 0, data: res.concept});
    }
};

/*
获取指定id的Concept
*/
router.get('/:id', function(req, res, next){
    req.concept = {
        _id: req.param.id
    };
    next();
}, M.get, M.names, M.descs, sendResult);


/*
创建Concept
*/
router.put('/', M.create, 
    function(req, res, next){
        req.concept.name = req.body.name;
        req.concept.desc = req.body.desc;
        req.concept.data = {creator: req.body.creator};
        next();
    }, M.addName, M.addDesc, sendResult);
    
/*
为Concept添加name
*/
router.put('/:id/name', function(req, res, next){
    req.concept = {
        _id: req.param.id,
        name: req.body.name,
        data: {
            creator: req.body.creator,
            dateCreated: new Date()
        }
    };
    next();
}, M.addName, sendResult);

/*
为Concept删除一个name
*/
router.delete('/:id/name', function(req, res, next){
    req.concept = {
        _id: req.param.id,
        name: req.body.name,
        data: {
            creator: req.body.creator
        }
    }
    next();
}, M.removeName, sendResult);

/*
为Concept添加desc
*/
router.put('/:id/desc', function(req, res, next){
    req.concept = {
        _id: req.param.id,
        desc: req.body.desc,
        data: {
            creator: req.body.creator,
            dateCreated: new Date()
        }
    };
    next();
}, M.addDesc, sendResult);

/*
为Concept删除一个desc
*/
router.delete('/:id/desc', function(req, res, next){
    req.concept = {
        _id: req.param.id,
        desc: req.body.desc,
        data: {
            creator: req.body.creator
        }
    }
    next();
}, M.removeDesc, sendResult);

