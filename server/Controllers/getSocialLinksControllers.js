import express from "express";
import Users from "../Models/Users.js";
import validator from "validator";

export const postSocialLinks = (req, res) => {
    try {
        const socialLink = {
            platform: req.body.platform,
            url: req.body.url,
        };

        if (!(validator.isURL(socialLink.url))) {
            return res.status(404).send({ message: 'url is no valid' })
        }

        Users.find({ userId: req.headers.uid }, (err, foundUsers) => {
            if (err) {
                console.log(err);
            } else {
                if (foundUsers.length == 1) {
                    Users.updateOne(
                        { userId: req.headers.uid },
                        { $set: { [`socialLinks.${socialLink.platform}`]: socialLink.url } },
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
        })
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

export const deleteSocialLinks = async (req, res) => {
    try {
        const platform = req.body.platform
        const id = req.params.uid

        const foundUser = await Users.find({ userId: id });

        if (platform in foundUser[0].socialLinks) {
            delete foundUser[0].socialLinks[platform]

            const updatedUser = await Users.findOneAndUpdate(
                { userId: id },
                { socialLinks: foundUser[0].socialLinks }
            );
        }

        res.send({ message: "success" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}