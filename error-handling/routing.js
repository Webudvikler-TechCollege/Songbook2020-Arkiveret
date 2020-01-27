module.exports = function(app) {
  app.use((req, res) => {
    res.status(404);
    res.render("pages/error", {
      title: "Fejl 404!",
      content: "Siden du leder efter findes ikke."
    });
  });

  app.use((error, req, res, next) => {
    res.status(500);
    res.render("pages/error", {
      title: "500: Internal Server Error",
      content: "Noget gik galt på serveren."
    });
    next(error);
  });
};
