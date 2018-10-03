import { Database, Route } from "./program";

let _routes = []

const getRoute = (from, to) => _routes.find((r) => r.from === from && r.to === to)

const getPath = (sequence) => {
    let fromIndex = 0
    let toIndex = 1
    const path: Route[] = []

    while(fromIndex < sequence.length - 1) {
        const route = getRoute(sequence[fromIndex], sequence[toIndex])
        if(route === undefined)
            return []

        path.push(route)
        fromIndex++
        toIndex++
    }

    return path
}

const isSameRoute = (a: Route, b: Route): boolean => a.from === b.from && a.to === b.to

const getRouteFrom = (from: string): Route[] => _routes.filter((r) => r.from == from)

const _searchPaths = (from: string, to: string, routes: Route[], usedRoutes: Route[], pathSequenceList: string[], currentPath: string[], maxStep: number) => {

    currentPath.push(from)

    if(from === to && currentPath.length > 1) {
        pathSequenceList.push(currentPath.join(""))
    }
    else if(maxStep < 0 || currentPath.length - 1 < maxStep) {
        const nextRoutes = getRouteFrom(from).filter(route => usedRoutes.find(r => isSameRoute(r, route)) == undefined)
        for(let route of nextRoutes) {
            usedRoutes.push(route)
            _searchPaths(route.to, to, routes, usedRoutes, pathSequenceList, currentPath, maxStep)
        }

    }
    
    currentPath.pop()
    usedRoutes.pop()
}

const db: Database = {

    initialize: (routes) => _routes = routes,

    getRoute,

    getPath,

    getSimplifiedPath: (routes) => routes.reduce((sequence, route) => sequence + route.to, routes[0].from),

    searchPaths: (from, to, maxStep = -1) => {
        let pathSequenceList = []
        _searchPaths(from, to, _routes, [], pathSequenceList, [], maxStep)

        return pathSequenceList.map(path => getPath(path))
    }
}

export default db