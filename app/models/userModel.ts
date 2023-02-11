export class UserModel {
    public userid:number;
    public userkodu:string;
    public useradi: string;
    public personel_id:number;
    public userpass:string;
    public usersoru:string;
    public usercevap:string;
    public usertoken:string;
    public isuser: boolean;
    public yetkimodel:Authorizations[];
    public usertcno:string;
}
export class Authorizations{
    public islem: string;
    public goruntuleme: boolean;
    public ekleme: boolean;
    public degistirme: boolean;
    public silme: boolean;
    public kapatma: boolean;
}