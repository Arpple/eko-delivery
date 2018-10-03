import { assert } from "chai"
import route from "./route"

describe("route", () => {
    
    it("create() create Route object from string", () => {
        assert.deepEqual(route.create("AB1"), { from: "A", to: "B", cost: 1 })
        assert.deepEqual(route.create("AD10"), { from: "A", to: "D", cost: 10 })
    })

    it("getTotalCost() get sum cost of routes", () => {
        assert.equal(
            route.getPathCost([
                { from: "A", to: "B", cost: 1 },
                { from: "B", to: "C", cost: 3 }
            ]),
            4
        )

        assert.equal(route.getPathCost([]), 0)
    })
})