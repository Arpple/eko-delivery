import { createProgram } from "./program"
import database from "./database"
import route from "./route"

import * as readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const prog = createProgram({
    database,
    routeManager: route
})

const case1 = () => {
    rl.question("enter path to calculate cost in format 'ABCDE': ", (path) => {
        const cost = prog.getPathCost(path)
        if(cost > 0)
            console.log(cost)
        else
            console.log("No Such Route")

        process.exit()
    })
}

const case2 = () => {
    rl.question("enter start, end point and maximum step allow (-1 for infinite) in format 'AB 4' : ", (path) => {
        const max = path.length > 2
            ? parseInt(path.slice(2).trim())
            : -1

        console.log(prog.getPathCount(path[0], path[1], max))

        process.exit()
    })
}

const case3 = () => {
    rl.question("enter start, end point in format 'AB' : ", (path) => {
        console.log(prog.getMinCost(path[0], path[1]))

        process.exit()
    })
}

rl.question("please enter routes data : ", (routeStr) => {
    prog.readRouteInput(routeStr.trim())

    switch(process.argv[2]) {
        case "1":
            case1()
            break

        case "2":
            case2()
            break

        case "3":
            case3()
            break

        default:
            console.log("invalid input")
    }
})