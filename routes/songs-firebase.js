const fetch = require('node-fetch');

module.exports = (app) => {

    //Route til liste med sange
    app.get("/firebase", (req, res) => {

        //Render til EJS side
        res.render('pages/firebase/list', {
            title: "Firebase Sangliste",
            content: "Her finder du udvalgte lister."
        });
    })  
}