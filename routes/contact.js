module.exports = (app) => {

    //Route til formular
    app.get("/contact", (req, res) => {
        //Render til EJS side
        res.render('pages/contactform', {
            title: "Kontakt os",
            content: "Udfyld formularen og tryk Send"
        });
    });

    app.post("/contact", (req, res) => {
        console.log(req.body.firstname);
        res.send(req.body.firstname);
    });
  
}