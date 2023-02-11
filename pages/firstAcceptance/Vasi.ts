// Vasi Model
export class Vasi {
  public id: number;
  public vasi_ikid: number;
  public vasi_bmid: number;
  public vasitc: string;
  public vasiadi: string;
  public vasisoyadi: string;
  public vasiil: string;
  public vasiilce: string;
  public adres: string;
  public telefon: string;
  public gsm: string;
  public mahkemeadi: string;
  public karartarihi: Date;
  public kararnumarasi: string;
  public gecerlilikdurumu: string;
  public gecerliliktarihi: Date;
  public aktif: boolean;
  public vasikapkayittar: Date;
  public vasiuser_id: number;
  public vasidatetime: Date;
  public updatedate: Date;
  public image:string;
  constructor(){
    this.gecerlilikdurumu=null;
    this.vasiil=null;
    this.vasiilce=null;
  }
}