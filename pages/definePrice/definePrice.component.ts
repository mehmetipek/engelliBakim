import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-definePrice',
  templateUrl: './definePrice.component.html',
  styleUrls: ['./definePrice.component.scss']
})
export class DefinePriceComponent implements OnInit {
  public _ucret_price: price = new price();
  public _tesvik_price: price = new price();
  public _ucret_ucret:string;
  public _tesvik_ucret:string;

  public _ucret_kdvTutar;
  public oran: number = 0.117961285;
  public kdv: number = 0.08;
  public sumPrice: string="0";
  public dailyPrice: string = "0";
  constructor() { }

  ngOnInit() {
  }
  public calc() {
    console.log("calc");
    //Ücret
    let katsayiOran: number = this._ucret_price.katsayi * this.oran;
    this._ucret_ucret=katsayiOran.toLocaleString('en-us', {minimumFractionDigits: 2})+" TL";
    this._ucret_price.kdv = (katsayiOran * 0.08).toLocaleString('tr', {maximumFractionDigits: 2}) + " TL";
    let tevkifat: number = (katsayiOran * 0.08) / 2;
    this._ucret_price.tevkifat = ((katsayiOran * 0.08) / 2).toLocaleString('tr', {maximumFractionDigits: 2})+ " TL";
    let tutar1 = katsayiOran + tevkifat;
    this._ucret_price.tutar=tutar1.toLocaleString('tr', {maximumFractionDigits: 2}) +" TL";
    //Teşvik
    katsayiOran = this._tesvik_price.katsayi * this.oran;
    this._tesvik_ucret=katsayiOran.toLocaleString('tr', {maximumFractionDigits: 2})+" TL";
    this._tesvik_price.kdv = (katsayiOran * 0.08).toLocaleString('tr', {maximumFractionDigits: 2}) + " TL";
    tevkifat = (katsayiOran * 0.08) / 2;
    this._tesvik_price.tevkifat = ((katsayiOran * 0.08) / 2).toLocaleString('tr', {maximumFractionDigits: 2})+ " TL";
    let tutar2 = katsayiOran + tevkifat;
    this._tesvik_price.tutar=tutar2.toLocaleString('tr', {maximumFractionDigits: 2}) +" TL";
    //Toplam
    this.sumPrice = (tutar1 + tutar2).toLocaleString('tr', {maximumFractionDigits: 2});
    this.dailyPrice =((tutar1 + tutar2)/ 30).toLocaleString('tr', {maximumFractionDigits: 2});
  }
}
export class price {
  public katsayi: number = 0;
  public oran: number;
  public kdv: string;
  public tevkifat: string;
  public tutar: string;
}