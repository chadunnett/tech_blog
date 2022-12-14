const router = require('express').Router();
const Comment = require('../../models/Post');
const withAuth = require('../../utils/auth');

router.get('/comments', withAuth, async (req, res) => {
    try {
      const comments = await Comment.findAll({
         where : { user: req.user.id },
         raw: true
        })
  
      console.log(" +++ All user's  : ", comments)
  
      res.render('comments', {
        username: req.user.username, 
        comments,
      })
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  })

router.post('/', withAuth,  async (req, res) => {
    try {
      req.body.user = req.user.id
      await Comment.create(req.body)
      res.redirect('/dashboard')
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  });

  router.delete('/:id', withAuth,  async (req, res) => {
    try {
      let story = await Post.findOne({
        where: {
          id: req.params.id
        },
        raw: true
      })
  
      if (!post) {
        return res.render('error/404')
      }
  
      if (post.user != req.user.id) {
        res.redirect('/dashboard')
      } else {
  
         await Post.destroy({
          where: {
            id: req.params.id
          }
        })
  
        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })

  module.exports = router;