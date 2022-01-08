import {getDistanceInMeters, getParams, subFormulaA, subFormulaC} from "./utils";
import {Coordinates} from "../position/positionSlice";


test('expects correct distance', () => {
    // given
    const papiesz: Coordinates = {latitude: 41.90218803264449, longitude: 12.454085406992665}
    const coords2: Coordinates = {latitude: 41.92136787215122, longitude: 12.45566640018914}

    // when
    const distance = getDistanceInMeters(papiesz, coords2)

    // then
    expect(distance).toEqual(2137)
})

test('should execute', () => {
    const papiesz: Coordinates = {latitude: 41.90218803264449, longitude: 12.454085406992665}
    const coords2: Coordinates = {latitude: 41.92136787215122, longitude: 12.45566640018914}

    const params = getParams(papiesz, coords2)
    const a = subFormulaA(...params)
    console.log(params)
    console.log(a)
})

test('distance should be equal to zero', () => {
    // given
    const coords: Coordinates = {latitude: 41.90218803264449, longitude: 12.454085406992665}

    // when
    const distance = getDistanceInMeters(coords, coords)

    // then
    expect(distance).toEqual(0)
})