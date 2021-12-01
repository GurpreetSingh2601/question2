/*
 * Project: Final practice question 2
 * File Name: main.js
 * Description: main page of the project
 *
 * Created Date: 30 November 2021
 * Author: Gurpreet Singh
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`;

IOhandler.unzip(zipFilePath, pathUnzipped)
.then(() => console.log("Extraction operation complete."))
.then((dir) => IOhandler.readDir(pathUnzipped))
.then((images) => IOhandler.grayScale("unzipped/in.png", "grayscaled/out.png"))
.catch((err) => console.error(err))
