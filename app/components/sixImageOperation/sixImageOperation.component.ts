import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../pages/careCenter/careCenter.component';
import { AppServiceService } from '../../services/appService.service';
import { ResModel } from '../../models/resModel';

@Component({
  selector: 'app-sixImageOperation',
  templateUrl: './sixImageOperation.component.html',
  styleUrls: ['./sixImageOperation.component.scss']
})
export class SixImageOperationComponent implements OnInit {
  @Input() editable:boolean=false;
  @Input() id:string="default";
  @Output() refreshed= new EventEmitter<boolean>();
  public insertSixPhoto = "insertSixPhoto";
  public physicalPhotoList: Photo[] = [];
  public isActive: boolean = false;
  public _photoFile: File;
  public url: string = "";
  public _photo: Photo = new Photo();
  public isLoading: boolean = false;
  constructor(private service: AppServiceService) { }

  ngOnInit() {
    this.isLoading=true;
    this.getSixPhoto();
  }
  public getSixPhoto() {
    this.isLoading=true;
    this.service.postWithPostModel<ResModel<any>, any>("getSixPhoto", this.service.getCareCenterId())
      .subscribe(
        res => {
          console.log(res);
          this.physicalPhotoList = res.data;
          this.physicalPhotoList.forEach(e => {
            if (e.bm_foto) {
              if (e.bm_foto.length > 0)
                e.bm_foto = "data:image/png;base64," + e.bm_foto;
            }
            else
              e.bm_foto = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";

          });

          for (let index = this.physicalPhotoList.length; index < 6; index++) {
            let p = new Photo();
            p.foto_bmid = this.service.getCareCenterId();
            p.bm_foto = "http://omsenterprises.com/store/wp-content/uploads/2017/03/no-image-available.jpg";
            this.physicalPhotoList.push(p);

          }
          this.isLoading = false;

        },
        err => { console.log(err) }

      );
  }
  refresh() {
  
    this.getSixPhoto();
    this._photo = new Photo();
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
    this._photo = p;
    console.log("click");
    // if (this.isActive)
    //   this.refreshData.emit(true);
    this.isActive = !this.isActive;
    this.url = p.bm_foto;
  }
  onFileSelected(event) {
    console.log(event);
    this._photoFile = event.target.files[0];
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = reader.result.toString();
    }
    this.url = reader.result.toString();

  }
  save() {

    if (!this._photoFile)
      return;

    const fd = new FormData();
    fd.append('foto', this._photoFile);
    this.isLoading = true;
    if (this._photo.id) {
      fd.append("opName", "update");
      fd.append("id_bmid", this._photo.id.toString());
    }
    else {
      fd.append("opName", "insert");
      fd.append("id_bmid", this.service.getCareCenterId().toString());
    }
    this.service.post<any>(this.insertSixPhoto, fd, true).subscribe(
      res => { console.log(res); this.refreshAndClose(); },
      err => { console.log(err); this.refreshAndClose(); }
    );
  }
  delete() {
    if(confirm("Resmi Gerçekten Silmek İstediğinize Emin misiniz? ")) {
      if (!this._photo.id)
      return;
      this.isLoading=true;
    this.service.postWithPostModel<string, number>("deleteSixPhoto", this._photo.id)
      .subscribe(
        res => { console.log(res); this.refreshAndClose() },
        err => { console.log(err); this.refreshAndClose() }
      );
    }
    
  }
}
