const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const scrypt = util.promisify(crypto.scrypt);
const Repository = require('./reopsitory')
class UserRepository extends Repository  {
    async create(object){
        object.id= this.generateRandomId();
        const  users= await this.getAll();
        const salt = crypto.randomBytes(8).toString('hex');
        const hash = await scrypt(object.password,salt,64);

        users.push({
            ...object,
            password: `${hash.toString(`hex`)}.${salt}`
        });
        await this.writeAll(users);
        return object;
    }
    async comparePassword(savePassword, userPassword){
        const [saveUserPassword,salt] = savePassword.split('.');
        const hasPassword = await scrypt(userPassword,salt,64);
        return  hasPassword.toString('hex') === saveUserPassword;
    }
}

module.exports = new UserRepository('user.json');

