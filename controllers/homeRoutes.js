const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// getting all blogs
router.get('/', async (req, res) => {
  try {
    const blogInfo = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogs = blogInfo.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// getting a single blog
router.get('/blog/:id', async (req, res) => {
  try {
    const blogInfo = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [{
              model:User,
          }]
      }],
    });

    const blog = blogInfo.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// opening up the users dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userInfo.get({ plain: true });
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// directing to the login page, but only allow if the user is not already logged in
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// signup page
router.get('/signup', async (req, res) => {
  try {
      res.render('signup', {
          logged_in: req.session.logged_in 
      });
  } catch (err) {
      res.status(500).json(err);
  }
})

module.exports = router;
