const fs = require('fs');
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const usersRoutes = require("./routes/users-routes");
const placesRoutes = require("./routes/places-routes");
const HttpError = require("./models/http-error");
const app = express();

app.use(bodyParser.json());


app.use('/uploads/images',express.static(path.join('uploads','images')));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
  next();
})

app.use("/api/users", usersRoutes);

app.use("/api/places", placesRoutes);

/* My Code */
app.use("/api/home", placesRoutes);
/* My Code */

app.use((req, res, next) => {
  const error = new HttpError("Could not find the route", 404);
  throw error;
});

//Only For error handling
app.use((error, req, res, next) => {
  if (req.file){
    fs.unlink(req.file.path,(err)=>{
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500); //Something went wrong on server
  res.json({ message: error.message || "An unknown Error Occured" });
});

//connecting to mongodb
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zjynb1d.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
