const express = require('express')
const mongoconnection = require('./db');
const cors = require('cors')
const app = express();
const port = 8000;



app.use(cors());
app.use(express.json({type: ['application/json', 'text/plain']}))



// Routes -----------------------------


app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))


// ----------------------------------------


app.listen(port ,()=>{
    console.log("app started at " , port);
})

