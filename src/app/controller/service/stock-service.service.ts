import { Injectable } from "@angular/core";
import { Stock } from "../model/Stock.model";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class StockService {
  private _selected: Stock;
  private _items: Array<Stock>;
  private _stock: Stock;
  private _stocks: Array<Stock>;
  private urlBase = "http://localhost:8036";
  private url = "/Stock-api/Stockage";
  private _selectes: Array<Stock>;
  private _index: number;
  private _createDialog: boolean;
  private _editDialog: boolean;
  private _viewDialog: boolean;
  private _submitted: boolean;

  get stock(): Stock {
    if (this._stock == null) {
      this._stock = new Stock();
    }
    return this._stock;
  }

  set stock(value: Stock) {
    this._stock = value;
  }

  get selected(): Stock {
    if(this._selected==null){
      this._selected=new Stock();
    }
    return this._selected;
  }

  set selected(value: Stock) {
    this._selected = value;
  }

  set items(value: Array<Stock>) {
    this._items = value;
  }

  get items(): Array<Stock> {
    if (this._items == null) {
      this._items = new Array<Stock>();
    }
    return this._items;
  }

  get stocks(): Array<Stock> {
    if (this._stocks == null) {
      this._stocks = new Array<Stock>();
    }
    return this._stocks;
  }

  set stocks(value: Array<Stock>) {
    this._stocks = value;
  }
  constructor(private http: HttpClient) {}

  save() {
    if (this.stock.id == null) {
      this.http.post(this.urlBase + this.url + "/", this.stock).subscribe(
        (data) => {
          if (data === 1) {
            this.findAll();
          }
          if (data === -2) {
            alert("donner une valeur deja existante ");
          }
          if (data === 2) {
            this.findAll();
          }
        },
        (error) => alert("error 404")
      );
    } else {
      const stocke = new Stock();
      stocke.qte = this.stock.qte - this.stocks[this._index].qte;
      stocke.id = this.stock.id;
      stocke.material.reference = this.stock.material.reference;
      stocke.magasin.reference = this.stock.magasin.reference;
      this.http
        .post(this.urlBase + this.url + "/", stocke)
        .subscribe((data) => {
          console.log(data);
        });
      this.stocks[this._index] = this.clone(this.stock);
    }
    this.stock = null;
  }

  findAll() {
    this.http.get<Array<Stock>>(this.urlBase + this.url + "/").subscribe(
      (data) => {
        this.stocks = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clone(stock: Stock) {
    const myClone = new Stock();
    myClone.id = stock.id;
    myClone.material.reference = stock.material.reference;
    myClone.qte = stock.qte;
    myClone.magasin.reference = stock.magasin.reference;
    return myClone;
  }

  get createDialog(): boolean {
    return this._createDialog;
  }

  set createDialog(value: boolean) {
    this._createDialog = value;
  }

  get editDialog(): boolean {
    return this._editDialog;
  }

  set editDialog(value: boolean) {
    this._editDialog = value;
  }

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }

  get viewDialog(): boolean {
    return this._viewDialog;
  }

  set viewDialog(value: boolean) {
    this._viewDialog = value;
  }

  get selectes(): Array<Stock> {
    return this._selectes;
  }

  set selectes(value: Array<Stock>) {
    this._selectes = value;
  }
}
