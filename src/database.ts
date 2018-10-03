import { Database, Route } from "./program";

const getRoute = (routes, from, to) => routes.find((r) => r.from === from && r.to === to)

let _routes = []

const db: Database = {

    initialize: (routes) => _routes = routes,

    getRoute: (from, to) => getRoute(_routes, from, to),

    getPath: (sequence) => {
        let fromIndex = 0
        let toIndex = 1
        const path: Route[] = []

        while(fromIndex < sequence.length - 1) {
            const route = getRoute(_routes, sequence[fromIndex], sequence[toIndex])
            if(route === undefined)
                return []

            path.push(route)
            fromIndex++
            toIndex++
        }

        return path
    }
}

export default db