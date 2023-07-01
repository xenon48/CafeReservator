export class responceDto {
    readonly data;
    readonly meta?;

    constructor(data, meta?) {
        this.data = data;
        this.meta = meta;
    }
}