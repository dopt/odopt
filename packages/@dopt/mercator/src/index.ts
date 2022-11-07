import { EntriesIterator, KeysIterator } from './iterators';

export class Mercator<K, V> implements Map<K, V> {
  private map = new Map<string, V>();

  [Symbol.toStringTag] = '[object Map]';

  set(key: K, value: V): this {
    this.map.set(JSON.stringify(key), value);
    return this;
  }

  get(key: K): V | undefined {
    return this.map.get(JSON.stringify(key));
  }

  clear() {
    this.map.clear();
  }

  delete(key: K): boolean {
    return this.map.delete(JSON.stringify(key));
  }

  entries(): IterableIterator<[K, V]> {
    return new EntriesIterator(this.map);
  }

  keys(): IterableIterator<K> {
    return new KeysIterator(this.map);
  }

  has(key: K): boolean {
    return this.map.has(JSON.stringify(key));
  }

  get size() {
    return this.map.size;
  }

  values(): IterableIterator<V> {
    return this.map.values();
  }

  forEach(
    callbackfn: (value: V, key: K, map: Map<K, V>) => void,
    self?: any
  ): void {
    this.map.forEach((value, key) =>
      callbackfn.call(self, value, JSON.parse(key), this)
    );
  }
  *[Symbol.iterator](): IterableIterator<[K, V]> {
    for (const i of this.map) {
      const [k, v] = i;
      yield [JSON.parse(k), v];
    }
  }
}
