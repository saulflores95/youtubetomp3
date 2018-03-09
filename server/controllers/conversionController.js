const fs = require('fs');
const ytdl = require('ytdl-core');

const conversionController = {}

function cleaner(title) {
  let labels = {
    '(Official Video)',
    '[Official Video]',
    '[Official Music Video]',
    '(Music Video)',
    '[Audio]',
    '(Official Audio)',
    '(Lyrics)'
  }
  let WS = ' '
  for (const label of labels) {
    if(title.includes(label))
      title = title.replace(label, WS)
  }
  return title
}

conversionController.post =  (req, res) => {
  console.log('Conversion starting in server...')
  const url = req.body.url
  ytdl.getInfo(url, (err, info) => {
    if (err) throw err;
    let title = cleaner(info.title)
    let stream = fs.createWriteStream(`${title}.mp3`)
    ytdl(url, {
      filter: 'audioonly'
    }).pipe(stream)
  })
}

module.exports = conversionController
