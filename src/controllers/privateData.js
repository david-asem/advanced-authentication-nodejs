function getPrivateData (req, res, next){
  return res.status(200).json({
    success: true,
    message: 'You got access to the private data in this route',
    
  });
}

module.exports = getPrivateData;