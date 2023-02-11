export class PostModel<T> {
    constructor(_token: string) {
        this.token = _token;
    }
    public token: string;
    public data: T;
    public bmId: number;
    public userId: number;

}
