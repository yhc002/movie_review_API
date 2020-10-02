const { Movie, Rating } = require('../../../models');

exports.getList = async (req, res) => {
  try{
    const info = await Movie.findAll({ order: [['name']], offset: (Number(req.query.page)-1)*2, limit: 2 });
    return res.status(400).send(info);
  } catch(error) {
    console.log('movie getList error', error);
    return res.status(500).send(error);
  }
}

exports.getDetail = async (req, res) => {
  try{
    const info = await Movie.findOne({ where: {id: req.params.id} });
    return res.status(400).send(info);
  } catch(error) {
    console.log('movie getList error', error);
    return res.status(500).send(error);
  }
}

exports.rateMovie = async (req, res) => {
  const { rating, comment } = req.body;
  try{
    const result = await Rating.create({
      user_id: req.user.id,
      movie_id: req.params.id,
      rating,
      comment
    })
    return res.status(400).send(result);
  } catch(error) {
    console.log('admin postMovie error', error);
    return res.status(500).send(error);
  }
}