export class Recording {
    constructor() {
        this.status = 'init';
        this.label = '\u23FA';
        this.canComment = false;
        this.startTime = Date.now();
    }
}