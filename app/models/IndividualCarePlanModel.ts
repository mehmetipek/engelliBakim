export class IndividualCarePlanModel {
	public id: number;
	public kurucu_id:number;
	public engelli_ikid: number;
	public duzenlemetar: Date;
	public planbastar: Date;
	public planbitistar: Date;
	public yenidendegtar: Date;
	public bmadres: string;
	public engellihiztur: string;
	public bbpkapkayittar: Date;
	public bbpuser_id: number;
	public bbpdatetime: Date;
	public aktif_kayit: boolean;

	//Mesleki Kayıt Defteri
	public _mes_sira_no_id: number;
	public bbp_mesleki_kayit_no_id: number;

	//views
	public careCenterName: string;
	public careCenterAdress: string;
	public createdName: string;
	bmid: number;

	constructor() {
		this.engellihiztur = null;
	}
}
