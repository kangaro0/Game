import { expect } from 'chai';
import 'mocha';

import { List } from '../src/Data/List';

class Item {

    private static COUNT = 0;
    private id: number;

    constructor(){
        this.id = Item.COUNT;
        Item.COUNT++;
    }

    public getId(){
        return this.id.toString();
    }
}

describe( 'List: ', () => {

    it( 'should initialize', () => {
        let l = new List<Item>();

        expect( l ).to.not.equal( 0 );
    });

    it( 'should push', () => {
        let o = new Item();
        let l = new List<Item>();
        l.push( o );

        let oo = l.getByIndex( 0 ) as Item;
        expect( oo ).to.not.equal( null );
        expect( oo.getId() ).to.equal( o.getId() );
    });

    it( 'should pop by identifier', () => {
        let o = new Item();
        let id = o.getId();

        let l = new List<Item>();
        l.push( o );

        let oo = l.popByIdentifier( o.getId() ) as Item;
        expect( oo.getId() ).to.equal( id );
        expect( l.length() ).to.equal( 0 );
    });

    it( 'should pop by index', () => {
        let o = new Item();
        let id = o.getId();

        let l = new List<Item>();
        l.push( o );

        let oo = l.popByIndex( 0 ) as Item;
        expect( oo.getId() ).to.equal( id );
        expect( l.length() ).to.equal( 0 );
    });

    it( 'should get by identifier', () => {
        let o = new Item();
        let id = o.getId();

        let l = new List<Item>();
        l.push( o );

        let oo = l.getByIdentifier( id ) as Item;
        expect( oo ).to.not.equal( null );
        expect( oo.getId() ).to.equal( id );
        expect( l.length() ).to.equal( 1 );
    });

    it( 'should get by index', () => {
        let o = new Item();
        let id = o.getId();

        let l = new List<Item>();
        l.push( o );

        let oo = l.getByIndex( 0 ) as Item;
        expect( oo ).to.not.equal( null );
        expect( oo.getId() ).to.equal( id );
        expect( l.length() ).to.equal( 1 );
    });

    it( 'should call func for each element', () => {
        let o1 = new Item();
        let o2 = new Item();
        let ids = [ o1.getId(), o2.getId() ];
        
        let l = new List<Item>();
        l.push( o1 );
        l.push( o2 );

        l.forEach( ( item, index ) => {
            expect( item.getId() ).to.equal( ids[ index ] );
        });
    });
});