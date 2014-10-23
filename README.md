ArrayTree
=========

A simple JavaScript tree data structure with just arrays.


## Changelog
- 0.1.1 - Added README
- 0.1.0 - Finished update and delete
- 0.0.2 - Changed findThenAction from an Object prototype to function
- 0.0.1 - Children field not required when addChild + Insert partent after child
- *1.0.0 - (Wrong versioning)

## Usage

### Install

    $ npm install array-tree

### Create tree
```javascript
var ArrayTree = require('array-tree');
var tree = new ArrayTree();
```

#### Create tree with different children field
```javascript
var tree = new ArrayTree({ childrenName: 'subItems' });
// tree.data = > [{ id: 1, subItems: [] }]
```

### CRUD Tree Children

#### Add a child
NOTE: id is required for child
```javascript
tree.addChild({ id: '3' });
// tree.data => [{ id: '3' }]
```

#### Insert element as a child of {id: '3'}
```javascript
tree.addChild({ id: '4' }, '3');
// tree.data => [{ id: '3', children: [{ id: '4' }] }]
```

#### Parent can be inserted after children
```javascript
tree.addChild({ id: '4' }, '3');
tree.addChild({ id: '3' });
// tree.data => [{ id: '3', children: [{ id: '4' }] }]
```

#### Update a child
```javascript
tree.updateChild({ id: '3' }, { name: 'Jeff Lee' });
// tree.data => [{ id: '3', name: 'Jeff Lee', children: [{ id: '4' }] }]
```

#### Update query can be anything
```javascript
tree.updateChild({ name: 'Jeff Lee' }, { name: 'Jeff' });
// tree.data => [{ id: '3', name: 'Jeff', children: [{ id: '4' }] }]
```

### Delete a child (query can be anything as well)
```javascript
tree.updateChild({ id: '4' });
// return true
// tree.data => [{ id: '3', name: 'Jeff', children: [] }]
```

### Search (same query as update and delete)
```javascript
tree.search({ id: '4' });
// return false

tree.search({ id: '3' });
// return { id: '3', name: 'Jeff', children: [] }
```
