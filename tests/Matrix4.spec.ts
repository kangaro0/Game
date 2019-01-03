import { expect } from 'chai';
import 'mocha';

import { Matrix4 } from '../src/Math/Matrix4';
import { Vector4 } from '../src/Math/Vector4';

describe( 'Matrix4: ', () => {
    
    it( 'should initialize', () => {
        let m = new Matrix4([
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1
        ]);

        expect( m ).to.not.equal( null );
    });

    it( 'should give identity', () => {
        let m = Matrix4.identity();

        // first row
        expect( m.getXY( 0,0 ) ).to.equal( 1.0 );
        expect( m.getXY( 1,0 ) ).to.equal( 0.0 );
        expect( m.getXY( 2,0 ) ).to.equal( 0.0 );
        expect( m.getXY( 3,0 ) ).to.equal( 0.0 );
        // second row
        expect( m.getXY( 0,1 ) ).to.equal( 0.0 );
        expect( m.getXY( 1,1 ) ).to.equal( 1.0 );
        expect( m.getXY( 2,1 ) ).to.equal( 0.0 );
        expect( m.getXY( 3,1 ) ).to.equal( 0.0 );
        // third row
        expect( m.getXY( 0,2 ) ).to.equal( 0.0 );
        expect( m.getXY( 1,2 ) ).to.equal( 0.0 );
        expect( m.getXY( 2,2 ) ).to.equal( 1.0 );
        expect( m.getXY( 3,2 ) ).to.equal( 0.0 );
        // forth row
        expect( m.getXY( 0,3 ) ).to.equal( 0.0 );
        expect( m.getXY( 1,3 ) ).to.equal( 0.0 );
        expect( m.getXY( 2,3 ) ).to.equal( 0.0 );
        expect( m.getXY( 3,3 ) ).to.equal( 1.0 );

    });

    it( 'should get correctly', () => {
        let m = Matrix4.identity();

        for( let i = 0 ; i < 16 ; i++ ){
            if( i % 5 === 0.0 )
                expect( m.get( i ) ).to.equal( 1.0 );
            else
                expect( m.get( i ) ).to.equal( 0.0 );
        }
    });

    it( 'should get XY correctly', () => {

        let arr = [
            0,1,2,3,
            4,5,6,7,
            8,9,10,11,
            12,13,14,15
        ];

        let m = new Matrix4( arr );

        for( let y = 0 ; y < 4 ; y++ ){
            for( let x = 0 ; x < 4 ; x++ ){
                expect( m.getXY( x,y ) ).to.equal( arr[ y * 4 + x ] );
            }
        }
    });

    it( 'should set correctly', () => {
        let m = Matrix4.identity();
        
        for( let i = 0 ; i < 16 ; i++ ){
            m.set( i, 5 );
            expect( m.get( i ) ).to.equal( 5.0 );
        }
    });

    it( 'should set XY correctly', () => {
        
        
        let m = Matrix4.identity();


    });

    it( 'should add', () => {
        let m1 = Matrix4.identity();
        let m2 = Matrix4.identity();
        m1.add( m2 );

        // first row
        expect( m1.getXY( 0,0 ) ).to.equal( 2.0 );
        expect( m1.getXY( 1,0 ) ).to.equal( 0.0 );
        expect( m1.getXY( 2,0 ) ).to.equal( 0.0 );
        expect( m1.getXY( 3,0 ) ).to.equal( 0.0 );
        // second row
        expect( m1.getXY( 0,1 ) ).to.equal( 0.0 );
        expect( m1.getXY( 1,1 ) ).to.equal( 2.0 );
        expect( m1.getXY( 2,1 ) ).to.equal( 0.0 );
        expect( m1.getXY( 3,1 ) ).to.equal( 0.0 );
        // third row
        expect( m1.getXY( 0,2 ) ).to.equal( 0.0 );
        expect( m1.getXY( 1,2 ) ).to.equal( 0.0 );
        expect( m1.getXY( 2,2 ) ).to.equal( 2.0 );
        expect( m1.getXY( 3,2 ) ).to.equal( 0.0 );
        // forth row
        expect( m1.getXY( 0,3 ) ).to.equal( 0.0 );
        expect( m1.getXY( 1,3 ) ).to.equal( 0.0 );
        expect( m1.getXY( 2,3 ) ).to.equal( 0.0 );
        expect( m1.getXY( 3,3 ) ).to.equal( 2.0 );
    });

    it( 'should multiply by scalar', () => {
        let m1 = Matrix4.identity();
        m1.multiplyScalar( 2 );

        // first row
        expect( m1.getXY( 0,0 ) ).to.equal( 2.0 );
        expect( m1.getXY( 1,0 ) ).to.equal( 0.0 );
        expect( m1.getXY( 2,0 ) ).to.equal( 0.0 );
        expect( m1.getXY( 3,0 ) ).to.equal( 0.0 );
        // second row
        expect( m1.getXY( 0,1 ) ).to.equal( 0.0 );
        expect( m1.getXY( 1,1 ) ).to.equal( 2.0 );
        expect( m1.getXY( 2,1 ) ).to.equal( 0.0 );
        expect( m1.getXY( 3,1 ) ).to.equal( 0.0 );
        // third row
        expect( m1.getXY( 0,2 ) ).to.equal( 0.0 );
        expect( m1.getXY( 1,2 ) ).to.equal( 0.0 );
        expect( m1.getXY( 2,2 ) ).to.equal( 2.0 );
        expect( m1.getXY( 3,2 ) ).to.equal( 0.0 );
        // forth row
        expect( m1.getXY( 0,3 ) ).to.equal( 0.0 );
        expect( m1.getXY( 1,3 ) ).to.equal( 0.0 );
        expect( m1.getXY( 2,3 ) ).to.equal( 0.0 );
        expect( m1.getXY( 3,3 ) ).to.equal( 2.0 );
    });

    it( 'should multiply by vector', () => {
        let m = Matrix4.identity();
        let v = new Vector4( 1,2,3,1 );

        let vt = m.multiplyVector( v );

        expect( vt.getX() ).to.equal( 1.0 );
        expect( vt.getY() ).to.equal( 2.0 );
        expect( vt.getZ() ).to.equal( 3.0 );
        expect( vt.getW() ).to.equal( 1.0 );
    });

    it( 'should transpose', () => {
        let check = [
            0,4,8,12,
            1,5,9,13,
            2,6,10,14,
            3,7,11,15
        ];
        let arr = [
            0,1,2,3,
            4,5,6,7,
            8,9,10,11,
            12,13,14,15
        ];

        let m = new Matrix4( arr );
        m.transpose();

        for( let y = 0 ; y < 4 ; y++ ){
            for( let x = 0 ; x < 4 ; x++ ){
                expect( m.getXY( x,y ) ).to.equal( check[ y * 4 + x ] );
            }
        }
    });

    /*
    it( 'should set correctly', () => {

    });
    */
});