export interface Database {
    initialize: (routes: Route[]) => void
    getRoute: (from: string, to: string) => Route
    getPath: (seqeunce: string) => Route[]
    getSimplifiedPath: (routes: Route[]) => string
    searchPaths: (from: string, to: string, maxStep?: number) => Route[][],
    searchPathsByCost: (from: string, to:string, maxCost: number) => Route[][],
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

        getPathCost: (input) => deps.routeManager.getPathCost(deps.database.getPath(input)),

        getPathCount: (from, to, maxStep = -1) => deps.database.searchPaths(from, to, maxStep).length,

        getPathCountDupplicate: (from, to, maxCost) => deps.database.searchPathsByCost(from, to, maxCost).length,

        getMinCost: (from, to) => {
            return Math.min.apply(null, deps.database.searchPaths(from, to).map(path => deps.routeManager.getPathCost(path)))
        }
    }
}
