import { assert } from "chai"
import { createProgram, Database, RouteManager, Route } from "./program"
import { Substitute, Arg } from '@fluffy-spoon/substitute';

describe("inputReader", () => {

    const database = Substitute.for<Database>()   
    const routeManager = Substitute.for<RouteManager>()

    const reader = createProgram({
        database,
        routeManager
    })

    it("readRoutes() call createRoute from input", () => {
        reader.readRouteInput("AB1, AC4")

        routeManager.received().create("AB1")
        routeManager.received().create("AC4")

        database.received().initialize(Arg.any())
    })

    it("getPathCost() get path from database and calculate with route manager", () => {
        const mockPath = [Substitute.for<Route>()]
        database.getPath(Arg.any()).returns(mockPath)

        routeManager.getPathCost(Arg.is(x => x === mockPath)).returns(5)

        assert.equal(reader.getPathCost("ABC"), 5)
    })
})