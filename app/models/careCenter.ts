import { License } from "./license";
import { ManagerInfoModel } from "./ManagerInfoModel";
import { Asansor } from "../pages/careCenter/careCenter.component";

export class CareCenter {
    public bmid: number;
    public bmkodu: string;
    public bmadi: string;
    public bmadres: string;
    public bmil: string;
    public bmilce: string;
    public bmtel1: string;
    public bmtel2: string;
    public bmweb: string;
    public bmeposta: string;
    public bmkep: string;
    public bmticunvan: string;
    public bmticvda: string;
    public bmticvno: string;
    public bmticil: string;
    public bmticilce: string;
    public bmticadres: string;
    public bmKurMud: string;
    public bmSorMud: string;
    public bmticAcilisIzinTar: Date;
    public ruhsat: License[];
    public bmfoto: File;
    public _bmfoto: File;
    public _sbmfoto: string;
    public bm_bank_adi: string;
    public bm_bank_iban: string;
    public bm_bank_sube_adi: string;
    public bm_bank_hesap_adi: string;
    public bm_harc_iban_no: string;
    public bm_harc_bank_adi: string;
    public bm_harc_sube_adi: string;
    public bm_harc_hesap_adi: string;

    public bolgeid: number;
    public bm_binasahipdur: string;
    public bm_aylikkiratut: string;
    public bm_kirasozbastar: Date;
    public bm_kirasozbittar: Date;
    public bm_katsayisi: string;
    public bm_asansor: boolean;
    public bm_jenerator: boolean;
    public bm_jeneratorguc: string;
    public bm_sudeposu: boolean;
    public bm_sdkapasite: string;
    public bm_bahcemetrekare: string;

    public _bm_asansor: Asansor[] = [];

    /**
     *_bm_asansor
     */
    constructor() {
        this.ruhsat = new Array<License>();
        this.bmticil = "null";
        this.bmticilce = "null";
        this.bmticvda = "null";
        this.bm_binasahipdur="";
        this.bm_aylikkiratut="";
        //this.bm_kirasozbittar=new Date();
    }


}
