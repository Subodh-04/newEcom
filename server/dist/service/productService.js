"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const data_source_1 = require("../config/data-source");
const Product_1 = require("../entity/Product");
const productRepo = data_source_1.AppDataSource.getRepository(Product_1.Product);
exports.productService = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield productRepo.find();
    }),
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const product = productRepo.create(data);
        return yield productRepo.save(product);
    }),
    update: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield productRepo.findOneBy({ id });
        if (!product)
            return null;
        productRepo.merge(product, data);
        return yield productRepo.save(product);
    }),
    getbyId: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return productRepo.findOneBy({ id });
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return productRepo.delete({ id });
    })
};
