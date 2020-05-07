module.exports = {
    getMinerals: (req, res) => {
        try{
            const db = req.app.get('db')
            const {search} = req.query
            
            const searchResults = db.search_query([search])
            
            return res.status(200).send(searchResults)
        } catch(err) {
            return res.status(500).send('Something went wrong')
        }
    }
}