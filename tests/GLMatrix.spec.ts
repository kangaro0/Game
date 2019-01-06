import { expect } from 'chai';
import 'mocha';

import { GLMatrix } from '../src/GL/GLMatrix';
import { Matrix4 } from '../src/Math/Matrix4';
import { Vector4 } from '../src/Math/Vector4';

describe( 'GLMatrix: ', () => {

    it( 'should create perspective', () => {
        let m = GLMatrix.Perspective( 45, 1024 / 768, 1, 2000 );

        expect( m ).to.not.equal( null );
    });

    it( 'should create view', () => {
        let m = GLMatrix.View( new Vector4( 0,10,0,1 ), new Vector4( 0,1,0,1 ), new Vector4( 0,0,0,1 ) );

        expect( m ).to.not.equal( null );
    });
});