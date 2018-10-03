import { assert } from "chai"
import { createProgram } from "./program"
import database from "./database"
import route from "./route"

describe("sample test case", () => {

    const prog = createProgram({
        database,
        routeManager: route
    })

    beforeEach(() => {
        prog.readRouteInput("AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1")
    })
   
    describe("case1: calcualte path cost", () => {
        it("ABE", () => {
            assert.equal(prog.getPathCost("ABE"), 4)
        })

        it("AD", () => {
            assert.equal(prog.getPathCost("AD"), 10)
        })

        it("EACF", () => {
            assert.equal(prog.getPathCost("EACF"), 8)
        })

        it("ADF", () => {
            assert.equal(prog.getPathCost("ADF"), 0)
        })
    })

    describe("case2: count possible path", () => {
        it("ED with max 4", () => {
            assert.equal(prog.getPathCount("E", "D", 4), 4)
        })

        it("EE", () => {
            assert.equal(prog.getPathCount("E", "E"), 5)
        })

        it("EE with max cost 20", () => {
            assert.equal(prog.getPathCountDupplicate("E", "E", 20), 29)
        })
    })

    describe("case3: minimum cost", () => {
        it("ED", () => {
            assert.equal(prog.getMinCost("E", "D"), 9)
        })

        it("EE", () => {
            assert.equal(prog.getMinCost("E", "E"), 6)
        })
    })
})