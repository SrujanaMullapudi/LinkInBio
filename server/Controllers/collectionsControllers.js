import express from "express";
import Users from "../Models/Users.js";

export const getAllCollections = async (req, res) => {
  try {
    const { uid } = req.params;
    Users.find({ userId: uid }, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foundUser);
        res.status(200).json(foundUser.collections);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const postCollections = (req, res) => {
  console.log("hi");
  console.log(req.body);
  let Collection = {};
  Collection = {
    id: req.body.id,
    collectionName: req.body.collectionName,
    imageURL: req.body.photoURL,
    links: [],
  };
  Users.find({ userId: req.headers.userid }, (err, foundUsers) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUsers.length == 1) {
        Users.updateOne(
          { userId: req.headers.userid },
          { $push: { collections: Collection } },
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
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};

export const AddCollectionLink = (req, res) => {
  console.log(req.body);
  console.log(req.headers);

  Users.updateOne(
    {
      userId: req.headers.userid,
      "collections.collectionName": req.params.collectionName,
    },
    {
      $push : { "collections.$.links": req.body },
    },function(err) {
      console.log(err);
    },
  );
  res.status(200).json({ message: "Link Added Successfully"});
};
