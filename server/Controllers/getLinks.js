import express from "express";
import Users from "../Models/Users.js";

export const postLinks = (req, res) => {
  try {
    const link = {
      name: req.body.name,
      link: req.body.link,
    };
    Users.find({userId:req.params.uid},(err,foundUsers)=>{
      if(err){
        console.log(err);
      }else{
        if(foundUsers.length == 1){
          Users.updateOne({userId:req.params.uid},{"$push": { "links": link } },(err,foundUser)=>{
            if(err){
              console.log(err);
            }else{
              console.log(foundUser);
            }
          })
        }else{
          const user = new Users({
            userId : req.params.uid,
          });
          user.links.push(link);
          user.save();
        }
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLinks = (req, res) => {

  try {
    const id = req.params.uid;
    console.log(id);
    Users.find({ userId: id }, (err, foundLinks) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(foundLinks);
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
