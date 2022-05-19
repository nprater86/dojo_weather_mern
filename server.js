const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
require('dotenv').config();
const cookieParser = require('cookie-parser');


require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

const AllUserRoutes = require("./server/routes/user.routes");
AllUserRoutes(app);

// req is short for request
// res is short for response
app.get('/api', (req, res) => {
    res.send('Our express api server is now sending this over to the browser');
});

const server = app.listen(port, () =>
    console.log(`Server is locked and loaded on port ${server.address().port}!`)
);