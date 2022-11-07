export class EntriesIterator<K, V> {
  private map: Map<string, V>;
  private entries: IterableIterator<[string, V]>;
  constructor(map: Map<string, V>) {
    this.map = map;
    this.entries = this.map.entries();
  }
  public next(): IteratorResult<[K, V]> {
    const n = this.entries.next();
    return {
      done: n.done,
      value: [JSON.parse(n.value[0]), n.value[1]],
    };
  }
  *[Symbol.iterator](): IterableIterator<[K, V]> {
    for (const i of this.map) {
      const [k, v] = i;
      yield [JSON.parse(k), v];
    }
  }
}
export class KeysIterator<K, V> {
  private map: Map<string, V>;
  private keys: IterableIterator<string>;
  constructor(map: Map<string, V>) {
    this.map = map;
    this.keys = this.map.keys();
  }
  public next(): IteratorResult<K> {
    const n = this.keys.next();
    return {
      done: n.done,
      value: JSON.parse(n.value),
    };
  }
  *[Symbol.iterator](): IterableIterator<K> {
    for (const i of this.map) {
      const [k] = i;
      yield JSON.parse(k);
    }
  }
}
