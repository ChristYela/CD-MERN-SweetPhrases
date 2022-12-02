const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/posts", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=> console.log("Connected to DB!!!"))
    .catch(err => console.log("Error to connect to DB", err))
