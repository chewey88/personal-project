module.exports = {
    getComments: async (req, res) => {
      const db = req.app.get('db')
      const comments = await db.get_comments()
      res.status(200).send(comments)
      
    },
    addComment: async (req, res) => {
        const db = req.app.get('db')
        if(!req.session.user) return res.status(400).send('Please login')

        const {users_id} = req.session.user
        const {content, comment_region} = req.body


        await db.add_comment([users_id, content, comment_region])
    
        const comments = await db.get_comments()
       return res.status(200).send(comments)
      
    },
    editComment: async (req, res) => {
      const db =  req.app.get('db')
      const {comment_id} = req.params
      const {content} = req.body
  
      await db.edit_comment([content, comment_id])
  
      const comments = await db.get_comments()
      res.status(200).send(comments)
  
    },
    deleteComment: async (req, res) => {
      const db = req.app.get('db')
      const {comment_id} = req.params
  
      await db.delete_comment([comment_id])
  
      const comments = await db.get_comments()
      res.status(200).send(comments)
     
    }
  };
  