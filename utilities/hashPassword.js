const bcrypt=require('bcryptjs');

const hashPassword = (password) => {
    let salt=bcrypt.genSaltSync(10);
    let hash=bcrypt.hashSync(password,salt);
    return hash;
}

const verifyPassword = (password,dbpass) => {
    return bcrypt.compareSync(password,dbpass);
}

module.exports={
    hashPassword,
    verifyPassword
}