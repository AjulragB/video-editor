import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import dbConnect from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger('dev'));

//BODY-PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//VIEW ENGINE SETUP
app.set('view engine','ejs');
app.set("views",path.join(__dirname,"views"));

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/', userRoutes);

//DATABASE CONNECTION
dbConnect();


// ERROR HANDLER
app.use((err, req, res, next)=>{
    if (req.get('Origin')) {
      res.status(err.status || 500).json({
        error: {
          status: err.status || 500,
          message: err.message || 'internal server error',
        },
      });
    } else {
      res.render('common/500', {message: err.message});
  };
});

app.get('*', (req, res) => res.render('common/404'));


//SERVER CREATION
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
