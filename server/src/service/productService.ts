import { AppDataSource } from "../config/data-source";
import { Product } from "../entity/Product";


const productRepo=AppDataSource.getRepository(Product);

export const productService={
    getAll:async()=>{
        return await productRepo.find();
    },
    create:async(data:Omit<Product, 'id'>)=>{
        const product = productRepo.create(data);
        return await productRepo.save(product);
    },
    update:async(id:number,data:Partial<Product>)=>{
        const product=await productRepo.findOneBy({id});
        if(!product) return null;
        productRepo.merge(product,data);
        return await productRepo.save(product);
    },
    getbyId:async(id:number)=>{
        return productRepo.findOneBy({id});
    },
    delete:async(id:number)=>{
        return productRepo.delete({id})
    }
};