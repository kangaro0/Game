
class Mutex {

    private locked: boolean;

    constructor( ){
        this.locked = false;
    }

    public lock( ): boolean {
        if( this.locked == true )
            return false;
    }
}