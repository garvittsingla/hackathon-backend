const express = require('express');
const mongoose = require('mongoose');
const Neuron = require('../models/Neuron');
const auth = require('../middleware');


const NeuronRouter = express.Router();


NeuronRouter.post('/',auth, async (req, res) => {
    const {link} = req.body
    
    const {title,type,tags,description} = req.body;
    const userId = req.userId;
    // console.log(req.body);
    const newNeuron = Neuron.create({
        title,
        type,
        tags,
        link,
        userId,
        description
    })
    if (newNeuron) {
        res.status(200).json({ message: 'Neuron created successfully' });
    }
    else {
        res.status(500).json({ message: 'Error creating Neuron' });
    }
})
NeuronRouter.get("/", auth,async (req, res) => {
    // console.log(req.userId,"i am here");
    const user = req.userId;
    const neurons = await Neuron.findOne({ userId: user });
    res.status(200).json(neurons);
})



module.exports = NeuronRouter