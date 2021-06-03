import { Component, OnInit } from '@angular/core';
import {CollaborateurService} from '../../../../controller/service/collaborateur.service';
import {InterventionService} from '../../../../controller/service/intervention.service';
import {InterventionMembreEquipe} from '../../../../controller/model/intervention-membre-equipe.model';
import {Collaborateur} from '../../../../controller/model/collaborateur.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MembreEquipe} from '../../../../controller/model/membre-equipe.model';
import {Intervention} from '../../../../controller/model/intervention.model';
import {EquipesService} from '../../../../controller/service/equipes.service';
import {Equipe} from '../../../../controller/model/equipe.model';
import {MembreEquipeService} from '../../../../controller/service/membre-equipe.service';

@Component({
  selector: 'app-intervention-membre-equip',
  templateUrl: './intervention-membre-equip.component.html',
  styleUrls: ['./intervention-membre-equip.component.scss']
})
export class InterventionMembreEquipComponent implements OnInit {
  constructor( private serviceinterv: InterventionService, private service: EquipesService) { }


  get collaborateur(): InterventionMembreEquipe {
    return this.serviceinterv.collaborateur;
  }
  set collaborateur(valeur: InterventionMembreEquipe)  {
    this.serviceinterv.collaborateur = valeur;
  }
  get Membres(): Array<MembreEquipe> {
    return this.service.membres;
  }
  get MembresEquipe(): Array<InterventionMembreEquipe> {
    // console.log(    this.collaborateur.membreEquipe.equipe.ref )
    return this.serviceinterv.collaborateurs;
  }
  cols: any[];
  value: any;
  values: any;
  public edit(commande: InterventionMembreEquipe) {
    this.collaborateur = {...commande};
    this.editDialog = true;
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(data => this.equipes = data );
  }
  get Equipe(): Array<Equipe>{
    return this.service.equipes;
  }
  set equipes(value: Array<Equipe>) {
    this.service.equipes = value;
  }
  saveCollaboraateur() {
    this.serviceinterv.saveCollaboraateur();
    this.value = '---select value-----';
    this.values = '---select value-----';
  }
  get editDialog(): boolean {
    return this.serviceinterv.editDialog;
  }

  set editDialog(value: boolean) {
    this.serviceinterv.editDialog = value;
  }
  set membres(value: Array<MembreEquipe>) {
    this.service.membres = value;
  }
  isSelected($event: any) {
    this.collaborateur.membreEquipe.collaborateur.codeCollaborateur = $event.target.value;
  }
  get selectes(): Array<Intervention> {
    return this.serviceinterv.selectes;
  }

  set selectes(value: Array<Intervention>) {
    this.serviceinterv.selectes = value;
  }

  isEmpty() {
    return this.collaborateur.equipe.ref == null && this.collaborateur.membreEquipe.collaborateur.codeCollaborateur == null;
  }

  isSelecteds($event: any) {
    this.collaborateur.equipe.ref = $event.target.value;
    this.service.findByRef(this.collaborateur.equipe.ref).subscribe(data => {this.membres = data.membreEquipe ; console.log(data)});
  }

  selectEquip() {
    return this.collaborateur.equipe.ref == null;
  }
}
