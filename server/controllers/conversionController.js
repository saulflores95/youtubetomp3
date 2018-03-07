const fs = require('fs');
const ytdl = require('ytdl-core');

const conversionController = {}

function cleaner(title) {
  let oM = '(Official Video)'
  let oM2 = '[Official Video]'
  let oM3 = '[Official Music Video]'
  let mV = '(Music Video)'
  let a = '[Audio]'
  let oA = '(Official Audio)'
  let lyrics = '(Lyrics)'

  let WS = ' '
  if(title.includes(oM))
    title = title.replace(oM, WS)
  if(title.includes(oM2))
    title = title.replace(oM2, WS)
  if(title.includes(oM3))
    title = title.replace(oM3, WS)
  if(title.includes(mV))
    title = title.replace(mV, WS)
  if(title.includes(a))
    title = title.replace(a, WS)
   if(title.includes(oA))
    title = title.replace(oA, WS)
  if(title.includes(lyrics))
   title = title.replace(lyrics, WS)

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
