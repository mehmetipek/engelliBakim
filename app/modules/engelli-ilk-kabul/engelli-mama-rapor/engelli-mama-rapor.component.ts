import { Component, OnInit, ViewChild } from '@angular/core';
import { DataOperations } from '../../../enums/DataOperations.enum';
import { AppServiceService } from '../../../services/appService.service';
import { ResModel } from '../../../models/resModel';
import { ImageOperationComponent } from '../../../components/imageOperation/imageOperation.component';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-engelli-mama-rapor',
  templateUrl: './engelli-mama-rapor.component.html',
  styleUrls: ['./engelli-mama-rapor.component.scss']
})
export class EngelliMamaRaporComponent implements OnInit {
  @ViewChild('engelliMamaRaporu') public engelliMamaRaporu: ModalDirective;
  @ViewChild('lisansMama') lisansMama: ImageOperationComponent;

  public _disabilityFood_operation:DataOperations;
  public _disabilityFood:FirstAcceptanceFoodReport=new FirstAcceptanceFoodReport();
  public _disabilityFoodList: FirstAcceptanceFoodReport[] = [];
  public ikid:number=-1;
  public disabilityMamaShowall:boolean=false;
  public _emr_rapor_foto: File;
  constructor(private service:AppServiceService) { }

  ngOnInit() {
  }
 //ENGELLİ MAMA RAPOR---------------------------------------
 newMamaReport() {
  if (this.ikid==-1) {
    alert("Lütfen Önce İlk Kayıdı Kaydediniz..");
    this.engelliMamaRaporu.hide();
    return;
  }
  else {
    this._disabilityFood= new FirstAcceptanceFoodReport();
    this._disabilityFood_operation = DataOperations.create;
    //this.lisansMama.photoSrc="";
  }
}
public getListFoodReport() {
  console.log("getListFoodReport=engelli id:"+this._disabilityFood.emr_ikid);

  this.service.postWithPostModel<ResModel<FirstAcceptanceFoodReport[]>, number>("getListFoodReport", this.ikid).subscribe(
    res => {
      console.log(res);
      this._disabilityFoodList = res.data;
    },
    err => {
      console.log(err);
    }
  );
}
public insertFirstAcceptanceFoodReport() {
  this._disabilityFood.emr_ikid = this.ikid;
  if (this._disabilityFood.id == null) {
    /*if (this._disabilityFoodList.find(f => f.raporaktif == true))
      return alert("Aktif Bez Kaydı Bulunmakta. Aktif Sadece 1 Tane Vasi Olabilir!");*/
    this._disabilityFood.raporaktif = true;
    this.service.postWithPostModel<ResModel<FirstAcceptanceFoodReport>, FirstAcceptanceFoodReport>("insertFoodReport", this._disabilityFood, true).subscribe(
      res => {
        console.log(res);
        this._disabilityFood=res.data;
      //  this.savePhoto_mama(this._disabilityFood.id);
        this.getListFoodReport();
      },
      err => {
        console.log(err);
      }
    );
  }
}

public updateDisabilityFood() {
  this._disabilityFood.emr_rapor_foto=null;
  this.service.postWithPostModel<ResModel<FirstAcceptanceFoodReport>, FirstAcceptanceFoodReport>("updateFoodReport", this._disabilityFood, true).subscribe(
    res => {
      console.log(res);
     // this.savePhoto_mama(this._disabilityFood.id);
      this.getListFoodReport();
    },
    err => {
      console.log(err);
    }
  );
}
verFood() {
  if (this._disabilityFood.emr_gun_kul_aded == "1x1") {
    this._disabilityFood.emr_aylik_kul_aded = "30";
  }

  if (this._disabilityFood.emr_gun_kul_aded == "1x2") {
    this._disabilityFood.emr_aylik_kul_aded = "60";
  }

  if (this._disabilityFood.emr_gun_kul_aded == "1x3") {
    this._disabilityFood.emr_aylik_kul_aded = "90";
  }

  if (this._disabilityFood.emr_gun_kul_aded == "1x4") {
    this._disabilityFood.emr_aylik_kul_aded = "120";
  }
}
public closeDisabilityFoodReport() {
  if (confirm("Kaydı Kapatmak İstediğinize Emin misiniz?"))
    this.service.postWithPostModel<ResModel<FirstAcceptanceFoodReport>, FirstAcceptanceFoodReport>("closeFoodReport", this._disabilityFood, true).subscribe(
      res => {
        console.log(res);
        this.getListFoodReport();
      },
      err => {
        console.log(err);
      }
    );
}

public addFood() {
  if (this._disabilityFood.id > 0){
    this.updateDisabilityFood();
    this.engelliMamaRaporu.hide();
  }
  else
    this.insertFirstAcceptanceFoodReport();
}

  public editFoodReport(food: FirstAcceptanceFoodReport, content) {
    this._disabilityFood= food;
    if(this._disabilityFood.emr_rap_tar)
    this._disabilityFood.emr_rap_tar = new Date(this._disabilityFood.emr_rap_tar);
    if(this._disabilityFood.emr_rap_gec_tar)
    this._disabilityFood.emr_rap_gec_tar = new Date(this._disabilityFood.emr_rap_gec_tar);
    //this.getPhoto_clothReport(cloth.id);

  }
  public closeFood() {
    if (this._disabilityFood.id > 0) {
      this.closeDisabilityFoodReport();
    }
  }
  //   public onFileSelected_mama(event) {
  //     if (event.target.files && event.target.files[0]) {
  //       this._emr_rapor_foto = event.target.files[0];
  //       var reader = new FileReader();
  //       reader.readAsDataURL(event.target.files[0]);
  //       reader.onload = (event) => {
  //         this._disabilityFood.emr_rapor_foto = reader.result.toString();
  //       }
  //     }
  //   }
  // savePhoto_mama(id) {
  //   if (!this._emr_rapor_foto)
  //     return;
  //   const fd = new FormData();
  //   fd.append('foto', this._emr_rapor_foto);
  //   fd.append("tableNick","mr");
  //   fd.append("id", id.toString());
  //   this.service.post<any>("ultimatePhoto", fd, true).subscribe(
  //     res => {
  //       console.log(res);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

}
//Engelli Mama Raporu 
export class FirstAcceptanceFoodReport{
  public id:number;
	public emr_ikid:number;
	public emr_rap_duz_kur:string;
	public emr_rap_tar:Date;
	public emr_rap_no:string;
	public emr_rap_gec_dur:string;
	public emr_rap_gec_tar:Date;
	public emr_gun_kul_aded:string;
	public emr_aylik_kul_aded:string;
  public emr_rapor_foto:any;
  public raporaktif:boolean;
  constructor(){
    this.emr_rap_gec_dur=null;
    this.emr_gun_kul_aded=null;
  }
}