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
    return res.status(200).send(result);
  } catch(error) {
    console.log('admin postMovie error', error);
    return res.status(500).send(error);
  }
}

exports.updateMovie = async (req, res) => {
  try{
    const result = await Movie.update(
      req.body,
      {
      where: { id: req.params.id }
      }
    )
    return res.status(200).send(result);
  } catch(error) {
    console.log('admin updateMovie error', error);
    return res.status(500).send(error);
  }
}

exports.deleteMovie = async (req, res) => {
  try{
    await Movie.destroy({ where: { id: req.params.id }});
    return res.sendStatus(200) //no need to send result
  } catch(error) {
    console.log('admin deleteMovie error', error);
    return res.status(500).send(error);
  }
}