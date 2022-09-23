import express from "express";
import Users from "../Models/Users.js";

export const postSocialLinks = (req, res) => {
    try {
        const socialLink = {
            platform : req.body.platform,
            url : req.body.url,
        };
        Users.find({ userId: req.params.uid }, (err, foundUsers) => {
            if (err) {
                console.log(err);
            } else {
                if (foundUsers.length == 1) {
                    Users.updateOne(
                        { userId: req.params.uid },
                        { $set: { [`socialLinks.${socialLink.platform}`] : socialLink.url } },
                        (err, foundUser) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(foundUser);
                                res.status(200).json({ message: "social links added successfully" });
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

export const getSocialLinks = (req, res) => {
    try {
        const id = req.params.uid;
        console.log(id);
        Users.find({ userId: id }, (err, foundUser) => {
            if (err) {
                console.log(err);
            } else {
                // const foundSocialLinks = foundUser.socialLinks
                console.log(foundUser);
                res.status(200).json(foundUser);
            }
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

