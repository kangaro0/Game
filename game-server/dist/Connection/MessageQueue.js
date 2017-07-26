class MessageQueue {
    constructor() {
        this.array = new Array();
        this.size = 0;
    }
    push(item) {
        this.array.push(item);
        this.size++;
    }
    pop() {
        this.size--;
        return this.array.slice(0, 1)[0];
    }
    hasNext() {
    }
}
