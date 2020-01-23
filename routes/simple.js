module.exports = (app) => {

    //Route til GET
    app.get("/simple", (req, res) => {
        //Render til EJS side
        res.render('pages/index', {
            title: "Template Routing Eksempel",
            content: "Simpel route til standard side"
        });
    });    
}