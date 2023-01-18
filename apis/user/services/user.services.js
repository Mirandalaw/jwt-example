const models = require('../models/index');
const jwt = require('../modules/jwt');

const getAllUser = async (limit) => {
    try {
        const users = await models.User.findAll({limit});
        return users;
    } catch (err) {
        throw Error('Error while Finding All User');
    }
}

const getUser = async(id) =>{
    try{
        const users = await models.User.findOne({where:{id}});
        return users;
    }catch(err){
        throw Error("Error while finding user!! ");
    }
}
const createUser = async (name,userId,userPwd) =>{
    try{
        const users = await models.User.create({name,userId,userPwd})
        return users;        
    }catch(err){
        throw Error('Error while Creating Users');
    }
}

// 문제점 update 는 동작하나 data를 받아오는 과정에서 undefined 
const updateUser = async (name,userId,userPwd,id) =>{
    try {
        const users =  await models.User
        .findOne({where : {id}})
            .then(users => {
                users.name = name;
                users.userId = userId;
                users.userPwd = userPwd;

                users.save();
                return users;
            })
    }catch(err){
        console.log(err);
        throw Error ("Error while Updating User");
    }
}

const destroyUser = async(id) =>{
    try{
        const user = await models.User.destroy({where : {id}});
        return user;
    }catch(err){
        console.log(err);
        throw Error("Error while destroying User");
    }
}

const loginUser = async(userId,userPwd)=>{
    try {
        const user = await models.User.findOne({where :{userId}});
        if(user.userId===userId){
            if(user.userPwd==userPwd){
                const token = await jwt.sign(user);
                const refreshToken = await jwt.createRefreshToken();
                user.refreshToken = refreshToken;
                user.save();

                return token;
            }
        }
    } catch (error) {
        console.log(err);
        throw Error("Error while login");
    }
}
module.exports = {getAllUser,getUser,createUser,updateUser,destroyUser,loginUser};