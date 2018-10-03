import { assert } from "chai"
import database from "./database"

describe("database", () => {

    beforeEach(() => {
        database.initialize([
            { from: "A", to: "B", cost: 1 },
            { from: "B", to: "C", cost: 2 },
        ])
    })

    it("getRoute() return route of specific nodes", () => {
        assert.deepEqual(database.getRoute("A", "B"), { from: "A", to: "B", cost: 1 })
        assert.deepEqual(database.getRoute("B", "C"), { from: "B", to: "C", cost: 2 })
    })

    it("getRoute() return undefined if not found", () => {
        assert.isUndefined(database.getRoute("D", "E"))
        assert.isUndefined(database.getRoute("A", "C"))
    })

    it("getPath() get route[] from sequence path", () => {
        assert.deepEqual(database.getPath("ABC"), [
            { from: "A", to: "B", cost: 1 },
            { from: "B", to: "C", cost: 2 },
        ])
        assert.deepEqual(database.getPath("ACB"), [])
    })
})