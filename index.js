/**
 * ArrayTree
 *
 * @description ::
 * @author      :: Jeff Lee
 * @created     :: 2014/10/22
 */

var _ = require('underscore');

module.exports = (function () {
    var ArrayTree = function (config) {
        this.config = _.extend({
            childrenName: 'children'
        }, config);

        this.data = [];
        this.tempData = [];
    };

    ArrayTree.prototype.addChild = function (node, parentId) {
        if (!parentId) {
            this.data.push(node);
        } else {
            if (!this.findAndInsert({ id: parentId }, node)) {
                this.tempData.push({ data: node, pid: parentId });
            }

            var t = checkTempDataParent(node.id, this.tempData);
            if (t !== -1) {
                this.data.findAndInsert({ id: node.id }, this.tempData[t].data);
                delete this.tempData[t];
            }
        }
    };

    ArrayTree.prototype.updateChild = function () {

    };

    ArrayTree.prototype.removeChild = function () {

    };

    ArrayTree.prototype.search = function (keyObj) {
        return this.data.findAndInsert(keyObj, null);
    };

    // http://jsfiddle.net/leejefon/xzg1hbkk/
    Object.prototype.findAndInsert = function (keyObj, node) {
        var key, val, tRet;
        for (var p in keyObj) {
            if (keyObj.hasOwnProperty(p)) {
                key = p;
                val = keyObj[p];
            }
        }

        for (var p in this) {
            if (p == key) {
                if (this[p] == val) {
                    if (node) {
                        this['children'].push(node);
                    }
                    return this.data;
                }
            } else if (this[p] instanceof Object) {
                if (this.hasOwnProperty(p)) {
                    tRet = this[p].findAndInsert(keyObj, node);
                    if (tRet) { return tRet; }
                }
            }
        }

        return false;
    };

    function checkTempDataParent (id, data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].parentId === id) {
                return i;
            }
        }

        return -1;
    }

    return ArrayTree;

})();
