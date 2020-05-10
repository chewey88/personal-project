module.exports = {
  getTrails: async (req, res) => {
    const db = req.app.get("db");
    const trails = await db.get_trails();
    res.status(200).send(trails);
  },
};
