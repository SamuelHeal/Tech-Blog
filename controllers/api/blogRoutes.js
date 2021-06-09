const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// creating a new blog
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// creating a new comment on a blog
router.post('/:id', async (req, res) => {
  try {
      const newComment = await Comment.create({
          comment: req.body.comment,
          user_id: req.session.user_id,
          post_id: req.params.id
      })
      res.status(200).json(newComment)

  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});


// deleting a
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
