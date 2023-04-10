const File=require("../models/imageModel");

const uploadFile = async (req, res) => {
    try {
      const query = new File({
        fileData: req.body.fileData
      })
  
      await query.save();
      console.log("Image Uploaded !!!");
      res.status(201).json({ message: "Product Request added !!" });
    } catch {
      res.status(404).json({ message: "Error in Connection." });
    }
  };
  
  const getFiles = async (req, res) => {
    try{
        console.log("hi1");
        const data = await File.find({});
        console.log(data);
        console.log("hi2");
        res.status(201).json({message: data});
    }
    catch{
        res.status(404).json({message: "Error in connection"});
    }
  };

  module.exports = {
    uploadFile,
    getFiles
  };