import { expect } from 'chai';
import 'mocha';

import { Vector4 } from '../src/Math/Vector4';

describe( 'Vector4: ', () => {

    it( 'should initialize', () => {
        let v = new Vector4( 0.0,0.0,0.0,0.0 );
        expect( v ).to.not.equal( null );
        expect( v.getX() ).to.equal( 0.0 );
        expect( v.getY() ).to.equal( 0.0 );
        expect( v.getZ() ).to.equal( 0.0 );
        expect( v.getW() ).to.equal( 0.0 );
    });

    it( 'should set correctly', () => {
        let v = new Vector4( 0.0,0.0,0.0,0.0 );
        v.setX( 10 );
        v.setY( 11 );
        v.setZ( 12 );
        v.setW( 13 );

        expect( v.getX() ).to.equal( 10.0 );
        expect( v.getY() ).to.equal( 11.0 );
        expect( v.getZ() ).to.equal( 12.0 );
        expect( v.getW() ).to.equal( 13.0 );
    });

    it( 'should multiply by scalar', () => {
        let v = new Vector4( 10.0,11.0,12.0,13.0 );
        let vt = v.multiplyScalar( 2 );

        expect( vt.getX() ).to.equal( 20.0 );
        expect( vt.getY() ).to.equal( 22.0 );
        expect( vt.getZ() ).to.equal( 24.0 );
        expect( vt.getW() ).to.equal( 13.0 );
    });

    it( 'should normalize', () => {
        let v = new Vector4( 1,1,1,1 );
        let vn = v.normalize();
        let vt = v.multiplyScalar( 1 / Math.sqrt( 3 ) );

        expect( vn.getX() ).to.equal( vt.getX() );
        expect( vn.getY() ).to.equal( vt.getY() );
        expect( vn.getZ() ).to.equal( vt.getZ() );
        expect( vn.getW() ).to.equal( vt.getW() );
    });
});