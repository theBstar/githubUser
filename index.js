require('dotenv').config()
const PORT = process.env.PORT || 3100;
const app = require('./server/index.js');

app.listen(PORT, function(){
    console.log("the server app is listening on port:", PORT);
}) 