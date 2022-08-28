import express from "express";
import Users from "../Models/Users.js";

export const postLinks = (req, res) => {
  try {
    const link = {
      id: req.body.uid,
      name: req.body.name,
      link: req.body.link,
    };
    Users.find({ userId: req.params.uid }, (err, foundUsers) => {
      if (err) {
        console.log(err);
      } else {
        if (foundUsers.length == 1) {
          Users.updateOne(
            { userId: req.params.uid },
            { $push: { links: link } },
            (err, foundUser) => {
              if (err) {
                console.log(err);
              } else {
                console.log(foundUser);
                res.status(200).json({ message: "links added successfully" });
              }
            }
          );
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
        console.log(foundLinks);
        res.status(200).json(foundLinks);
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const checkUsernameAvailable = (req, res) => {
  try {
    const name = req.body.name;
    const id = req.body.uid;
    const photoURL = req.body.photoURL;
    console.log(name, id, photoURL);
    Users.find({ userName: name }, (err, foundUsers) => {
      if (err) {
        console.log(err);
      } else {
        if (foundUsers.length > 0) {
          res.status(200).json({ message: "username already present" });
        } else {
          const user = new Users({
            userId: id,
            userName: name,
            photoURL,
            links: [],
          });
          user.save();
          res.status(200).json({ message: "Tree Created Succesfully" });
        }
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteLink = async (req, res) => {
  try {
    const id = req.params.uid;
    const idx = req.params.idx;
    const foundUser = await Users.find({ userId: id });
    let newLinkArray = foundUser[0].links.filter((link) => {
      return link.id != idx;
    });
    const updatedUser = await Users.findOneAndUpdate(
      { userId: id },
      { links: newLinkArray }
    );
    res.send({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};

export const publicViewing = (req, res) => {
  const userName = req.params.username;
  console.log(userName);
  Users.find({ userName }, (err, founduser) => {
    if (err) {
      console.log(err);
    } else {
      console.foundLinks;
      res.status(200).json(founduser);
    }
  });
};

export const getEditLink = (req, res) => {
  try {
    const userId = req.params.uid;
    const linkId = req.params.linkId;
    Users.find({ userId }, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(
          foundUser[0].links.filter((link) => {
            return link.id === linkId;
          })
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const editLink = async (req, res) => {
  try {
    const userId = req.params.uid;
    const linkId = req.params.linkId;
    // console.log(linkId);
    const newLinkName = req.body.name;
    const newLinkURL = req.body.URL;
    console.log(req.body);
    // Users.find({userId:userId, "links.$.id" : linkId}, (err,foundUser)=>{
    //   if(err){
    //     console.log(err);
    //   }else{
    //     console.log(foundUser);
    //   }
    // })
    // console.log(newLinkURL,newLinkName);
    Users.updateOne(
      { userId: userId, "links.id": linkId },
      {
        $set: {
          "links.$.name": newLinkName,
          "links.$.link": newLinkURL,
        },
      },function(err){
        console.log(err);
      }
    );
    res.status(200).json({message:"successfully updated"});
  } catch (error) {
    console.log(error);
  }
};
