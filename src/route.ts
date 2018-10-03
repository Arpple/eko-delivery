import { Route, RouteManager } from "./program";

const manager: RouteManager = {
    create: (input) => ({
        from: input[0],
        to: input[1],
        cost: parseInt(input.slice(2)),
    }),

    getPathCost: (path) => path.reduce((total, route) => total + route.cost, 0)
}

export default manager