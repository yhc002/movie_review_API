const { Movie } = require('../../../../models');
const AWS = require('../../../../modules/aws');

exports.postMovie = async (req, res) => {
  const { name, director, release_global, release_kr } = req.body;
  try{
    let poster=''
    if(req.file){
      poster=req.file.originalname
    }
    console.log('try?',poster)
    await Movie.create({
      name,
      director,
      release_global,
      release_kr,
      poster
    })
    return res.status(200).send('success');
  } catch(error) {
    console.log('admin postMovie error', error);
    return res.status(500).send(error);
  }
}

exports.updateMovie = async (req, res) => {
  try{
    const {deletedFile} = req.body;
    if(deletedFile) {
      AWS.s3.deleteObject({Bucket: 'bucket_name', Key: `poster/${req.body.name}/${deletedFile}`}, function(err, data) {
        if (err) console.log('error deleting file',err, err.stack);  // error
        else     console.log('deleted file', data); 
      })
    }
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