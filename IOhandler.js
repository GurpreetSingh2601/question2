/*
 * Project: Final practice question 2
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: 30 November 2021
 * Author: Gurpreet Singh
 *
 */
pathProcessed = `${__dirname}/grayscaled/out.png`;
pathtoprocess = `${__dirname}/unzipped/in.png`;
zipFilePath = `${__dirname}/myfile.zip`;
pathUnzipped = `${__dirname}/unzipped`;



const unzipper = require("unzipper"),
  fs = require("fs").promises,
  PNG = require("pngjs").PNG,
  createReadStream = require("fs").createReadStream,
  createWriteStream = require("fs").createWriteStream,
  path = require("path");
  

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
 const unzip = (zipFilePath, pathUnzipped) => {
  return createReadStream(zipFilePath)
  .pipe(unzipper.Extract({ path: pathUnzipped }))
  .promise()
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  const images = fs.readdir(dir)
  .then((images) => {
    let promisearray = []
    images.forEach(image => {
      if (path.extname(image) === ".png"){
        promisearray.push(`${__dirname}/${image}`)
      }
    })
    console.log(promisearray)
    return promisearray
  })
  .catch((err) => {console.error(err)})
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathtoprocess, pathProcessed) => {
  createReadStream(pathtoprocess)
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;
 
        // invert color
        //Gray = (R+G+B)/3
        let gray = (this.data[idx] + this.data[idx + 1] +this.data[idx + 2])/3
        this.data[idx] = gray
        this.data[idx + 1] = gray
        this.data[idx + 2] = gray
      }
    }
 
    this.pack().pipe(createWriteStream(pathProcessed));
  });

};


module.exports = {
  unzip,
  readDir,
  grayScale,
};
