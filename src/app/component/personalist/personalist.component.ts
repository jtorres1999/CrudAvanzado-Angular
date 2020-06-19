import { Component, OnInit } from '@angular/core';
import { Persona } from '../../modelo/persona';
import { PersonaService } from '../../servicios/persona.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-personalist',
  templateUrl: './personalist.component.html',
  styleUrls: ['./personalist.component.css']
})
export class PersonalistComponent implements OnInit {

  personaList: Persona[];

  buscar: string;

  constructor(private personaService: PersonaService) { }

  ngOnInit() {
    this.MostrarPersonas();
  }



  MostrarPersonas() {
    this.personaService.getPersona().snapshotChanges().subscribe(item => {
      this.personaList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$keyRegistro"] = element.key;
        this.personaList.push(x as Persona);
      });
    });
  }

  consulPersona() {

    this.personaService.getPersona().snapshotChanges().subscribe(item => {
      this.personaList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$keyRegistro"] = element.key;
        this.personaList.push(x as Persona);
      });


      this.personaList = this.personaList.filter(data => {
        return data.num_identificacion.toString().trim() === this.buscar;
      })

      if (this.personaList.length === 0) {

        this.MostrarPersonas();

        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'No Encontramos su Busqueda',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Dato encontrado!',
          showConfirmButton: false,
          timer: 1500
        })
      }

    });

  }



  onEdit(persona: Persona) {
    this.personaService.selectedPersona = persona;
  }


  onDelete($key: string) {
    this.personaService.deletePersona($key);
  }


}
