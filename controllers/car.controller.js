const Car = require("../models/car.model");

async function getCars(q, brand, model, color, page, pagesize) {
  const skip = (page - 1) * pagesize;
  const data = await Car.find({ $text: { $search: q }}).limit(pagesize).skip(skip);
  // const data = await Car.find({ $text: { $search: q }})
  // console.log(data.length);
  const datawithoutLimit = await Car.find({ $text: { $search: q }})
  return { data, count: data.length , totalPages:Math.ceil(datawithoutLimit.length/pagesize)};
}

module.exports = {
  getCars,
};
