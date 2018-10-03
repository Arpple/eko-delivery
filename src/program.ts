export interface Database {
    initialize: (routes: Route[]) => void
    getRoute: (from: string, to: string) => Route
    getPath: (seqeunce: string) => Route[]
}

export interface Route {
    from: string
    to: string
    cost: number
}

export interface RouteManager {
    create: (input: string) => Route
    getPathCost: (path: Route[]) => number
}

interface InputReaderDependencies {
    database: Database,
    routeManager: RouteManager
}

export const createProgram = (deps: InputReaderDependencies) => {

    return {
        readRouteInput: (input) => {
            deps.database.initialize(
                input.split(",")
                    .map(routeStr => routeStr.trim())
                    .map(routeStr => deps.routeManager.create(routeStr))
            )
        },

        getPathCost: (input) => deps.routeManager.getPathCost(deps.database.getPath(input))
    }
}
