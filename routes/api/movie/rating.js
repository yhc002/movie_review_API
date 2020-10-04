const { Rating } = require('../../../models');


exports.rateMovie = async (req, res) => {
  const { rating, comment } = req.body;
  try{
      const exReview = await Rating.findOne({ where: { movie_id: req.params.id } });
      if(exReview){
        return res.status(200).json({ message: "you already have a review" });
      }
      const result = await Rating.create({
      user_id: req.user.id,
      movie_id: req.params.id,
      rating,
      comment
      })
      return res.status(200).send(result);
  } catch(error) {
      console.log('movie rateMovie error', error);
      return res.status(500).send(error);
  }
}

exports.updateRating = async (req, res) => {
  try{
      const result = await Rating.update(req.body, { where: { movie_id: req.params.id } });
      return res.status(200).send(result);
  } catch(error) {
      console.log('movie updateRating error', error);
      return res.status(500).send(error);
  }
}

exports.deleteRating = async (req, res) => {
  try{
    await Rating.destroy({ where: { movie_id: req.params.id }});
    return res.sendStatus(200) //no need to send result
  } catch(error) {
    console.log('movie deleteRating error', error);
    return res.status(500).send(error);
  }
}

exports.getMyRatings = async (req, res) => {
  try{
      const info = await Rating.findAndCountAll({ where: { user_id: req.user.id } })
      return res.status(200).send(info);
  } catch(error) {
      console.log('movie getMyRating error', error);
      return res.status(500).send(error);
  }
}

exports.getMovieRatings = async (req, res) => {
  try{
      const info = await Rating.findAndCountAll({ where: { movie_id: req.params.id } })
      return res.status(200).send(info);
  } catch(error) {
      console.log('movie getMovieRating error', error);
      return res.status(500).send(error);
  }
}

exports.getRatingDetail = async (req, res) => {
  try{
      const info = await Rating.findOne({ where: { id: req.params.id } })
      return res.status(200).send(info);
  } catch(error) {
      console.log('movie getRatingDetail error', error);
      return res.status(500).send(error);
  }
}
