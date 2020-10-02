const { Movie } = require('../../../../models');

exports.postMovie = async (req, res) => {
  const { name, director, release_global, release_kr } = req.body;
  try{
    const result = await Movie.create({
      name,
      director,
      release_global,
      release_kr
    })
    return res.status(400).send(result);
  } catch(error) {
    console.log('admin postMovie error', error);
    return res.status(500).send(error);
  }
}