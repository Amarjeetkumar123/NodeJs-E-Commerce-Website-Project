const mongoose = require("mongoose");
const Product = require("./models/product");
// Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/shopping-app")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const products = [
  {
    name: "Iphone11",
    img: "https://images.unsplash.com/photo-1592286927505-1def25115558?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aXBob25lJTIwMTF8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    price: 300,
    desc: "The iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface. The iPhone runs the iOS operating system, and in 2021 when the iPhone 13 was introduced, it offered up to 1 TB of storage and a 12-megapixel camera.",
  },
  {
    name: "Nike Shoes",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmlrZSUyMHNob2VzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    price: 100,
    desc: "Nike Air cushioning reduces the weight of the shoe without reducing performance. The lighter the shoe is, the less energy athletes put out during their performance. Athletes need the cushioning in their footwear to last, and Nike Air is designed to provide support throughout the life of the shoe.",
  },
  {
    name: "Titan Watch",
    img: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fHRpdGFuJTIwd2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    price: 150,
    desc: "Titan Watches, one of India's leading watch brands that brought about a paradigm shift in the Indian watch market, with the quartz technology and international styling. The brand Titan is committed to offering its consumers watches that represent the compass of their imagination.",
  },
  {
    name: "Macbook Pro",
    img: "https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG1hY2tib29rJTIwcHJvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    price: 250,
    desc: "The MacBook Pro is a line of Mac notebook computers by Apple Inc. Introduced in January 2006, it is the higher-end model of the MacBook family, sitting above the consumer-focused MacBook Air. It is currently sold with 13-inch, 14-inch, and 16-inch screens, all using variants of the Apple-designed M1 and M2 system on a chip.",
  },
  {
    name: "Drones",
    img: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8RHJvbmVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    price: 300,
    desc: "Essentially, a drone is a flying robot that can be remotely controlled or fly autonomously using software-controlled flight plans in its embedded systems, that work in conjunction with onboard sensors and a global positioning system (GPS). UAVs were most often associated with the military.",
  },
  {
    name: "Bicycle",
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    price: 350,
    desc: "bicycle, also called bike, two-wheeled steerable machine that is pedaled by the rider's feet. On a standard bicycle the wheels are mounted in-line in a metal frame, with the front wheel held in a rotatable fork. The rider sits on a saddle and steers by leaning and turning handlebars that are attached to the fork.",
  },
  {
    name: "Nikon Camera",
    img: "https://images.unsplash.com/photo-1624913503273-5f9c4e980dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmlrb24lMjBjYW1lcmF8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    price: 400,
    desc: "Our digital SLR cameras capture stunning images with cutting-edge speed, quality, and high performance. Unlock your creativity with DSLR cameras from Nikon.For generations, Nikon cameras have been trusted by photographers and picture takers of every caliber for their enduring performance and outstanding image ...",
  },
];


// Product.deleteMany({}).then(() => {
//   console.log("Product deleted");
// });

// Product.insertMany(products).then(() => {
//   console.log("Product Seeded");
// });

async function seedDb() {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Product seeded');
}

seedDb();