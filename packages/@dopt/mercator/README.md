## @dopt/mercator

A Map implementation that allows for objects as keys w/o the key equality constraints. In practice this means

```
const map = new Mercator();
map.set([1,2], 'a');
map.get([1,2]);
> 'a'
```

whereas a standard Map would have the following behavior

```
const map = new Map();
map.set([1,2], 'a');
map.get([1,2]);
> undefined
```

This is because [key equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#key_equality) is based on the SameValueZero algorithm.

Great for in memory data structures where the key is naturally a composite.
