import { expect } from 'chai';
import 'mocha';

import { List } from '../src/Data/List';
import { Object3D } from '../src/Core/Object3D';

describe( 'List: ', () => {

    it( 'should initialize', () => {
        let l = new List<Object3D>();

        expect( l ).to.not.equal( 0 );
    });

    it( 'should push', () => {
        let o = new Object3D();

        let l = new List<Object3D>();
        l.push( o );

        let oo = l.getByIndex( 0 ) as Object3D;
        expect( oo ).to.not.equal( null );
        expect( oo.getId() ).to.equal( o.getId() );
    });

    it( 'should pop by identifier', () => {
        let o = new Object3D();
        let id = o.getId();

        let l = new List<Object3D>();
        l.push( o );

        let oo = l.popByIdentifier( o.getId() ) as Object3D;
        expect( oo.getId() ).to.equal( id );
        expect( l.length() ).to.equal( 0 );
    });

    it( 'should pop by index', () => {
        let o = new Object3D();
        let id = o.getId();

        let l = new List<Object3D>();
        l.push( o );

        let oo = l.popByIndex( 0 ) as Object3D;
        expect( oo.getId() ).to.equal( id );
        expect( l.length() ).to.equal( 0 );
    });

    it( 'should get by identifier', () => {
        let o = new Object3D();
        let id = o.getId();

        let l = new List<Object3D>();
        l.push( o );

        let oo = l.getByIdentifier( id ) as Object3D;
        expect( oo ).to.not.equal( null );
        expect( oo.getId() ).to.equal( id );
        expect( l.length() ).to.equal( 1 );
    });

    it( 'should get by index', () => {
        let o = new Object3D();
        let id = o.getId();

        let l = new List<Object3D>();
        l.push( o );

        let oo = l.getByIndex( 0 ) as Object3D;
        expect( oo ).to.not.equal( null );
        expect( oo.getId() ).to.equal( id );
        expect( l.length() ).to.equal( 1 );
    });

    it( 'should call func for each element', () => {
        let o1 = new Object3D();
        let o2 = new Object3D();
        let ids = [ o1.getId(), o2.getId() ];
        
        let l = new List<Object3D>();
        l.push( o1 );
        l.push( o2 );

        l.forEach( ( item, index ) => {
            expect( item.getId() ).to.equal( ids[ index ] );
        });
    });
});