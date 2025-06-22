"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./config/data-source");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
0;
data_source_1.AppDataSource.initialize().then(() => {
    console.log("Connected to DB ✅");
    app.use("/products", productRoutes_1.default);
    app.listen(port, () => {
        console.log(`🚀 Server running at http://localhost:${port}`);
    });
}).catch((err) => {
    console.error("❌ DB connection failed:", err);
});
