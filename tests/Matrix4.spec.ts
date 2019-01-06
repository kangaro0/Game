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
        let m = Matrix4.identity();
        let n = Matrix4.identity();
        let m1 = m.add( n );

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
        let m = Matrix4.identity();
        let m1 = m.multiplyScalar( 2 );

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

    it( 'should multiply', () => {
        let arr = [
            1,2,3,4,
            1,2,3,4,
            1,2,3,4,
            1,2,3,4
        ];
        let check = [
            10,20,30,40,
            10,20,30,40,
            10,20,30,40,
            10,20,30,40
        ];

        let m1 = new Matrix4( arr );
        let m2 = new Matrix4( arr );
        let m3 = m1.multiply( m2 );
        let m4 = new Matrix4( check );

        for( let y = 0 ; y < 4 ; y++ ){
            for( let x = 0 ; x < 4 ; x++ ){
                expect( m3.getXY( x,y ) ).to.equal( m4.getXY( x,y ) );
            }
        }
    });

    it( 'should multiply 2', () => {
        let arr1 = [
            1,2,3,4,
            2,3,4,5,
            3,4,5,6,
            4,5,6,7
        ];
        let arr2 = [
            4,5,6,7,
            3,4,5,6,
            2,3,4,5,
            1,2,3,4
        ];
        let check = [
            20,30,40,50,
            30,44,58,72,
            40,58,76,94,
            50,72,94,116
        ];

        let m1 = new Matrix4( arr1 );
        let m2 = new Matrix4( arr2 );
        let m3 = m1.multiply( m2 );
        let m4 = new Matrix4( check );

        for( let y = 0 ; y < 4 ; y++ ){
            for( let x = 0 ; x < 4 ; x++ ){
                expect( m3.getXY( x,y ) ).to.equal( m4.getXY( x,y ) );
            }
        }
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

    it( 'should get row', () => {
        let m = Matrix4.identity();
        m.setXY( 2,0,1 );
        m.setXY( 0,1,1 );
        m.setXY( 3,2,1 );
        m.setXY( 0,3,1 );

        let r4 = m.getRow( 0 );
        expect( r4.getX() ).to.equal( 1 );
        expect( r4.getY() ).to.equal( 0 );
        expect( r4.getZ() ).to.equal( 1 );
        expect( r4.getW() ).to.equal( 0 );

        let r1 = m.getRow( 1 );
        expect( r1.getX() ).to.equal( 1 );
        expect( r1.getY() ).to.equal( 1 );
        expect( r1.getZ() ).to.equal( 0 );
        expect( r1.getW() ).to.equal( 0 );

        let r3 = m.getRow( 2 );
        expect( r3.getX() ).to.equal( 0 );
        expect( r3.getY() ).to.equal( 0 );
        expect( r3.getZ() ).to.equal( 1 );
        expect( r3.getW() ).to.equal( 1 );

        let r2 = m.getRow( 3 );
        expect( r2.getX() ).to.equal( 1 );
        expect( r2.getY() ).to.equal( 0 );
        expect( r2.getZ() ).to.equal( 0 );
        expect( r2.getW() ).to.equal( 1 );
    });

    it( 'should get column', () => {
        let m = Matrix4.identity();
        m.setXY( 0,1,1 );
        m.setXY( 1,2,1 );
        m.setXY( 2,3,1 );
        m.setXY( 3,0,1 );

        let c1 = m.getColumn( 0 );
        expect( c1.getX() ).to.equal( 1 );
        expect( c1.getY() ).to.equal( 1 );
        expect( c1.getZ() ).to.equal( 0 );
        expect( c1.getW() ).to.equal( 0 );

        let c2 = m.getColumn( 1 );
        expect( c2.getX() ).to.equal( 0 );
        expect( c2.getY() ).to.equal( 1 );
        expect( c2.getZ() ).to.equal( 1 );
        expect( c2.getW() ).to.equal( 0 );

        let c3 = m.getColumn( 2 );
        expect( c3.getX() ).to.equal( 0 );
        expect( c3.getY() ).to.equal( 0 );
        expect( c3.getZ() ).to.equal( 1 );
        expect( c3.getW() ).to.equal( 1 );

        let c4 = m.getColumn( 3 );
        expect( c4.getX() ).to.equal( 1 );
        expect( c4.getY() ).to.equal( 0 );
        expect( c4.getZ() ).to.equal( 0 );
        expect( c4.getW() ).to.equal( 1 );
    }); 
});