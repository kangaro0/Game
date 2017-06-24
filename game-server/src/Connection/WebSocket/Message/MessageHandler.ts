
class MessageHandler<T> {

    private ready: boolean;
    
    private messageQueue: MessageQueue<T>;

    constructor( ){
        this.messageQueue = new MessageQueue<T>();
    }

    public pop() {
        return new Promise<T>( ( resolve, reject ) => {


        });
    }

    public push() {
        return new Promise<boolean>( ( resolve, reject ) => {

        });
    }

}