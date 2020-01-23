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
    
    //404 meddelelse
    app.use(function(req, res, next) {
        title = "Kan ikke finde siden";
        content = "Kan ikke finde siden";
        res.status(404).send(
            res.render('pages/404', {
                title: title,
                content: content
            })   
        );
    });    
}