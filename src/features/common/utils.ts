import {Coordinates} from "../position/positionSlice";

export const timeFormat = (dateTimeString: string): string => dateTimeString.slice(11, 16)

//haversine formula
//https://www.movable-type.co.uk/scripts/latlong.html
const EARTH_MEAN_RADIUS_METRES = 6371e3
const deg2Rad = (deg: number): number => deg * Math.PI / 180
export const distanceFormula = (c: number): number => c * EARTH_MEAN_RADIUS_METRES
export const subFormulaC = (a: number): number => 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
export const subFormulaA = (phi1: number, phi2: number, deltaPhi: number, deltaLambda: number): number => Math.sin(deltaPhi / 2)
    * Math.sin(deltaPhi / 2)
    + Math.cos(phi1)
    * Math.cos(phi2)
    * Math.sin(deltaLambda / 2)
    * Math.sin(deltaLambda / 2)
export const getParams = (coords1: Coordinates, coords2: Coordinates): [number, number, number, number] => [
    deg2Rad(coords1.latitude),
    deg2Rad(coords2.latitude),
    deg2Rad(coords2.latitude - coords1.latitude),
    deg2Rad(coords2.longitude - coords1.longitude)
]

export const getDistanceInMeters = (coords1: Coordinates, coords2: Coordinates): number => {
    const a = subFormulaA(...getParams(coords1, coords2))
    console.log(a)
    return Math.round(distanceFormula(subFormulaC(subFormulaA(...getParams(coords1, coords2)))))
}