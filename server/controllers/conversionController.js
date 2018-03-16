const fs = require('fs'); //use this package to create write stream
const ytdl = require('ytdl-core');//this is use for getting yt data and generating stream
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path; //adding fmmpeg as a node module to set as path later
const ffmpeg = require('fluent-ffmpeg'); //ffmpeg for converting stream to mp3
ffmpeg.setFfmpegPath(ffmpegPath); //setting ffmpegPath
const readline = require('readline'); //reading line to communicate with console for download
//Initialize the conversion controller
const conversionController = {}
//function that cleans (removes tags like official video) title returned from ytdl
function cleaner(title) {
  let labels = [
    '(Official Video)',
    '[Official Video]',
    '[Official Music Video]',
    '(Music Video)',
    '[Audio]',
    '(Official Audio)',
    '(Lyrics)'
  ]
  let WS = ''
  for (const label of labels) {
    if(title.includes(label))
      title = title.replace(label, WS)
  }
  return title
}
//Get request that converts on server and downloads directly on to browser
conversionController.get =  (req, res) => {
  console.log('Conversion starting in server...')
  const url = req.query.url //recieve youtube url from req params
  ytdl.getInfo(url, (err, info) => {
    if (err) throw err;
    let title = info.title = cleaner(info.title) // get cleaned song title
    let stream = ytdl(url, { //start video stream
      quality: 'highestaudio'
    })
    //set response headers
    res.set('Acces-Control-Origin', '*')
    res.set('Content-disposition', 'attachment; filename=' + title + '.mp3')
    res.set('Content-Type', 'application/audio/mpeg3')
    let start = Date.now() //define when conversion starts to detect how long conversion lasts
    ffmpeg(stream)  //set ffmpeg source to ytdl stream
     .outputOptions([
       '-vn',
       '-ar 44100',
       '-ac 2',
       '-ab 192k',
       '-f mp3'])
     .audioCodec('libmp3lame')  //use libmp3lame to convert to mp3
     .audioBitrate(128)
     .format('mp3')//specify format
     .on('error', (err) => console.error(err))
     .on('progress', (p) => {
       readline.cursorTo(process.stdout, 0) //preview downloaded kb on server console
       process.stdout.write(`${p.targetSize}kb downloaded`)
     })
     .on('end', () =>  console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`)) // Print how long conversion took
     .pipe(res, { //pipe converson data to response and end response
       end: true
    })
  })
}
//Get request that downlaods selected stream
conversionController.getVideo = (req, res) => {
  console.log('Conversion starting in server...')
  const url = req.query.url //recieve youtube url from req params
  ytdl.getInfo(url, (err, info) => {
    if (err) throw err;
    let title = info.title = cleaner(info.title) // get cleaned song title
    //set response headers
    res.set('Acces-Control-Origin', '*')
    res.set('Content-disposition', 'attachment; filename=' + title + '.mp4')
    res.set('Content-Type', 'video/mp4')
    let start = Date.now() //define when conversion starts to detect how long conversion lasts
    let stream = ytdl(url, { //start video stream
      quality: 'highestaudio'
    })
    .on('error', (err) => console.error(err))
    .on('progress', (p) => {
      readline.cursorTo(process.stdout, 0) //preview downloaded kb on server console
      process.stdout.write(`${p.targetSize}kb downloaded`)
    })
    .on('end', () =>  console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`)) // Print how long conversion took
    .pipe(res, { //pipe converson data to response and end response
      end: true
    })
  })
}
//Get request that converts and stores on server, and then sends it to browser
conversionController.local =  (req, res) => {
  console.log('Conversion starting in server...')
  const url = req.query.url //recieve youtube url from req params
  ytdl.getInfo(url, (err, info) => {
    if (err) throw err;
    let title = cleaner(info.title) // get cleaned song title
    let stream = fs.createWriteStream(`./static/${title}.mp3`) //download mp3 file to static files folder
    let start = Date.now() //define when conversion starts to detect how long conversion lasts
    //Initialize yt stream
    ytdl(url, {
      filter: 'audioonly'
    })
    .on('end', () =>  {
      console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`)
      res.json(title); //send song title as response
    }).pipe(stream) //pipe mp3 file to response and end response
  })
}

module.exports = conversionController //export conversion controller as js object
