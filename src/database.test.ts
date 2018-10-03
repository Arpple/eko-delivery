import { assert } from "chai"
import database from "./database"

describe("database", () => {

    beforeEach(() => {
        database.initialize([
            { from: "A", to: "B", cost: 1 },
            { from: "A", to: "C", cost: 4 },
            { from: "A", to: "D", cost: 10 },
            { from: "B", to: "E", cost: 3 },
            { from: "C", to: "D", cost: 4 },
            { from: "C", to: "F", cost: 2 },
            { from: "D", to: "E", cost: 1 },
            { from: "E", to: "B", cost: 3 },
            { from: "E", to: "A", cost: 2 },
            { from: "F", to: "D", cost: 1 },
        ])
    })

    it("getRoute() return route of specific nodes", () => {
        assert.deepEqual(database.getRoute("A", "B"), { from: "A", to: "B", cost: 1 })
        assert.deepEqual(database.getRoute("B", "E"), { from: "B", to: "E", cost: 3 })
    })

    it("getRoute() return undefined if not found", () => {
        assert.isUndefined(database.getRoute("D", "F"))
        assert.isUndefined(database.getRoute("A", "F"))
    })

    it("getPath() get route[] from sequence path", () => {
        assert.deepEqual(database.getPath("ABE"), [
            { from: "A", to: "B", cost: 1 },
            { from: "B", to: "E", cost: 3 },
        ])
        assert.deepEqual(database.getPath("ACB"), [])
    })

    it("getSimplifiedPath() return sequence code of path", () => {

        assert.equal(
            database.getSimplifiedPath([
                { from: "A", to: "B", cost: 1 },
                { from: "B", to: "E", cost: 3 },
            ]),
            "ABE",
        )
    })

    it("searchPaths() get all possible path without using same route twice", () => {
        const paths = database.searchPaths("E", "E").map(database.getSimplifiedPath)
        assert.includeDeepMembers(paths, [
            "EBE",
            "EABE",
            "EADE",
            "EACDE",
            "EACFDE",
        ])
    })

    it("searchPaths() with limit step", () => {
        const paths = database.searchPaths("E", "D", 4).map(database.getSimplifiedPath)
        assert.includeDeepMembers(paths, [
            "EBEAD",
            "EAD",
            "EACD",
            "EACFD",
        ])
    })

    it("searchPathByCost()", () => {
        const paths = database.searchPathsByCost("E", "E", 20)
        assert.equal(paths.length, 29)
    })
})