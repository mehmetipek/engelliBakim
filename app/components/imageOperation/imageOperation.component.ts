import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { AppServiceService } from '../../services/appService.service';
import { ResModel } from '../../models/resModel';
import { Photo } from '../../pages/careCenter/careCenter.component';

@Component({
  selector: 'app-imageOperation',
  templateUrl: './imageOperation.component.html',
  styleUrls: ['./imageOperation.component.scss']
})
export class ImageOperationComponent implements OnInit {
  // Description
  //*this component used by carecanter -> açılıs İzin formu

  @Input() editable: boolean = false;
  @Output() refreshed = new EventEmitter<boolean>();
  @Input() tableNick: string = "";

  public photoSrc: string = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";
 
  public isActive: boolean = false;
  public _photoFile: File;


  public isLoading: boolean = false;
  public loadingURL = this.service.defaultLoadingGif;

  public layzSave: boolean = false;
  constructor(private service: AppServiceService) { }

  ngOnInit() {

    // if (this.getUrl)
    //   this.getPhoto();
    //this.refresh();

  }
  clearAll(){
    console.log("clearAll()");
    this.photoSrc=this.service.defaultImage;
    this._photoFile=null;
    this.layzSave=false;
  }

  private _id: number;
  public get id(): number {
    return this._id;
  }
  @Input()
  public set id(v: number) {
    console.log(v);
    this._id = v;
    if (this.layzSave == true && this._id) {
      console.log("lazySave()");
      this.save();
    }


    if (!v) {
    this.clearAll();
    
  }
    else
      this.refresh();

  }
  getPhotoURL(): string {
    return this.service.url + "getPhotocnm/" + this.tableNick + "/" + this.id + "?v=" + (this.service.image_tick++)
  }
  onImageLoad() {
    // Do what you need in here
    this.isLoading = false;
  }
  refresh() {

    //this.getPhoto();
    // this.getPhotoWithPost(this.id);
    if (!this.id)
      return;
    this.isLoading = true;
    this.photoSrc = this.getPhotoURL();
    console.log(this.photoSrc);

  }
  refreshAndClose() {
    this.refresh();
    this._photoFile = null;
    this.isActive = false;
    this.refreshed.emit(true);
  }
  close() {
    this.isActive = false;
    this._photoFile = null;
  }
  click(p: Photo) {
    
    console.log("click");
    // if (this.isActive)
    //   this.refreshData.emit(true);
    this.isActive = !this.isActive;

  }
  onFileSelected(event) {
    
    console.log(event);
    this._photoFile = event.target.files[0];
    var reader = new FileReader();

    let a=reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.photoSrc = reader.result.toString();
    }
    this.photoSrc = reader.result.toString();

  }
  save() {
    if (!this._photoFile)
      return;
    if (!this._id) {
      this.layzSave = true;
      this.isActive = false;
      return;
    }
    this.isLoading = true;
    const fd = new FormData();
    fd.append('foto', this._photoFile);

    fd.append("tableNick", this.tableNick);
    fd.append("id", this.id.toString());

    this.service.post<any>("/ultimatePhoto", fd, true).subscribe(
      res => { console.log(res); this.refreshAndClose(); },
      err => { console.log(err); this.refreshAndClose(); }
    );
  }

  delete() {
    if (!this.id || !this.tableNick)
    return this.clearAll();
      if (confirm("Resmi Silmek İstediğinize Emin misiniz? ")) {
        this.isLoading = true;
        const fd = new FormData();
        fd.append("tableNick", this.tableNick);
        fd.append("id", this.id.toString());

        this.service.post<any>("ultimatePhotoDelete", fd, true).subscribe(
          res => { console.log(res); this.refreshAndClose(); },
          err => { console.log(err); this.refreshAndClose(); }
        );
      }
  }
}

