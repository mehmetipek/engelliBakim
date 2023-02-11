import { Component, OnInit } from "@angular/core";
import { AppServiceService } from "../../../services/appService.service";
import { ResModel } from "../../../models/resModel";
import { City } from "../../../models/CityCounty";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Label } from "ng2-charts";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { BsLocaleService } from "ngx-bootstrap";

declare const require: any;
@Component({
  selector: "app-istatistikler",
  templateUrl: "./istatistikler.component.html",
  styleUrls: ["./istatistikler.component.scss"]
})
export class IstatistiklerComponent implements OnInit {
  public cityList: City[];
  public pieChartLegend = true;
  public firstGster:boolean=true;
  /**Engelli Grafik */
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public genelFilterFirst: string = "null";
  public grafFirst:string="null";
  /**Personel Grafik */
  public pieChartLabelsPer: string[] = [];
  public pieChartDataPer: number[] = [];
  public genelFilterPer: string = "null";
  public grafPer:string="null";
  /**Bakım Merkezi Grafik */
  public pieChartLabelsBm: string[] = [];
  public pieChartDataBm: number[] = [];
  public genelFilterBm: string = "null";
  public grafBm:string="null";

  public pieChartType = "pie";
  public barChartType = "bar";
  public barChartPlugins = [pluginDataLabels];
  
/*---------------------------------------*/
  //Bakım Merkezi
  public barChartLabelsBm: Label[] = [];
  public barChartDataBm: barChartDataModel[] = [{ data: [], label: ""}];
  public filterBm: StaticModelPost = new StaticModelPost();
  //Engelli
  public barChartLabelsFirst: Label[] = [];
  public barChartDataFirst: barChartDataModel[] = [{ data: [], label: ""}];
  public filterFirst: StaticModelPost = new StaticModelPost();
  //Personel
  public barChartLabelsPer: Label[] = [];
  public barChartDataPer: barChartDataModel[] = [{ data: [], label: ""}];
  public filterPer: StaticModelPost = new StaticModelPost();

  public donutColors = [
    {
      backgroundColor: [
        "rgba(244,164,96)",
        "rgba(0,255,255)",
        "rgba(255,48,48)",
        "rgba(255,228,19)",
        "rgba(74,112,139)",
        "rgba(0,191,255)",
        "rgba(205,91,69)",
        "rgba(28,96,113)",
        "rgba(255,222,102)",
        "rgba(139,123,139)"
      ]
    }
  ];
  colors = [
    { // 1st Year.
      backgroundColor: "rgba(244,164,96)"
    },
    { // 2nd Year.
      backgroundColor: "rgba(0,255,255)"
    },
    { // 3nd Year.
      backgroundColor: "rgba(255,48,48)"
    },
    { // 4nd Year.
      backgroundColor: "rgba(255,228,19)"
    },
    { // 5nd Year.
      backgroundColor: "rgba(74,112,139)"
    },
    { // 6nd Year.
      backgroundColor: "rgba(0,191,255)"
    },
    { // 7nd Year.
      backgroundColor: "rgba(205,91,69)"
    },
    { // 8nd Year.
      backgroundColor: "rgba(28,96,113)"
    },
    { // 9nd Year.
      backgroundColor: "rgba(255,222,102)"
    },
    { // 10nd Year.
      backgroundColor: "rgba(139,123,139)"
    }
  ]
  /**************************PASTA ÖZELLİKLERİ */
  //Engelli ChartOptionS
  public pieChartOptionsFirst: ChartOptions = {
    legend:{
      position:'bottom',
      labels: {
        fontSize: 20
      }
    },
    responsive: true,
    plugins: {
      datalabels: {
        anchor: 'end',
        align:'start',
        color: '#000000',
        borderWidth:2,
        borderRadius: 4,
        backgroundColor: '#FAEBD7',
        borderColor: '#223388',
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = this.pieChartData;
          dataArr.map(data => {
              sum += data;
          });
          let percentage = (value*100 / sum).toFixed(2)+"%";
          return percentage;
      },
      },
    }
  };
  public pieChartPlugins = [{
    afterLayout: function (chart) {
      chart.legend.legendItems.forEach(
        (label) => {
          let value = chart.data.datasets[0].data[label.index];
          label.text += ' :' + value;
          return label;
        }
      )
    }
  }];
  //Personel ChartsOptions
  public pieChartOptionsPer: ChartOptions = {
    legend:{
      position:'bottom',
      labels: {
        fontSize: 20
      }
    },
    responsive: true,
    plugins: {
      datalabels: {
        anchor: 'end',
        align:'start',
        color: '#000000',
        borderWidth:2,
        borderRadius: 4,
        backgroundColor: '#FAEBD7',
        borderColor: '#223388',
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = this.pieChartDataPer;
          dataArr.map(data => {
              sum += data;
          });
          let percentage = (value*100 / sum).toFixed(2)+"%";
          return percentage;
      },
      },
    }
  };
  //Bakım Merkezi ChartsOptions
  public pieChartOptionsBm: ChartOptions = {
    legend:{
      position:'bottom',
      labels: {
        fontSize: 20
      }
    },
    responsive: true,
    plugins: {
      datalabels: {
        anchor: 'end',
        align:'start',
        color: '#000000',
        borderWidth:2,
        borderRadius: 4,
        backgroundColor: '#FAEBD7',
        borderColor: '#223388',
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = this.pieChartDataBm;
          dataArr.map(data => {
              sum += data;
          });
          let percentage = (value*100 / sum).toFixed(2)+"%";
          return percentage;
      },
      },
    }
  };
  /**--------------------BAR CHARTS ÖZELLİKLERİ-------------------------- */
  public barChartOptions: ChartOptions = {
    //scaleShowVerticalLines: false,
    responsive: true,
    legend:{  
      position:'bottom',
      labels: {
        fontSize: 20
      }
    },
    scales: { xAxes: [{
      scaleLabel: {
        display: true,
        //labelString: 'KAT SAYISINA GÖRE',
      }
    }],yAxes: [{ ticks: { stepSize: 5,display: true, beginAtZero: true } }]  },
    plugins: {
      datalabels: {
        display:true,
        //anchor: 'end',
        //align: 'end',
        color:'#000000',
        font:{
          size:20
        }
      }
    }
  };
  constructor(private service: AppServiceService,private localeService: BsLocaleService) {this.localeService.use("tr");}
  
  ngOnInit() {
    this.getCity();
  }
  filterChange(event) {
    console.log(event);
  }
  //Engelli List
  getDataByFilterFirstBar() {
    if(this.genelFilterFirst=="1"){
      this.filterFirst.bolgeid=0;
      this.filterFirst.iladi=null;
    }
    this.service
      .postWithPostModel<ResModel<any>, StaticModelPost>(
        "getDisabledSta",
        this.filterFirst
      )
      .subscribe(
        res => {
          console.log(res);
          console.log("getDisabledSta");
          this.setDataFirst(res.data);
        },
        err => {
          console.log(err);
        }
      );
  }
  //Personel List
  getDataByFilterPerBar() {
    if(this.genelFilterPer=="1"){
      this.filterPer.bolgeid=0;
      this.filterPer.iladi=null;
    }
    this.service
      .postWithPostModel<ResModel<any>, StaticModelPost>(
        "getDisabledSta",
        this.filterPer
      )
      .subscribe(
        res => {
          console.log(res);
          console.log("getDisabledSta");
          this.setDataPer(res.data);
        },
        err => {
          console.log(err);
        }
      );
  }
  //Bakım Merkezi Filitre
  getDataByFilterBmBar() {
    if(this.genelFilterBm=="1"){
      this.filterBm.bolgeid=0;
      this.filterBm.iladi=null;
    }
    this.service
      .postWithPostModel<ResModel<any>, StaticModelPost>(
        "getDisabledSta",
        this.filterBm
      )
      .subscribe(
        res => {
          console.log(res);
          console.log("getDisabledSta");
          this.setDataBm(res.data);
        },
        err => {
          console.log(err);
        }
      );
  }
  /********************************************** */
  //Engelli
  setDataFirst(data: IstatisticModel[]) {
    this.barChartDataFirst=[];
    this.barChartLabelsFirst=[];
    data.forEach(e => {
      this.barChartLabelsFirst.push(e.settlement);
      e.model.forEach(x => {
        if(this.barChartDataFirst.find(y=>y.label==x.key))
        this.barChartDataFirst.find(y=>y.label==x.key).data.push(x.value);
        else 
        {
          let d:barChartDataModel=new barChartDataModel();
          d.data=[x.value];
          d.label=x.key;
          this.barChartDataFirst.push(d);
        }
      });
    });
  }
  //Personel
  setDataPer(data: IstatisticModel[]) {
    this.barChartDataPer=[];
    this.barChartLabelsPer=[];
    data.forEach(e => {
      this.barChartLabelsPer.push(e.settlement);
      e.model.forEach(x => {
        if(this.barChartDataPer.find(y=>y.label==x.key))
        this.barChartDataPer.find(y=>y.label==x.key).data.push(x.value);
        else 
        {
          let d:barChartDataModel=new barChartDataModel();
          d.data=[x.value];
          d.label=x.key;
          this.barChartDataPer.push(d);
        }
      });
    });
  }
  //Bakım Merkezi
  setDataBm(data: IstatisticModel[]) {
    this.barChartDataBm=[];
    this.barChartLabelsBm=[];
    data.forEach(e => {
      this.barChartLabelsBm.push(e.settlement);
      e.model.forEach(x => {
        if(this.barChartDataBm.find(y=>y.label==x.key))
        this.barChartDataBm.find(y=>y.label==x.key).data.push(x.value);
        else 
        {
          let d:barChartDataModel=new barChartDataModel();
          d.data=[x.value];
          d.label=x.key;
          this.barChartDataBm.push(d);
        }
      });
    });
  }
  /******************************************PASTA */
  getDataByFilterType() {
    this.service.postWithPostModel<ResModel<any>, StaticModelPost>("getDisabledStaPie", this.filterFirst).subscribe(
      res => {
        console.log(res);
        console.log("getDisabledStaPie");
        this.pieChartLabels = res.data.key;
        setTimeout(() => {
          this.pieChartData = res.data.value;
        }, 50);
      },
      err => {
        console.log(err);
      }
    );
  }
  getDataByFilterTypePer() {
    this.service.postWithPostModel<ResModel<any>, StaticModelPost>("getDisabledStaPie", this.filterPer).subscribe(
      res => {
        console.log(res);
        console.log("getDisabledStaPie");
        this.pieChartLabelsPer = res.data.key;
        setTimeout(() => {
          this.pieChartDataPer = res.data.value;
        }, 50);
      },
      err => {
        console.log(err);
      }
    );
  }
  searchBtnCareCenter() {
    if (this.genelFilterBm == "1") {
      this.filterBm.bolgeid = 0;
      this.filterBm.iladi=null;
    }
    this.service.postWithPostModel<ResModel<any>, StaticModelPost>("getDisabledStaPie", this.filterBm,true).subscribe(
      res => {
        console.log(res);
        this.pieChartLabelsBm= res.data.key;
        if(res.data.key==null)
        this.pieChartLabelsBm=["Bakım Merkezi Sayısı"];
        setTimeout(() => {
           this.pieChartDataBm = res.data.value;
         }, 50);
      },
      err => {
        console.log(err);
      }
    );
  }
  public getCity() {
    this.cityList = this.service.getCityList();
  }
  perBtnCare(){
    if(this.genelFilterPer=="null" || this.filterPer.kolonadi=="null"){
      alert("Parametre Seçmeden İşlem yapamazsınız.");
    }
    else{
    this.firstGster=false;
    if(this.filterPer.kolonadi=="percinsiyet"){
      this.filterPer.secilenid=7;
    }
    if(this.filterPer.kolonadi=="permedenihali"){
      this.filterPer.secilenid=15;
    }
    if(this.filterPer.kolonadi=="perehliyet"){
      this.filterPer.secilenid=24;
    }
    if(this.filterPer.kolonadi=="permeslek"){
      this.filterPer.secilenid=25;
    }
    if(this.filterPer.kolonadi=="perkadro"){
      this.filterPer.secilenid=26;
    }
    if(this.filterPer.kolonadi=="perogrenimdurumu"){
      this.filterPer.secilenid=14;
    }
    this.getDataByFilterPerBar();
    this.getDataByFilterTypePer();
    } 
  }
  firstBtnCare(){
    if(this.genelFilterFirst=="null" || this.filterFirst.kolonadi=="null"){
      alert("Parametre Seçmeden İşlem yapamazsınız.");
    }
    else{
    this.firstGster=false;
    if(this.filterFirst.kolonadi=="ikuyruk"){
      this.filterFirst.secilenid=6;
    }
    if(this.filterFirst.kolonadi=="ikcinsiyet"){
      this.filterFirst.secilenid=7;
    }
    if(this.filterFirst.kolonadi=="ikkangrubu"){
      this.filterFirst.secilenid=13;
    }
    if(this.filterFirst.kolonadi=="ikogrenimdurumu"){
      this.filterFirst.secilenid=14;
    }
    if(this.filterFirst.kolonadi=="ikmedenihali"){
      this.filterFirst.secilenid=15;
    }
    if(this.filterFirst.kolonadi=="ikbeden"){
      this.filterFirst.secilenid=16;
    }
    if(this.filterFirst.kolonadi=="iksosyalguvdurumu"){
      this.filterFirst.secilenid=17;
    }
    if(this.filterFirst.kolonadi=="ikayakkabino"){
      this.filterFirst.secilenid=18; 
    }
    if(this.filterFirst.kolonadi=="iksigarakul"){
      this.filterFirst.secilenid=19;
    }
    if(this.filterFirst.kolonadi=="ikmaasdurumu"){
      this.filterFirst.secilenid=20;
    }
    if(this.filterFirst.kolonadi=="ikucretikarsilayan"){
      this.filterFirst.secilenid=21;
    }
    if(this.filterFirst.kolonadi=="ikozannedurumu"){
      this.filterFirst.secilenid=22;
    }
    if(this.filterFirst.kolonadi=="ikozbabadurumu"){
      this.filterFirst.secilenid=22;
    }
    this.getDataByFilterFirstBar();
    this.getDataByFilterType();
    }
  }
  bmBtnCare(){
    if(this.genelFilterBm=="null" || this.filterBm.kolonadi=="null"){
      alert("Parametre Seçmeden İşlem yapamazsınız.");
    }
    else{
    this.firstGster=false;
    if(this.filterBm.kolonadi=="bmegkpst"){
      this.filterBm.secilenid=1;
    }
    if(this.filterBm.kolonadi=="bmegengelgrubu"){
      this.filterBm.secilenid=1;
    }
    if(this.filterBm.kolonadi=="bmegkpst"){
      this.filterBm.secilenid=1;
    }
    if(this.filterBm.kolonadi=="bm_binasahipdur"){
      this.filterBm.secilenid=4;
    }
    if(this.filterBm.kolonadi=="bm_katsayisi"){
      this.filterBm.secilenid=5;
    }
    if(this.filterBm.kolonadi=="bmasansorrenk"){
      this.filterBm.secilenid=8;
    }
    if(this.filterBm.kolonadi=="bm_jeneratorguc"){
      this.filterBm.secilenid=9;
    }
    if(this.filterBm.kolonadi=="bm_sdkapasite"){
      this.filterBm.secilenid=10;
    }
    //Dolu boş yatak ve kurucu müdür istatisliği id si backend yapınca yapılacak
    /*
    if(this.filterBm.kolonadi=="bmid"){
      this.filterBm.secilenid=1;
    }*/
    
    this.searchBtnCareCenter();
    this.getDataByFilterBmBar();
  }
  }
  //Temizleme İşlemlerinin yapıldığı fonksiyon...
  cleanSystems(){
  if(this.filterBm.kolonadi!=null){
    this.filterBm.kolonadi=null;
    this.filterBm.bolgeid=0;
    this.filterBm.iladi=null;
    //-----------------------------
    this.barChartLabelsBm= [];
    this.barChartDataBm= [{ data: [], label: ""}];
    this.pieChartLabelsBm= [];
    this.pieChartDataBm= [];
    this.grafBm="null";
    //this.genelFilterBm="null";
  }
  if(this.filterPer!=null){
    this.filterPer.kolonadi=null;
    this.filterPer.bolgeid=0;
    this.filterPer.iladi=null;
    //-----------------------------
    this.barChartLabelsPer= [];
    this.barChartDataPer= [{ data: [], label: ""}];
    this.pieChartLabelsPer= [];
    this.pieChartDataPer= [];
    this.grafPer="null";
  }
  if(this.filterFirst!=null){
    this.filterFirst.kolonadi=null;
    this.filterFirst.bolgeid=0;
    this.filterFirst.iladi=null;
    //-----------------------------
    this.barChartLabelsFirst= [];
    this.barChartDataFirst= [{ data: [], label: ""}];
    this.pieChartLabels= [];
    this.pieChartData= [];
    this.grafFirst="null";
  }
  }
}
export class StaticModelPost {
  public kolonadi: string;
  public bolgeid: number;
  public iladi: string;
  public secilenid:number;

  constructor() {
    this.bolgeid = 0;
    this.kolonadi = null;
    this.iladi = null;
  }
}

export class IstatisticModel {
  public settlement: string;
  public model: model[];
}
class model {
  public key: string;
  public value: number;
}
class barChartDataModel{
  public data:number[];
  public label:string;
}
