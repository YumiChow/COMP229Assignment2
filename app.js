/*
  File Name: app.js
  Student's Name: Yuchen Zhou
  Student ID: 301188341
  Date: 2022/10/29
*/
import express from "express"
import path from "path"
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import jwt from 'jsonwebtoken'
import indexRouter from './routes/index.js'
import { fileURLToPath } from "url"
import './db/index.js'
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
  var url = req.originalUrl;
  if (url != "/login" && (!req.cookies.token || !jwt.verify(req.cookies.token))) {
    return res.redirect("/login");
  }
  next();
});
app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

export default app;
