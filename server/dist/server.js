"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./src/routes/route"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
mongoose_1.default.connect('mongodb://localhost:27017/RPCtests');
mongoose_1.default.Promise = global.Promise;
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const CorsOptions = {
    origin: 'http://localhost:1234',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(CorsOptions));
app.use(express_1.default.json());
app.use('/', route_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
