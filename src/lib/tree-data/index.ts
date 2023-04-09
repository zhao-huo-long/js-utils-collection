
/**
 * TreeData
 */
export class TreeData extends Array {
  constructor(tree: Record<string, unknown>[] = [], private readonly relationKey = 'children') {
    super(tree.length)
    Object.assign(this, tree)
  }

  *[Symbol.iterator]() {
    const { relationKey } = this
    const stack = this.map(i => i)
    while (stack.length) {
      const i = stack.shift()
      stack.unshift(...(i[relationKey] || []))
      yield i
    }
  }

  *iteratorWithRelation() {
    const { relationKey } = this
    const stack = this.map(i => i)
    const contextStack: Record<string, unknown>[][] = [];
    while (stack.length) {
      const item = stack.shift()!;
      const context = contextStack.shift() || [];
      if (Array.isArray(item?.[relationKey])) {
        stack.unshift(...(item?.[relationKey] || []));
        contextStack.unshift(
          ...new Array(item?.[relationKey].length).fill([...context, item])
        );
      }
      yield { ...item, parents: [...context] }
    }
  }

  findByProp(prop: string, value: unknown) {
    for (const i of this) {
      if (i[prop] === value) {
        return i
      }
    }
    return null
  }
}
