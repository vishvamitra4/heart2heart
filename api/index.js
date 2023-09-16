const express = require('express'); //
const cors = require('cors'); //
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const app = express();
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const uploadMiddleaware = multer({ dest: 'uploads/' });
const fs = require('fs');


const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';


app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cookieParser());

/*mongoose.connect('mongodb+srv://vishvamitrakumarsingh:dGjDmrSOokfbxxBu@cluster0.lhz4pht.mongodb.net/?retryWrites=true&w=majority');*/
mongoose.connect("mongodb://localhost:27017/BlogApp");



app.post('/register', async (req, res) => {
    const { userName, userPassword } = req.body;
    try {
        const userDoc = await User.create({
            userName,
            userPassword: bcrypt.hashSync(userPassword, salt)
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }

});



app.post('/login', async (req, res) => {
    const { userName, userPassword } = req.body;
    const userDoc = await User.findOne({userName});
    const passOk = bcrypt.compareSync(userPassword, userDoc.userPassword);

    if (passOk === true) {
        //// logged in,
        jwt.sign({ userName, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                userName,
            });
        })
    }
    else {
        res.status(400).json('Wrong Credentials');
    }
});




app.post('/logout',  (req, res) => {
    res.cookie('token', '').json('ok');
})


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
});


app.post('/post', uploadMiddleaware.single('file'), async (req, res) => {

    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;

        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });

        res.json(postDoc);
    })
});


app.put('/post', uploadMiddleaware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    };
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;

        const { id , title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

        if(!isAuthor){
            return res.status(400).json('You are not a author..');
        };

        await postDoc.update({
            title , 
            summary , 
            content , 
            cover : newPath ? newPath : postDoc.cover,
        })
        res.json(postDoc);
    })
})


app.get('/post', async (req, res) => {
    res.json(await Post.find()
        .populate('author', ['userName'])
        .sort({ createdAt: -1 })
        .limit(20)
    );
})


app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate('author', ['userName']);
    res.json(postDoc);
})

app.listen(4000);


// mongodb+srv://Vishva_BlogApp:rdCIaRg9Nh8D6MoI@cluster0.rlgcokl.mongodb.net/?retryWrites=true&w=majority

//rdCIaRg9Nh8D6MoI


/*
mongodb+srv://vishvamitrakumarsingh:dGjDmrSOokfbxxBu@cluster0.lhz4pht.mongodb.net/?retryWrites=true&w=majority
dGjDmrSOokfbxxBu
*/