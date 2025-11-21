// import { Injectable } from '@nestjs/common';
// import { ProductResponseDto } from './dto/product-response.dto';
// import { Product } from './entities/prtoducts.entity';

// @Injectable()
// export class ProductsRepository {
//   private Products: Product[] = [
//     {
//       id: 1,
//       name: 'Motorola 72g',
//       description: 'Motorola 16gb ram',
//       price: 100,
//       stock: 10,
//       imageUrl: 'Foto',
//     },
//     {
//       id: 2,
//       name: 'iPhone 14 Pro',
//       description: 'iPhone 14 Pro 128GB - Cámara triple',
//       price: 1200,
//       stock: 5,
//       imageUrl: 'Foto',
//     },
//     {
//       id: 3,
//       name: 'Samsung Galaxy S23',
//       description: 'Samsung S23 Ultra 256GB - Pantalla AMOLED',
//       price: 1100,
//       stock: 8,
//       imageUrl: 'Foto',
//     },
//     {
//       id: 4,
//       name: 'Xiaomi Redmi Note 12',
//       description: 'Xiaomi Redmi Note 12 - 8GB RAM 128GB',
//       price: 350,
//       stock: 15,
//       imageUrl: 'Foto',
//     },
//     {
//       id: 5,
//       name: 'Google Pixel 7',
//       description: 'Google Pixel 7 - 128GB, cámara inteligente',
//       price: 900,
//       stock: 7,
//       imageUrl: 'Foto',
//     },
//     {
//       id: 6,
//       name: 'OnePlus 11',
//       description: 'OnePlus 11 - 16GB RAM, 256GB Almacenamiento',
//       price: 950,
//       stock: 6,
//       imageUrl: 'Foto',
//     },
//     {
//       id: 7,
//       name: 'Sony Xperia 1 V',
//       description: 'Sony Xperia 1 V - 4K OLED, 12GB RAM',
//       price: 1300,
//       stock: 3,
//       imageUrl: 'Foto',
//     },
//   ];

//   getProducts(page = 1, limit = 5): ProductResponseDto[] {
//     const startIndex = (page - 1) * limit;
//     const endIndex = startIndex + limit;

//     const paginatedProducts = this.Products.slice(startIndex, endIndex);

//     return paginatedProducts.map((product) => {
//       //tengo que crear el categori porque me lo estaba pidiendo
//       return product;
//     });
//   }

//   getProductById(id: number) {
//     const product = this.Products.find((product) => product.id === id);
//     return product;
//   }

//   deleteProduct(id: number) {
//     const index = this.Products.findIndex((product) => product.id === id);
//     if (index === -1) return null;
//     const deleted = this.Products[index];
//     this.Products.splice(index, 1);
//     return deleted;
//   }

//   updateProduct(id: number, updatedData: Partial<Product>) {
//     const productIndex = this.Products.findIndex(
//       (product) => product.id === id,
//     );
//     if (productIndex === -1) return null;
//     this.Products[productIndex] = {
//       ...this.Products[productIndex],
//       ...updatedData,
//     };
//     return this.Products[productIndex];
//   }

//   createProduct(product: Product) {
//     const newId =
//       this.Products.length > 0
//         ? Math.max(...this.Products.map((u) => u.id)) + 1
//         : 1;
//     const newProduct = { ...product, id: newId };
//     this.Products.push(newProduct);
//     return {
//       createProduct: newProduct,
//     };
//   }
// }
