exports.get404Page = (req, res, next) => {
  // res.status(404).render("404", { pageTitle: "Page Not Found" });
  res.status(404).json({ message: "Route not found" });
};
