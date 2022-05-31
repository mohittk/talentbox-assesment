const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/UserSchema')


// const routes = require('./routes/routes');

app.use(cors());
app.use(express.json());



mongoose.connect(`mongodb+srv://interntest:intern123@cluster0.9lxgsvb.mongodb.net/?retryWrites=true&w=majority`)
.then(()=> {
    console.log('database connection established');
})
.catch((err)=>{
    console.log('error connecting to databse');
    console.log(err);
})




app.get('/', function (req, res) {
    res.send('hey')
})

app.post('/friends', function (req, res) {
    let {id, name} = req.body;

    const newuser = new User({
        id, name
    })
    newuser.save(function(error, document){
        if(error){
            console.log(error);
        }
        else{
            return res.json({"message" : "success"})
        }
    })
})

app.get('/friends', function (req, res) {


    User.find((err, user)=>{
        if(err){
            console.log(err);
        }
        else{
            return res.render("list", {
                data : user
            });
        }
    })
})

app.get('/friends/:id', function (req, res) {
    res.send(
        {id : 0, name : 'Albert Einstein'}
    )
})



app.listen(port, ()=>{
    console.log("listening to port 5000")
})