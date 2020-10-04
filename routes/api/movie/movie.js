const { Movie } = require('../../../models');

exports.getList = async (req, res) => {
  try{
    const info = await Movie.findAndCountAll({ order: [['name']], offset: (Number(req.query.page)-1)*2, limit: 2 });
    return res.status(200).send(info);
  } catch(error) {
    console.log('movie getList error', error);
    return res.status(500).send(error);
  }
}

exports.getDetail = async (req, res) => {
  try{
    const info = await Movie.findOne({ where: {id: req.params.id} });
    return res.status(200).send(info);
  } catch(error) {
    console.log('movie getDetail error', error);
    return res.status(500).send(error);
  }
}

