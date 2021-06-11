import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Equipe } from 'src/app/controller/model/equipe.model';
import { EquipesService } from 'src/app/controller/service/equipes.service';

@Component({
  selector: 'app-equipe-list',
  templateUrl: './equipe-list.component.html',
  styleUrls: ['./equipe-list.component.scss']
})
export class EquipeListComponent implements OnInit {
  cols: any[];
  constructor(private messageService: MessageService, private confirmationService: ConfirmationService,
    private service: EquipesService) { }
    ngOnInit(): void {
      this.initCol();
      this.service.findAll().subscribe(data => this.equipes = data);
  }

  public delete(selectedEquipe: Equipe) {
      this.selectedEquipe = selectedEquipe;
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + selectedEquipe.ref + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.service.deleteByRef().subscribe(data => {
                  this.equipes = this.equipes.filter(val => val.id !== this.selectedEquipe.id);
                  this.selectedEquipe = new Equipe();
                  this.messageService.add({
                      severity: 'success',
                      summary: 'Successful',
                      detail: 'Equipe Deleted',
                      life: 3000
                  });
              });
          }
      });
  }
  public deleteMultiple() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selectedEquipe Equipes?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.service.deleteMultipleByRef().subscribe(data =>{
                  this.service.deleteMultipleIndexById();
                  this.selectesEquipe = null;
                  this.messageService.add({
                      severity: 'success',
                      summary: 'Successful',
                      detail: 'Equipes Deleted',
                      life: 3000
                  });
              });
          }
      });
  }
  public openCreate() {
      this.selectedEquipe = new Equipe();
      this.submitted = false;
      this.createDialog = true;
  }

  public edit(Equipe: Equipe) {
      this.selectedEquipe = {...Equipe};
      this.editDialog = true;
  }
  public view(Equipe: Equipe) {
      this.selectedEquipe = {...Equipe};
      this.viewDialog = true;
  }

  private initCol() {
      this.cols = [
          
          {field: 'ref', header: 'Reference'},
          {field: 'libelle', header: 'Total'},
        
      ];
  }

  get selectedEquipe(): Equipe {
      return this.service.selectedEquipe;
  }

  set selectedEquipe(value: Equipe) {
      this.service.selectedEquipe = value;
  }

  get equipes(): Array<Equipe> {
      return this.service.equipes;
  }

  set equipes(value: Array<Equipe>) {
      this.service.equipes = value;
  }

  get submitted(): boolean {
      return this.service.submitted;
  }

  set submitted(value: boolean) {
      this.service.submitted = value;
  }

  get createDialog(): boolean {
      return this.service.createDialog;
  }

  set createDialog(value: boolean) {
      this.service.createDialog = value;
  }

  get editDialog(): boolean {
      return this.service.editDialog;
  }

  set editDialog(value: boolean) {
      this.service.editDialog = value;
  }

  get viewDialog(): boolean {
      return this.service.viewDialog;
  }

  set viewDialog(value: boolean) {
      this.service.viewDialog = value;
  }

    get selectesEquipe(): Array<Equipe> {
        return this.service.selectesEquipe;
    }

    set selectesEquipe(value: Array<Equipe>) {
        this.service.selectesEquipe = value;
    }


}
