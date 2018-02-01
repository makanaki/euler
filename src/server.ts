import {Index} from "./controllers/Index";

let express = require('express');
let path = require('path');

let app = express();
let router = express.Router();
let exphbs  = require('express-handlebars');
let morgan = require('morgan')
const bodyParser = require('body-parser');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(morgan('dev'));
app.use(router);
app.use(express.static(path.join(__dirname, 'public')));

router.get('/:num?', bodyParser.urlencoded({extended: false}), Index.problems());

app.listen(3000);
module.exports = app;
