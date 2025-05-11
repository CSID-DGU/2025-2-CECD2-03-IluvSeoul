// queryLoader.js
import fs from 'fs';
import path from 'path';

export class QueryMap {
    private data: Map<string, Map<string, string>>;
    constructor() {
        this.data = new Map();
    }

    public put(namespace: string, name: string, query: string): void {
        if (!this.data.has(namespace)) {
            this.data.set(namespace, new Map());
        }
        this.data.get(namespace).set(name, query);
    }

    public get(namespace: string, name: string): string {
        if (!this.data.has(namespace)) {
            return null;
        }
        if (!this.data.get(namespace).has(name)) {
            return null;
        }
        return this.data.get(namespace).get(name);
    }
}

export function loadQueries(baseDir: string): QueryMap {
    const queryMap = new QueryMap();

    function traverseDirectory(currentPath: string, namespace: string) {
        const files = fs.readdirSync(currentPath);

        files.forEach(file => {
            const filePath = path.join(currentPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                traverseDirectory(filePath, namespace.length > 0 ? `${namespace}.${file}` : file);
            } else if (stat.isFile() && path.extname(file) === '.sql') {
                const queryName = path.basename(file, '.sql');
                const query = fs.readFileSync(filePath, 'utf-8').trim();

                queryMap.put(namespace, queryName, query);
            }
        });
    }

    traverseDirectory(baseDir, '');

    return queryMap;
}

export default QueryMap;
