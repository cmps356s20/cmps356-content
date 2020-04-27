const express = require('express');
const app = express();

/*  express.json() extracts the body portion of an incoming request and assigns
    it to req.body.
 */
app.use( express.json() );

//Allow serving static files from public folder
app.use( express.static('public') );

//Mount the routes to the app
const routes = require('./routes');
app.use('/api/', routes);

app.get('/', (req, res) => {
    res.sendFile('login.html', {root: `${__dirname}/public` });
});

const port = 8090;
app.listen(port, function () {
    console.log("HalaqaMetrash App is running on http://localhost:" + port);
});