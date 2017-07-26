
class MessageQueue<T> {

    private array: Array<T>;
    private size: number;

    constructor( ){
        this.array = new Array<T>();
        this.size = 0;
    }

    public push( item: T ) {
        this.array.push( item );
        this.size++;
    }

    public pop( ) {
        this.size--;
        return this.array.slice( 0, 1 )[ 0 ];
    }

    public hasNext(){
        
    }
    
}