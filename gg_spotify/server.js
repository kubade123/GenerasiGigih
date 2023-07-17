const { app, express } = require('./app');
const routes = require('./src/routes/routes');

app.use(express.json());
app.use('/', routes);


const port = 3000;
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})



