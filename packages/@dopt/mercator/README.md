## @dopt/mercator

A Map implementation that allows for objects as keys without key equality constraints. In practice this means

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

Standard maps use a [key equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#key_equality) SameValueZero algorithm. Mercator instead calls `JSON.stringify` on the key and uses it as the key for its underlying map.

Great for in memory data structures where the key is naturally a composite (like an array or an object).
