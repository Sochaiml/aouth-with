const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://8479946428ll:DXRbR7XopJl2UaPS@googleaouth.ghogaxx.mongodb.net/Googleaouth?retryWrites=true&w=majority");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to database'));

db.once('open', ()=>{
  console.log("successfully connected to database : mongoDB");
});

module.exports = db;