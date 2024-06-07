const express = require("express");
const mongoose = require("mongoose");
const port = 5000;
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/e-commDB");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
const Product = require("./schemas/Product");

app.get("/", (req, res) => {
  Product.find({})
          .then(products=>{
            if(products.length >0){
              res.send(products)
              console.log(products)
            }
            else{
              res.send({message:'No product '})
            }
          })
});
app.post("/register", (req, res) => {
  const user = new User(req.body);
  console.log(user);
  user
    .save()
    .then(() => {
      res.json({ message: "User registered" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error occurred while registering the user" });
    });
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.json({ message: "No user found" });
    }
  } else {
    res.json({ message: "Invalid credentials" });
  }
});



app.delete("/delete-product/:id", async (req, res) => {
  try {
      const product = await Product.findOne({ _id: req.params.id });
      if (product) {
          await Product.deleteOne({ _id: req.params.id });
          res.json({ success: true, message: "Item deleted" });
      } else {
          res.json({ success: false, message: "Product not found" });
      }
  } catch (err) {
      res.json({ success: false, message: "Error deleting item" });
  }
});

app.get('/update/:id',(req,res)=>{

  console.log(req.params.id)
  Product.findOne({_id:req.params.id})
          .then(product=>{
            console.log(product)
            res.send(product)
          })
          .catch(err=>{
            console.log(err)
          })
})
app.put('/update/:id', (req, res) => {
  
  Product.updateOne({ _id: req.params.id }, { $set: req.body })
      .then(() => {
          // Fetch the updated product to return the details
          Product.findById(req.params.id)
              .then(updatedProduct => {
                  res.send(updatedProduct);
              })
              .catch(err => {
                  res.status(500).send({ failure: "Error occurred while fetching the updated product" });
              });
      })
      .catch(err => {
          res.status(500).send({ failure: "Error occurred while updating the product" });
      });
});



app.post("/add-product", (req, res) => {
  let product = new Product(req.body);
 product.save()
 .then(() => {
  res.json({ message: "product registered" });
})
.catch((err) => {
  res
    .status(500)
    .json({ error: "Error occurred while registering the product" });
});
});

app.get('/search/:key',async(req,res)=>{
let result = await Product.findOne({"$or":[
  {
    name:{$regex:req.params.key}
  },
  {
    company:{$regex:req.params.key}
  },
  {
    category:{$regex:req.params.key}
  }
  
]})
res.send(result)
})

app.listen(port,'0.0.0.0', () => {
  console.log(`App running on port ${port}`);
});
