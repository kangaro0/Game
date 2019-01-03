import { expect } from 'chai';
import 'mocha';

import { GLMatrix } from '../src/GL/GLMatrix';
import { Matrix4 } from '../src/Math/Matrix4';

describe( 'GLMatrix: ', () => {

    it( 'should create perspective', () => {
        let m = GLMatrix.Perspective( 45, 1024 / 768, 1, 2000 );

        expect( m ).to.not.equal( null );
    });
});