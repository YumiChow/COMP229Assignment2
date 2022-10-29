/*
  File Name: index.js
  Student's Name: Yuchen Zhou
  Student ID: 301188341
  Date: 2022/10/29
*/
import express from 'express'
import User from '../db/models/user.js'
import jwt from 'jsonwebtoken'
import Contact from '../db/models/contact.js';
const router = express.Router();

const auth = function (req, res, next) {
  if (!req.cookies.token || !jwt.verify(req.cookies.token, 'asdfghjklsdsds')) {
    return res.redirect("/login");
  }
  next();
}

router.all('/', (req, res, next) => {
  res.redirect('/login')
})
router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
  })
  if (user) {
    const token = jwt.sign({
      username: user.username
    }, 'asdfghjklsdsds', {
      expiresIn: 60000
    })
    res.cookie('token', token, { maxAge: 1000 * 3600 * 24, path: '/', httpOnly: true })
    res.redirect('/contact')
  } else {
    res.redirect('/login')
  }
});

router.get('/contact', auth, async (req, res, next) => {
  console.log(2);
  const contacts = await Contact.find({})
  console.log(contacts);
  res.render('contact', {
    title: 'Contact List',
    contacts
  });
});

router.get('/update/:name', auth, async (req, res, next) => {
  const contact = await Contact.findOne({
    name: req.params.name
  })
  res.render('update', {
    title: 'Update',
    contact
  });
});

router.post('/update', auth, async (req, res, next) => {
  console.log(req.body);
  const contact = await Contact.updateOne({
    _id: req.body._id
  }, req.body)
  res.redirect('/contact')
});

router.get('/delete/:name', auth, async (req, res, next) => {
  const contact = await Contact.remove({
    name: req.params.name
  })
  res.redirect('/contact')
});


export default router;
