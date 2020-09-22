module.exports.checkAuthed = (req, res, next) => {
  if (req.isAuthenticated()) {
		next();
  } else {
		res.status(403).send('로그인 필요');
  }
}

module.exports.checkAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if(req.user.role!==0){
      res.status(403).send('접근 권한이 없습니다.')
    }
		next();
  } else {
		res.status(403).send('로그인 필요');
  }
}