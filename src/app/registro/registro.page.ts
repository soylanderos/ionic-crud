import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
//importar herramientas
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})


export class RegistroPage implements OnInit {

  registroForm: FormGroup;
  isAlertOpen = false;
  alertButtons = ['Action'];

  constructor(public fb:FormBuilder, private alertController: AlertController, private router: Router) {

    this.registroForm = this.fb.group({
      'nombre': new FormControl('', Validators.required),
      'conpass': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    })

   }

    async ngOnInit() {
      await console.log('Hola');

  }

  async registrar() {
   var f = this.registroForm.value;
    console.log(f);
    var usuario = {
      nombre: f.nombre,
      password: f.password

    }
      //guardar en el localstorage
      localStorage.setItem('usuario', JSON.stringify(usuario));

      //alert
      const alert = await this.alertController.create({
        header: 'Usuario registrado',
        subHeader: 'Bienvenido',
        message: 'Usuario registrado correctamente.',
        buttons: ['Aceptar'],
      });
      await alert.present();

      this.router.navigate(['/login']);

     //Validar que las contraseñas sean iguales
    if (f.password != f.conpass) {
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Las contraseñas no coinciden',
        message: 'Por favor, verifica que las contraseñas sean iguales.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    //validar que los campos esten completos
    if (f.nombre == '' || f.password == '' || f.conpass == '') {
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Campos vacios',
        message: 'Por favor, verifica que los campos esten completos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }





}

