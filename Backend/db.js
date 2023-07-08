const mongoose = require('mongoose');
const dburl = 'mongodb://127.0.0.1:27017/inotebook'


mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});











