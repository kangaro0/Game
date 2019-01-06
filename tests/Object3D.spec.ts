import { expect } from 'chai';
import 'mocha';

import { CubeGeometry } from '../src/Geometry/CubeGeometry';
import { Object3D } from '../src/Core/Object3D';

describe( 'Object3D: ', () => {

    it( 'should initialize', () => {
        let g = new CubeGeometry();
        let o = new Object3D( g );

        expect( o ).to.not.equal( null );
    });

    it( 'should have correct id', () => {
        let g = new CubeGeometry();
        let o = new Object3D( g );
        let id = o.getId();

        expect( o.getId() ).to.equal( id );
    });
});