const fs = require('fs');
const ytdl = require('ytdl-core');

const conversionController = {}

conversionController.post =  (req, res) => {
  console.log('Conversion starting in server...')
  const url = 'https://www.youtube.com/watch?v=kJZTcrB4boA&list=RDkJZTcrB4boA'
  ytdl(url, { filter: 'audioonly'})
    .pipe(fs.createWriteStream('video.mp3'));

  res.send("Post Request Succesfull")
}

module.exports = conversionController
