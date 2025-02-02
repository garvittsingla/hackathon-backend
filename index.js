const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./routes/UserRouter');
const NeuronRouter = require('./routes/NeuronRouter');

const app = express();
async function connectdb() {
    await mongoose.connect("mongodb+srv://garvits093:43rDBHOUx4jmrKmU@cluster0.iokxe.mongodb.net/hackathon")
    console.log('Connected to database');
}
connectdb();
app.use(express.json());
app.use('/user', UserRouter);
app.use('/neuron', NeuronRouter);


app.listen(3000)