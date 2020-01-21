const express = require('express');
const app = express();
const fetch = require('node-fetch');

//Sætter view engine til ejs
app.set('view engine', 'ejs');

//Definerer rod mappe til css referencer m.m.
app.use(express.static('/Users/heinz/Sites/Songbook2020/'));

//Definerer rod mappe til EJS m.m.
app.set('views','/Users/heinz/Sites/Songbook2020/views');


//Route til liste med sange
app.get("/:sort", (req, res) => {
    //Fetch API data
    fetch('https://api.mediehuset.net/songbook/')
        //Parse data as json
        .then(response => response.json())
        //Array data
        .then(data => {
            const songlist = data.song;

            //Sort functions
            switch(req.params.sort) {
                default:
                case "a-z":
                    break;
                    case "z-a":
                        songlist.reverse();
                    break;
                    case "art-a-z":
                        //Sorter sange efter artist_navn
                        songlist.sort(
                            function(a, b){
                                var x = a.artist_name.toLowerCase();
                                var y = b.artist_name.toLowerCase();
                                if (x < y) {return -1;}
                                if (x > y) {return 1;}
                                return 0;                
                            }
                        );
                    break;
                    case "art-z-a":
                        //Sorter sange efter artist_navn
                        songlist.sort(
                            function(a, b){
                                var x = a.artist_name.toLowerCase();
                                var y = b.artist_name.toLowerCase();
                                if (x < y) {return 1;}
                                if (x > y) {return -1;}
                                return 0;                
                            }
                        );
                    break;
            }

            //Render til EJS side
            res.render('pages/songlist', {
                title: "Sangliste",
                content: "Her finder du udvalgte lister.",
                songlist: songlist
            });
        })
});

//Route til detalje side - skal have et parameter - eks: http://localhost:4242/details/233
app.get('/details/:id([0-9]*)', (req, res) => {
    console.log(req.params);
    //Fetch API data
    fetch('https://api.mediehuset.net/songbook/')
        //Parse data as json
        .then(response => response.json())
        //Array data
        .then(data => {
            const songlist = data.song;
            const song = songlist.find(obj => obj.id == req.params.id);
            res.render('pages/songdetails', {
                title: "Vis sang",
                content: "Her finder du tekst og akkorder til en sang",
                song: song
            });
        })
})


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

//Angiver port der skal lyttes på
app.listen(4242, () => {
    console.log("Express server kører...");
});