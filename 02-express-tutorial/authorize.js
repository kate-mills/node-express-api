const authorize = (req, res, next)=>{
  const {user} = req.query
  if(user){
    req.user = {name: 'admin', id:3}
    next()
  }
  else{
    res.status(401).send('No way man!')
  }
}

module.exports = authorize
