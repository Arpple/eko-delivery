import { assert } from "chai"
import { createProgram, Database, RouteManager, Route } from "./program"
import { Substitute, Arg } from '@fluffy-spoon/substitute';

describe("inputReader", () => {

    let database = Substitute.for<Database>()   
    let routeManager = Substitute.for<RouteManager>()

    let program = createProgram({
        database,
        routeManager
    })

    beforeEach(() => {
        database = Substitute.for<Database>()   
        routeManager = Substitute.for<RouteManager>()

        program = createProgram({
            database,
            routeManager
        })
    })

    it("readRoutes() call createRoute from input", () => {
        program.readRouteInput("AB1, AC4")

        routeManager.received().create("AB1")
        routeManager.received().create("AC4")

        database.received().initialize(Arg.any())
    })

    it("getPathCost() get path from database and calculate with route manager", () => {
        const mockPath = [Substitute.for<Route>()]
        database.getPath(Arg.any()).returns(mockPath)

        routeManager.getPathCost(Arg.is(x => x === mockPath)).returns(5)

        assert.equal(program.getPathCost("ABC"), 5)
    })

    it("getPathCount() count path possible", () => {
        const paths = [
            [Substitute.for<Route>()], 
            [Substitute.for<Route>(), Substitute.for<Route>()]
        ]

        database.searchPaths(Arg.is(x => x == "A"), Arg.is(x => x == "B"), Arg.any()).returns(paths)

        assert.equal(program.getPathCount("A", "B"), 2)
    })

    // it("getMinCost()", () => {
    //     const r1 = Substitute.for<Route>()
    //     const r2 = Substitute.for<Route>()
    //     const r3 = Substitute.for<Route>()

    //     database.searchPaths(Arg.any()).returns([[r1], [r2, r3]])
    //     routeManager.getPathCost(Arg.is(path => path.find(r => r == r1) != undefined)).returns(100)
    //     routeManager.getPathCost(Arg.is(path => path.find(r => r == r2) != undefined)).returns(3)

    //     assert.equal(program.getMinCost("A", "B"), 3)
    // })
})