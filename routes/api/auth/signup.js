
const auth = require('../../../modules/auth');
const { User } = require('../../../models');
const { validationResult } = require('express-validator');

exports.addUser = async (req, res, next) => {
	const errors = validationResult(req);
	res.header("Access-Control-Allow-Origin", "*");

  if(!errors.isEmpty()) {//유효하지 않은 회원가입 정보
		return res.status(422).json({ errors: errors.array() });
	}
	data = req.body;
	const salt = auth.generateSalt();
	data.salt = salt;
  data.password = auth.hashPassword(data.password, salt);
  
  try{
    const exUser = await User.findOne({ where: { email: data.email } });
    if(exUser) {
      console.log('account already exists');
      return res.status(200).json({ message: "The email already exists" });
    }
    await User.create({ email: data.email, password: data.password, name: data.name, salt: data.salt, role: 1 });
    return res.status(200).json({ message: "Welcome. You have been signed" });
  } catch(error) {
    console.log('signup error', error);
    return res.status(500).send(error);
  }
}