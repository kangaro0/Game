import { expect } from 'chai';
import 'mocha';

import { Object3D } from '../src/Core/Object3D';

describe( 'Object3D: ', () => {

    it( 'should initialize', () => {
        let o = new Object3D();

        expect( o ).to.not.equal( null );
    });

    it( 'should have correct id', () => {
        let o = new Object3D();
        let id = o.getId();

        expect( o.getId() ).to.equal( id );
    });
});