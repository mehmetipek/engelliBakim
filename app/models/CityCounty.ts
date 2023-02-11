export class City {
    constructor(_name: string) {
      this.iladi = _name;
      this.ilkodu=0;
    }
    ilkodu: number=0;
    iladi: string="";
    // Ilce?: ilce[];
  }
  export class County {
    constructor(_name: string, _code: number) {
    }
    ilceadi: string="";
    ilcekodu: string="";
    ilkodu: number=0;
  }