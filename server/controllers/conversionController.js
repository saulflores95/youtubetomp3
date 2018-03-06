const fs = require('fs');
const ytdl = require('ytdl-core');

const conversionController = {}

conversionController.post =  (req, res) => {
  console.log('Conversion starting in server...')
  const url = req.body.url
  const url2 = 'https://www.youtube.com/watch?v=kJZTcrB4boA&list=RDkJZTcrB4boA'
  ytdl.getInfo(url, (err, info) => {
    if (err) throw err;
    ytdl(url, { filter: 'audioonly'}).pipe(fs.createWriteStream(`${info.title}.mp3`))
  })
  res.send("Post Request Succesfull")
}

module.exports = conversionController
