/**
 * ArrayTree
 *
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

    ArrayTree.prototype.addChild = function (child, parentId) {
        if (!parentId) {
            this.data.push(child);

            var t = checkTempDataParent(child.id, this.tempData);
            if (t !== -1) {
                findThenAction(this.data, { id: child.id }, 'insert', this.tempData[t].data, this.config);
                delete this.tempData[t];
            }
        } else {
            if (!findThenAction(this.data, { id: parentId }, 'insert', child, this.config)) {
                this.tempData.push({ data: child, pid: parentId });
            }
        }
    };

    ArrayTree.prototype.updateChild = function (query, data) {
        return findThenAction(this.data, query, 'update', data);
    };

    ArrayTree.prototype.removeChild = function (query) {
        return findThenAction(this.data, query, 'delete');
    };

    ArrayTree.prototype.search = function (query) {
        return findThenAction(this.data, query, 'search');
    };

    // http://jsfiddle.net/leejefon/xzg1hbkk/
    function findThenAction (data, query, action, child, params) {
        var key, val, tRet;
        for (var q in query) {
            if (query.hasOwnProperty(q)) {
                key = q;
                val = query[q];
            }
        }

        for (var q in data) {
            if (q == key) {
                if (data[q] == val) {
                    if (action === 'insert') {
                        if (!data[params.childrenName]) {
                            data[params.childrenName] = [];
                        }
                        data[params.childrenName].push(child);
                    } else if (action === 'update') {

                    } else if (action === 'delete') {
                        // Can't find a good way to delete atm
                    } else { // search
                        return data;
                    }
                }
            } else if (data[q] instanceof Object) {
                if (data.hasOwnProperty(q)) {
                    tRet = findThenAction(data[q], query, action, child, params);
                    if (tRet) { return tRet; }
                }
            }
        }

        return false;
    }

    function checkTempDataParent (id, data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].pid === id) {
                return i;
            }
        }

        return -1;
    }

    return ArrayTree;
})();
