import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/productos';
//import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  nameUser: any;
  products: any;
  isModalOpen = false;
  isModalOpenAdd = false;
  productSelected: any[] = [];
  idSelected: any;
  editProduct: boolean = false;
  nextId: number = 0;
  productAdd: any = {}; // Objeto para almacenar el nuevo producto
  editedProduct: any = {}; // Variable para almacenar el producto editado temporalmente
  originalProduct: any = {};



  constructor(private productService: ProductService) {

   }

  async ngOnInit() {

    this.nameUser = localStorage.getItem('usuario');
    //converitr a json
    this.nameUser = JSON.parse(this.nameUser);
     console.log(this.nameUser.nombre);
    this.nameUser = this.nameUser.nombre;
    // Crear productos solo si no existen
      if (!localStorage.getItem('productos')) {
        this.createProducts();
      }
      // Obtener productos
      this.getProducts();
  }
    createProducts() {
      let productos = [
        {
          id: 1,
          nombre: 'Camiseta Nike Air',
          precio: 59.99,
          descripcion: 'Camiseta deportiva Nike Air para hombres, disponible en varios colores y tallas.',
          img: 'https://www.innovasport.com/medias/playera-nike-air-is-DM6337-010-3.jpg?context=bWFzdGVyfGltYWdlc3w1MzA1OHxpbWFnZS9qcGVnfGltYWdlcy9oNmUvaDczLzEwNzk0Mzg5MzQwMTkwLmpwZ3xiNjYzYzQxZDA2ZjMwN2YxZTU1ODI0NzZlYzE0NzFmODIyMzEwNDgwMDczODQyOWFjMGViNzkyOTA1ZGM0MDYx',
          cantidad: 0,
        },
        {
          id: 2,
          nombre: 'Zapatillas Adidas Ultraboost',
          precio: 149.99,
          descripcion: 'Zapatillas de running Adidas Ultraboost con tecnología de amortiguación Boost, ideales para correr largas distancias.',
          img: 'https://dpjye2wk9gi5z.cloudfront.net/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/zoom/1026767-0015V1.jpg',
          cantidad: 0,
        },
        {
          id: 3,
          nombre: 'Smartphone Samsung Galaxy S20',
          precio: 799.99,
          descripcion: 'Smartphone Samsung Galaxy S20 con pantalla AMOLED de 6.2 pulgadas, cámara de 64MP y capacidad de grabación de video 8K.',
          img: 'https://m.media-amazon.com/images/I/61r9CrJ4I9L.jpg',
          cantidad: 0,
        },
        {
          id: 4,
          nombre: 'Portátil Apple MacBook Pro',
          precio: 1499.99,
          descripcion: 'Portátil Apple MacBook Pro con pantalla Retina de 13 pulgadas, procesador Intel Core i5 de décima generación y 8GB de RAM.',
          img: 'https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_16-inch-Screen_10182021_big_carousel.jpg.large.jpg',
          cantidad: 0,
        },
        {
          id: 5,
          nombre: 'Libro "El Alquimista" de Paulo Coelho',
          precio: 12.99,
          descripcion: 'Novela inspiracional que narra la historia de un joven pastor que busca su destino en un viaje por el desierto.',
          img: 'https://dcdn.mitiendanube.com/stores/002/284/028/products/alquimista-el-edicion-para-estudiantes-libro-paulo-coelho-fw1-4da0b7461e8f95212316639759656457-1024-1024.png',
          cantidad: 0,
        }
      ];
    localStorage.setItem('productos', JSON.stringify(productos));
  }
  toggleEdit() {
    this.editProduct = !this.editProduct;
  }

  getProducts() {
    this.products = this.productService.getProducts();
    console.log(this.products);
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpenAdd(isOpen: boolean) {
    this.isModalOpenAdd = isOpen;
  }

  cancelEdit() {
    // Restaurar los valores originales del producto
    this.editedProduct = { ...this.originalProduct };
    this.setOpen(false);
  }


   openDetails(product: any) {
    //busca el producto seleccionado con this.idSelected en el array de productos
    this.productSelected = this.products.filter((product: any) => product.id === this.idSelected);
    //regresa el producto seleccionado
    console.log(this.productSelected);

  }
  editProductSelected(product: any) {
    //edita el pdroducto y actualiza usando el servicio de product
    this.productService.updateProduct(product);
    //cerrar modal
    this.setOpen(false);
    //verifica si se actualizo si no se actualizo entonces deja los cambios anteriores

  }
  // Método para agregar un nuevo producto
  addNewProduct(product: any) {
    // Agregar el producto utilizando el servicio ProductService
    this.productService.addProduct(product);
    //get products
    this.getProducts();
    // Cerrar modal
    this.setOpenAdd(false);
  }

  // Método para eliminar un producto
  deleteProduct(id: number) {
    // Eliminar el producto utilizando el servicio ProductService
    this.productService.deleteProduct(id);
    // Obtener productos
    this.getProducts();
    // Cerrar modal
    this.setOpen(false);
  }

  getProductByIdSelected(id: number) {
   //abir modal
    this.setOpen(true);
    // Obtener el producto seleccionado
    this.productSelected = this.products.filter((product: any) => product.id === id);
    //regrsar el id seleccionado y imprimir en consola
    this.idSelected = id;
    console.log(this.idSelected);
    this.productSelected = this.products.filter((product: any) => product.id === this.idSelected);
    console.log(this.productSelected);
  }



}
