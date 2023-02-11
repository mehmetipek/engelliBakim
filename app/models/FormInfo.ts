import { Fields } from "./Fields";

export interface FormInfo {
    name: string;
    title: string;
    icon?: string;
    fields: Fields[];
    class?: string;
}