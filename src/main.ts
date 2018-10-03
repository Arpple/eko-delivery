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

rl.question("please enter routes data : ", (routeStr) => {
    prog.readRouteInput(routeStr.trim())

    rl.question("enter path to calculate : ", (path) => {
        const cost = prog.getPathCost(path)
        if(cost > 0)
            console.log(cost)
        else
            console.log("No Such Route")

        process.exit()
    })
})