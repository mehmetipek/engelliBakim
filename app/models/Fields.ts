export interface Fields {
    name?: string;
    class?: string;
    label?: string;
    model?: string;
    type: string;
    options?: any[];
    table?: Table;
}

export interface Table {
    theads?: string[];
    rows?: Row[];
};
export interface Row{
    colons:any[];
}