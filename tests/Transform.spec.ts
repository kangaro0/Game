import { expect } from 'chai';
import 'mocha';

import { Transform } from '../src/Math/Transform';
import { Vector4 } from '../src/Math/Vector4';

describe( 'Transform: ', () => {

    it( 'should create translation matrix', () => {
        let v = new Vector4( 1,2,3,1 );
        let m = Transform.Translate( v );
        
        expect( m.get( 12 ) ).to.equal( 1 );
        expect( m.get( 13 ) ).to.equal( 2 );
        expect( m.get( 14 ) ).to.equal( 3 );
    });
});