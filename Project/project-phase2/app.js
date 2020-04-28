const express = require('express');
const app = express();
const halaqaRepository = require('./HalaqaRepository');

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

const dbConnection = mongoose.connect('mongodb://localhost/halaqaDB',
    { useNewUrlParser: true, useCreateIndex: true }, (err) => {
        if (err) {
            console.log("Failed to connect to monogoDb " + err);
            return;
        }
        else {
            halaqaRepository.initDb();
            const port = 8090;
            app.listen(port, () => {
                console.log("HalaqaMetrash App is running on http://localhost:" + port);
            });
        }
    });