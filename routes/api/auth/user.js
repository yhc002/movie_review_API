const { User } = require('../../../models');

exports.getInfo = async (req, res) => {
  console.log('user', req.user)
  try{
    const info = await User.findOne({ attributes: ['name', 'email', 'createdAt'], where: { email: req.user.email } });
    return res.status(400).send(info);
  } catch(error) {
    console.log('user getinfo error', error);
    return res.status(500).send(error);
  }
}