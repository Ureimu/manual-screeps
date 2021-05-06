export class SetTools {
    public static reverseSet<T>(set: Set<T>): Set<T> {
        const mList: T[] = [];
        set.forEach(posStr => {
            mList.push(posStr);
        });
        set = new Set(mList.reverse());
        return set;
    }

    public static mergeSet<T>(a: Set<T>, b: Set<T>): Set<T> {
        const c = new Set<T>(a.keys());
        const d = new Set<T>(b.keys());
        c.forEach(vars => {
            d.add(vars);
        });
        return d;
    }

    public static copySet<T>(a: Set<T>): Set<T> {
        return new Set<T>(a.keys());
    }

    public static compareSet<T>(
        a: Set<T>,
        b: Set<T>,
        relation: { [key in SetRelation]?: boolean }
    ): { [key in SetRelation]?: Set<T> } {
        const returnRelation: { [key in SetRelation]?: Set<T> } = {};
        const aCopy = new Set<T>(a.keys());
        const bCopy = new Set<T>(b.keys());
        if (relation["a-b"]) {
            const aCopy2 = new Set<T>(a.keys());
            bCopy.forEach(value => {
                aCopy2.delete(value);
            });
            returnRelation["a-b"] = aCopy2;
        }
        if (relation["b-a"]) {
            const bCopy2 = new Set<T>(b.keys());
            aCopy.forEach(value => {
                bCopy2.delete(value);
            });
            returnRelation["b-a"] = bCopy2;
        }
        if (relation["a+b"]) {
            const bCopy2 = new Set<T>(b.keys());
            aCopy.forEach(value => {
                bCopy2.add(value);
            });
            returnRelation["a+b"] = bCopy2;
        }
        // a*b = a+b - (a-b) - (b-a),O(n) 比遍历比较(O(n^2))要快
        if (relation["a*b"]) {
            returnRelation["a*b"] = this.intersect(aCopy, bCopy);
        }
        return returnRelation;
    }

    public static subtract<T>(a: Set<T>, b: Set<T>): Set<T> {
        const aCopy = new Set<T>(a.keys());
        const bCopy = new Set<T>(b.keys());
        bCopy.forEach(value => {
            aCopy.delete(value);
        });
        return aCopy;
    }

    public static union<T>(a: Set<T>, b: Set<T>): Set<T> {
        const aCopy = new Set<T>(a.keys());
        const bCopy = new Set<T>(b.keys());
        bCopy.forEach(value => {
            aCopy.add(value);
        });
        return aCopy;
    }

    public static intersect<T>(a: Set<T>, b: Set<T>): Set<T> {
        // a*b = a+b - (a-b) - (b-a),O(n) 比遍历比较(O(n^2))要快
        const aCopy = new Set<T>(a.keys());
        const bCopy = new Set<T>(b.keys());
        const union = this.union(aCopy, bCopy);
        const minus1 = this.subtract(aCopy, bCopy);
        const minus2 = this.subtract(bCopy, aCopy);
        return this.subtract(this.subtract(union, minus1), minus2);
    }
}

type SetRelation = "a-b" | "b-a" | "a+b" | "a*b";
