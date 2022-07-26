// Dependencies
const express = require('express');
// Create a route object
const logRouter = express.Router();

// Import the models
const Log = require('../models/log');
// const User = require('../models/user');

// List the router actions
// router middleware
// TODO: Add middleware to check if user is logged in

// index route - list all logs
logRouter.get('/', (req, res) => {
    Log.find({}, (error, logs) => {
        res.render('./logs/index.ejs', { logs, name: '' })
    });
});

// filtered index route - list all logs by user
// TODO: add route to filter logs by user

// new route
logRouter.get("/new", (req, res) => {
    res.render("./logs/new.ejs");
});

// delete route
logRouter.delete("/:id", (req, res) => {
    Log.findByIdAndDelete(req.params.id, (error, deletedlog) => {
        res.redirect("/logs");
    });
});

// update route
logRouter.put("/:id", (req, res) => {
    req.body.shipIsBroken = !!req.body.shipIsBroken;
    Log.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, updatedlog) => {
            res.redirect(`/logs/${req.params.id}`);
        }
    );
});

// create route
logRouter.post("/", (req, res) => {
    req.body.shipIsBroken = !!req.body.shipIsBroken;
    // req.body.user = req.session.user; // associates the log with the user who created it
    Log.create(req.body, (err, createdlog) => {
        res.redirect("/logs");
    });
});


// edit route
logRouter.get("/:id/edit", (req, res) => {
    Log.findById(req.params.id, (error, foundLog) => {
        res.render("./logs/edit.ejs", { foundLog });
    });
});


// show route
logRouter.get("/:id", (req, res) => {
    Log.findById(req.params.id, (error, foundLog) => {
        res.render("./logs/show.ejs", { foundLog });
    });
});

// Export router object so that we can require it in server.js
module.exports = logRouter;
