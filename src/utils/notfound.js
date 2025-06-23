const notfound = (req, res) => {
  res.status(404).json({ message: "404 Notfound!!!" });
};
export default notfound;
