import { ListItem } from "../Interfaces";

export class List<T extends ListItem> {

    private arr: Array<T>;
    
    constructor(){
        this.arr = new Array<T>( 0 );
    }

    public push( item: T ){
        if( this.contains( item.getId() ) )
            return;
        
        this.arr = this.arr.concat([ item ]);
    }

    public popByIdentifier( identifier: string ){
        let i = 0;
        let l = this.arr.length;
        for( ; i < l ; i++ ){
            let cur = this.arr[ i ];
            if( cur.getId().localeCompare( identifier ) === 0 ){
                this.removeByIndex( i );
                return cur;
            }
        }
    }

    public popByIndex( index: number ){
        if( index >= this.arr.length )
            return null;
        let cur = this.arr[ index ];
        this.removeByIndex( index );
        return cur;
    }

    public getByIdentifier( identifier: string ){
        let i = 0;
        let l = this.arr.length;
        for( ; i < l ; i++ ){
            let cur = this.arr[ i ];
            if( cur.getId().localeCompare( identifier ) === 0 )
                return cur;
        }
        return null;
    }

    public getByIndex( index: number ){
        if( index >= this.arr.length )
            return;
        return this.arr[ index ];
    }

    public removeByIdentifier( identifier: string ){
        let i = 0;
        let l = this.arr.length;
        for( ; i < l ; i++ ){
            let cur = this.arr[ i ];
            if( cur.getId().localeCompare( identifier ) === 0 ){
                this.arr.splice( i, 1 );
                return;
            }
        }
    }

    public removeByIndex( index: number ){
        if( index >= this.arr.length )
            return;
        this.arr.splice( index, 1 );
    }

    public length(){
        return this.arr.length;
    }

    public forEach( func: ( item: T, index: number ) => void ){
        let i = 0;
        let l = this.arr.length;
        for( ; i < l ; i++ ){
            func( this.arr[ i ], i );
        }
    }

    private contains( identifier: string ){
        let i = 0;
        let l = this.arr.length;
        for( ; i < l ; i++ ){
            let cur = this.arr[ i ];
            if( cur.getId().localeCompare( identifier ) === 0 )
                return true;
        }
        return false;
    }
}