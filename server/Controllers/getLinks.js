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
              }
            }
          );
        } else {
          const user = new Users({
            userId: req.params.uid,
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
    Users.find({ userId: id }, (err, foundUsers) => {
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
    res.send({message:"success"});
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
