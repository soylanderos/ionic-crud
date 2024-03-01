import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsKey = 'productos';

  constructor() { }

  // Método para obtener todos los productos
  getProducts(): any[] {
    const productsJson = localStorage.getItem(this.productsKey);
    return productsJson ? JSON.parse(productsJson) : [];
  }

  // Método para agregar un nuevo producto
  addProduct(product: any) {
    const products = this.getProducts();
    products.push(product);
    localStorage.setItem(this.productsKey, JSON.stringify(products));
  }

  // Método para actualizar un producto existente
  updateProduct(updatedProduct: any) {
    const products = this.getProducts();
    const index = products.findIndex((product: any) => product.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      localStorage.setItem(this.productsKey, JSON.stringify(products));
    }
  }

  // Método para eliminar un producto
  deleteProduct(productId: number) {
    let products = this.getProducts();
    products = products.filter((product: any) => product.id !== productId);
    localStorage.setItem(this.productsKey, JSON.stringify(products));
  }
}
