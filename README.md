# Eko Delivery Service
checklist
- [x] case 1
- [x] case 2
- [ ] case 2 bonus
- [x] case 3

## installation
- install dependency  
`npm install`

- compile typescript  
`npm run build`

## usage
- run the program
`npm run start [use case number (1-3)]`
  - ex: to run case 1 `npm run start 1`

- enter the route data in format `ABnn` for route from town **A** to **B** with distance **nn**
  - example data as a string here `AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1`

- case 1:
  - enter the path to calculate delivery cost in format `ABCDE` for path from **A to B to C to D to E**

- case 2:
  - enter start, end point and maximum step allow (-1 for infinite) in format `AB 4`

- case 3:
  - enter start and end point in format `AB`