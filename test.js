/**
 * ArrayTree Test
 *
 * @author      :: Jeff Lee
 * @created     :: 2014/10/22
 */

var chai = require('chai');
var ArrayTree = require('./index.js');

chai.should();

describe('ArrayTree', function(){
    describe('Insert items', function(){

        it('should insert 4 as a child of 3', function(){
            var tree = new ArrayTree();

            tree.addChild({ id: '3' });
            tree.addChild({ id: '4' }, '3');

            tree.data[0].children.should.have.length('1');
            tree.data[0].children[0].id.should.equal('4');
        });

        it('should insert 4 as a child of 3, while parent is inserted later', function(){
            var tree = new ArrayTree();

            tree.addChild({ id: '4' }, '3');
            tree.addChild({ id: '3' });

            tree.data[0].children.should.have.length('1');
            tree.data[0].children[0].id.should.equal('4');
        });
    });
});
