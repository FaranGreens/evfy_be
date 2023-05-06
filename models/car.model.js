const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    mileage:{
        type:Number,
        required: true
    },
    transmission:{
        type:String,
        required: true  
    },
    engine:{
        type:Number,
        required: true
    },
    bhp:{
        type:Number,
        required: true
    },
    interior_color:{
        type:String,
        required: true
    },
    fuel_type:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    images:{
        type:[String]
    },
    colors:{
        type:Object,
    },
    page:String
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
