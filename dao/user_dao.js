const {User} = require("./model.js");
const UserDao = {
    save(userinfo){
        const user = new User(userinfo);
        return user.save();//返回的是promise对象，返回到表示层//mongoose里的api，是对象的原型链里的api所以要new一个对象出来再调用。
    },
    //查找
    find(userinfo){
        return User.find(userinfo);
        console.log(1);
    },
    update(){},
    delete(){}
};
module.exports = UserDao;
 