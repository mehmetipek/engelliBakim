import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Headers } from "@angular/http/src/headers";
import { ResponseContentType, ResponseType } from "@angular/http/index";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { PostModel } from '../../models/postModel';
import { AppServiceService } from '../../services/appService.service';

@Component({
  selector: 'app-pdfViewer',
  templateUrl: './pdfViewer.component.html',
  styleUrls: ['./pdfViewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  pdfSrc: string = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  inputDataFile: any;
  dataLocalUrl: any;
  @ViewChild('pdfViewer') pdfViewer;
  constructor(private domSanitizer: DomSanitizer, private http: HttpClient, private service: AppServiceService) { }
  ngOnInit() {

  }
  private downloadFile(url: string,data): any {
    let p: PostModel<number> = new PostModel<number>("");
    p.data = data;
    return this.http.post(url, p, { 'responseType': 'arraybuffer' as 'json' });
  }
  public getPdf(url: string, data) {
    this.downloadFile(this.service.url + url,data).subscribe(

      (res) => {
        console.log(res);
        let file = new Blob([res], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        // window.open(fileURL, "_blank");
        this.pdfViewer.pdfSrc = fileURL; // pdfSrc can be Blob or Uint8Array
        this.pdfViewer.refresh(); // Ask pdf viewer to load/reresh pdf
      }
    );
  }
  openNav() {
    document.getElementById("myNav").style.width = "100%";
  }

  /* Close when someone clicks on the "x" symbol inside the overlay */
  closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
  //somewhere is the code


  // public getConsultationDocumentPDF(): Observable<HttpResponse<Blob>> {
  //   let xheaders: HttpHeaders = new HttpHeaders();
  //   xheaders.append('Content-Type', 'application/json; charset=utf-8');
  //   let p:PostModel<number>=new PostModel<number>("");
  //   p.data=141;
  //   return this.http.post('http://localhost:8080/engellibakimv2/getReport',
  //     p,
  //     { observe: 'response', responseType: 'blob' }
  //   );


  // }

}
