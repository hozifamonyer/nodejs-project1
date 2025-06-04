const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Aritcle =require("./models/Article");
const Article = require("./models/Article");
app.use(express.json());
app.set("view engine", "ejs");

mongoose
  .connect("mongodb+srv://hozifa:Hozifa2002@cluster0.l4ro4s5.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((error) => {
    console.log("Error connecting to the DB:", error);
  });

app.get("/", (req, res) => {
  res.send("Hello my frineds");
});
app.get("/hello", (req, res) => {
  res.send("hello");
});

app.get("/number", (req, res) => {
  let number = "";
  for (let i = 0; i <= 100; i++) {
    number += i + " _ ";
  }
  // إزالة الفارغة والشرطة السفلية الزائدة في النهاية

  // res.send(`الأرقام هي: ${number}`);
  //res.send(__dirname + "/views/numbers.html");
  // res.sendFile(__dirname + "/views/numbers.html");
  res.render("numbers.ejs", {
    name: "test",
    numbers: number,
  });
});

app.get("/findSummation/:number1/:number2", (req, res) => {
  const num1 = req.params.number1;
  const num2 = req.params.number2;
  const total = Number(num1) + Number(num2);
  console.log(req.params);
  res.send(`the total is: ${total}`);
});
app.get("/sayhello", (req, res) => {
  // console.log(req.body)
  // console.log(req.query.age)
  //res.send(`HELLO: ${req.body.name},AGE:${req.query.age}`);
  res.json({
    name: req.body.name,
    age: req.query.age,
    language: "Ar",
  });
});

app.put("/test", (req, res) => {
  res.send("you visted test hello");
});
app.post("/addcoment", (req, res) => {
  res.send("post rquest on add comment");
});
app.delete("/testingdelete", (req, res) => {
  res.send("visiting delete requset");
});

//====== ARTCLES ENDPOINT======
app.post("/article", async (req, res) => {
  const nesArticles = new Article();
  const arTitle = req.body.articletitle;
  const artBody = req.body.artcilebody;

  nesArticles.title = arTitle;
  nesArticles.body = artBody;
  nesArticles.numbrtlikes = 0;
  await nesArticles.save();
  res.json(nesArticles);
});

app.get("/article/:articleId", async (req, res) => {
        const id = req.params.articleId;

  try{
      const articleE = await Aritcle.findById(id);
        res.json(articleE);


  }catch(error){

     console.log("error",id);
     return res.send("error")
  }
});
app.delete("/article/:articleId",async(req,res)=>{
        const id = req.params.articleId;

  try{
      const articleE = await Aritcle.findByIdAndDelete(id);
        res.json(articleE);


  }catch(error){

     console.log("error",id);
     return res.send("error")
  }
})
app.get("/showarticle",async (req,res)=>{
    const articles= await Aritcle.find()
     res.render("articles.ejs",{
      allArticle:articles
     })

})
app.listen(3000, () => {
  console.log("Server running on port 3000");
});