const express = require('express');
const app = express();
const port = process.env.PORT || 4242;

//Require config & route files
require('./config/index')(app);
require('./routes/index')(app);

//Angiver port der skal lyttes på
app.listen(port, () => {
    console.log("Express server kører...");
});