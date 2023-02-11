import { OperationType } from "./OperationType.enum";

export class Experience {
    // Tecrübe
    public id: number;
    public perid: number;
    public percalisilankurum: string;
    public pergorevi: string;
    public pergiristar: Date;
    public percikistar: Date;
    public _modify: OperationType;
}
