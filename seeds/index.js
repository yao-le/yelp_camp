const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("connection error");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "62edb265609468934f57485c",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat ante libero, ac euismod nulla eleifend quis. In venenatis, ipsum at sodales vehicula, nisi velit condimentum sapien, eu dignissim urna massa a tortor.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dn5y0wnt4/image/upload/v1659819629/YelpCamp/hptn20v9wu55ygopdcdk.jpg",
          filename: "YelpCamp/hptn20v9wu55ygopdcdk",
        },
        {
          url: "https://res.cloudinary.com/dn5y0wnt4/image/upload/v1659819629/YelpCamp/xakzwtsbwghduu2hwubb.jpg",
          filename: "YelpCamp/xakzwtsbwghduu2hwubb",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
