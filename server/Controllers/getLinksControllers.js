import express from "express";
import Users from "../Models/Users.js";

export const postLinks = (req, res) => {
  try {
    let link = {};
    if (req.body.type === "Simple Link") {
      link = {
        id: req.body.uid,
        name: req.body.name,
        link: req.body.link,
        imageURL: req.body.imageURL,
        type: req.body.type,
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
                  res.status(200).json({ message: "links added successfully" });
                }
              }
            );
          }
        }
      });
    } else if (req.body.type === "Professional Link") {
      console.log("in else if");
      Users.find({ userId: req.params.uid }, (err, foundUsers) => {
        if (err) {
          console.log(err);
        } else {
          if (foundUsers.length == 1) {
            Users.updateOne(
              { userId: req.params.uid },
              { $push: { links: req.body } },
              (err, foundUser) => {
                if (err) {
                  console.log(err);
                } else {
                  res.status(200).json({ message: "links added successfully" });
                }
              }
            );
          }
        }
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLinks = (req, res) => {
  try {
    const id = req.params.uid;
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

export const checkUsernameAvailable = (req, res) => {
  console.log(req.body);
  try {
    const name = req.body.name;
    const id = req.body.uid;
    const photoURL = req.body.photoURL;
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
            collections:[]
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
    if (req.body.type === "Simple Link") {
      const newLinkName = req.body.name;
      const newLinkURL = req.body.link;

      Users.updateOne(
        { userId: userId, "links.id": linkId },
        {
          $set: {
            "links.$.name": newLinkName,
            "links.$.link": newLinkURL,
            "links.$.imageURL": req.body.imageURL,
          },
        },
        function (err) {
          console.log(err);
        }
      );
      res.status(200).json({ message: "successfully updated" });
    } else if (req.body.type === "Professional Link") {
      const {name, link, imageURL, CouponCode, CouponCriteria, CouponCodeExipry, OfferType, OfferValue} = req.body
      Users.updateOne(
        { userId: userId, "links.id": linkId },
        {
          $set: {
            "links.$.name": name,
            "links.$.link": link,
            "links.$.imageURL": imageURL,
            "links.$.CouponCode": CouponCode,
            "links.$.CouponCriteria":CouponCriteria,
            "links.$.CouponCodeExipry":CouponCodeExipry,
            "links.$.OfferType":OfferType,
            "links.$.OfferValue":OfferValue
          },
        },
        function (err) {
          console.log(err);
        }
      );
      res.status(200).json({ message: "successfully updated" });
    }
  } catch (error) {
    console.log(error);
  }
};
