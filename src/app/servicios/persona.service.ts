import { Injectable } from '@angular/core';
import { Persona } from '../modelo/persona';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  selectedPersona: Persona = new Persona();
  personaList: AngularFireList<any>;


  constructor(private firebase: AngularFireDatabase) { }

  getPersona() {
    return this.personaList = this.firebase.list('persona');
  }


  insertPersona(persona: Persona) {

    this.personaList.push({
      num_identificacion: persona.num_identificacion,
      nombre: persona.nombre,
      apellido: persona.apellido,
      telefono: persona.telefono,
      direccion: persona.direccion
    });
  }

  updatePersona(persona: Persona) {
    this.personaList.update(persona.$keyRegistro, {
      num_identificacion: persona.num_identificacion,
      nombre: persona.nombre,
      apellido: persona.apellido,
      telefono: persona.telefono,
      direccion: persona.direccion
    });
  }

  deletePersona($keyRegistro: string) {
    this.personaList.remove($keyRegistro);
  }


}
