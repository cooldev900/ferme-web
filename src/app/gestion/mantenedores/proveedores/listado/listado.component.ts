import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTable } from '@angular/material';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { Proveedor } from 'src/modelo/Proveedor';
import { ListadoGestionComponent } from 'src/app/gestion/compartido/listado/listado.component';

@Component({
  selector: 'app-proveedores-listado',
  templateUrl: './listado.component.html',
  styleUrls: [
    '../../../compartido/formularios.css',
    './listado.component.css'
  ]
})
export class ProveedoresListadoComponent extends ListadoGestionComponent implements OnInit {

  @Output() public editar: EventEmitter<Proveedor>;
  @Output() public borrar: EventEmitter<Proveedor>;

  @ViewChild("tabla") public tabla: MatTable<Proveedor>;
  protected _items: Proveedor[];
  protected _itemsSource: BehaviorSubject<Proveedor[]>;
  public items$: Observable<Proveedor[]>;

  constructor(

  ) { 
    super();
    this.editar = new EventEmitter<Proveedor>();
    this.borrar = new EventEmitter<Proveedor>();

    this._itemsSource = new BehaviorSubject<Proveedor[]>([]);
    this.items$ = this._itemsSource.asObservable();

    this.displayedColumns = [ "nombre", "rut", "acciones" ];
  }

  ngOnInit() {
    this.tabla.dataSource = this.items$;
  }

  public onClickVer(prov: Proveedor) {
    this.editar.emit(prov);
  }

  public onClickBorrar(prov: Proveedor) {
    this.borrar.emit(prov);
  }

  @Input() public set Items(proveedores: Proveedor[]) {
    this._itemsSource.next(proveedores);
  }
}