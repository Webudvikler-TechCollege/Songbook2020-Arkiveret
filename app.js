const express = require('express');
const app = express();
//Sørger for at vi kan læse post variabler
app.use(express.urlencoded({extended:true}));

//Sætter til 4242 hvis default port ikke er angivet
const port = process.env.PORT || 4242;

//Require config & route files
require('./config/index')(app);
require('./routes/index')(app);

//Angiver port der skal lyttes på
app.listen(port, () => {
    console.log("Express server kører...");
});