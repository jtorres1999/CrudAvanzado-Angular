import { Component, OnInit } from '@angular/core';
import { Persona } from '../../modelo/persona';
import { PersonaService } from '../../servicios/persona.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personaList: Persona[];

  constructor(private personaService: PersonaService) { }

  ngOnInit() {
  }

  onSubmit(personaForm: NgForm) {

    this.personaService.getPersona();

    if (personaForm.value.$keyRegistro == null) {
      this.personaService.insertPersona(personaForm.value);
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Creado con exito!',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      this.personaService.updatePersona(personaForm.value);
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Modificado con exito!',
        showConfirmButton: false,
        timer: 1500
      })

    }

  }



}
