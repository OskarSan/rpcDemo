import express, {Express} from 'express';
import router from './src/routes/route';
import mongoose from 'mongoose';
import cors, {CorsOptions} from 'cors';




const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/RPCtests');
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const CorsOptions: CorsOptions = {
  origin: 'http://localhost:1234',
  optionsSuccessStatus: 200
};


app.use(cors(CorsOptions));
app.use(express.json());
app.use('/', router);




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});