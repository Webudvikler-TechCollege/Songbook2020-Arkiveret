const fetch = require('node-fetch');

module.exports = (app) => {

    //Route til liste med sange
    app.get("/fetch/:sort", (req, res) => {
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
                res.render('pages/fetch/songlist', {
                    title: "Sangliste",
                    content: "Her finder du udvalgte lister.",
                    songlist
                });
            })
    });

    //Route til detalje side - skal have et parameter - eks: http://localhost:4242/details/233
    app.get('/fetch/details/:id([0-9]*)', (req, res) => {
        //Fetch API data
        fetch('https://api.mediehuset.net/songbook/')
            //Parse data as json
            .then(response => response.json())
            //Array data
            .then(data => {
                const songlist = data.song;
                const song = songlist.find(obj => obj.id == req.params.id);
                res.render('pages/fetch/songdetails', {
                    title: "Vis sang",
                    content: "Her finder du tekst og akkorder til en sang",
                    song: song
                });
            })
    })  

    //Route til søgning
    app.post("/fetch/search", (req, res) => {
        
        let keyword = (req.body.keyword === undefined) ? '' : req.body.keyword;
        console.log(keyword);

        //Fetch API data
        fetch('https://api.mediehuset.net/songbook/')
            //Parse data as json
            .then(response => response.json())
            //Array data
            .then(data => {
                const songlist = data.song;

                if(keyword === "") {
                    res.sendStatus(418);
                } else {
                    let results = [];
                    songlist.forEach(element => {
                        if(element.title.includes(keyword) || 
                            element.artist_name.includes(keyword) || 
                            element.content.includes(keyword)) {
                            results.push(element)
                        }
                    });
                    //Render til EJS side
                    res.render('pages/fetch/songlist', {
                        title: "Sangliste",
                        content: "Søgeresultat",
                        songlist: results
                    });                    
                }


            })
    });

    //Route til sangliste ud fra artist
    app.get('/fetch/artist/:id([0-9]*)', (req, res) => {
        //Fetch API data
        fetch('https://api.mediehuset.net/songbook/')
            //Parse data as json
            .then(response => response.json())
            //Array data
            .then(data => {
                const songlist = data.song;
                let results = [];
                songlist.forEach(element => {
                    if(element.artist_id == req.params.id) {
                        results.push(element)
                    }
                });

                //Render til EJS side
                res.render('pages/fetch/songlist', {
                    title: "Sangliste",
                    content: "Her finder du udvalgte lister.",
                    songlist: results
                });
            })
    })  
}