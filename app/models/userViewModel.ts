export class  UserViewModel {
    constructor() {
        this.careCenterCode = "";
        this.userCode = "";
        this.userName = "";
        this.token="";
        this.careCenterName="";
        this.auth=new UserAuthorizations();
        this.responsibleManagerName="";
    }
    public userCode: string;
    public userName: string;
    public careCenterCode: string;
    public careCenterId: number;
    public careCenterName: string;
    public token:string;
    public auth:UserAuthorizations;
    public userId:number;
    public responsibleManagerName:string;
}

export class UserAuthorizations{
    constructor()
    {
        this.bilgiTanimlama="";
        this.engelliIslemleri="";
        this.kalite="";
        this.raporlar="";
        this.kullaniciTanimlama="";
    }
    public bilgiTanimlama:string;
    public engelliIslemleri:string;
    public kalite:string;
    public raporlar:string;
    public kullaniciTanimlama:string;

}