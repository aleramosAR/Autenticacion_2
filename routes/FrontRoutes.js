import express from "express";
import passport from "passport";
import { isAuth } from '../middlewares/Middlewares.js';

const router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/index', failureRedirect: '/login' }));

router.get('/', function(req, res){
  res.redirect('/login');
});

router.get("/index", isAuth, (req, res) => {
  res.render("index", { user: req.session.passport.user });
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("index");
  } else {
    res.render("login");
  }
});

router.get('/logout', (req, res) => {
  res.render("logout", { user: req.session.passport.user });
  req.logout();
})

router.get("/unauthorized", (req, res) => {
  res.render("unauthorized");
});

router.get("/login-error", (req, res) => {
  res.render("login-error");
});


router.get('/privacy', function(req, res){
  res.render('privacy');
});


export default router;