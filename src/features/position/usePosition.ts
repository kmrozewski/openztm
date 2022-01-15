import {positionError, selectCoordinates, updateAccuracy, updateCoordinates} from "./positionSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useCallback, useEffect} from "react";


const usePosition = () => {
    const dispatch = useAppDispatch()
    const oldCoords = useAppSelector(selectCoordinates)

    const isDifferent = useCallback((newCoords: GeolocationCoordinates) => {
        return oldCoords.latitude !== newCoords.latitude && oldCoords.longitude !== newCoords.longitude
    }, [oldCoords])

    const onChange = useCallback((position: GeolocationPosition) => {
        const coords = position.coords
        if (isDifferent(coords)) {
            dispatch(updateCoordinates({latitude: coords.latitude, longitude: coords.longitude}))
            dispatch(updateAccuracy(coords.accuracy))
        }
    }, [isDifferent])

    const onError = useCallback((error: GeolocationPositionError) => {
        dispatch(positionError(error.message))
    }, [])

    useEffect(() => {
        const geo = navigator.geolocation

        if (!geo) {
            dispatch(positionError("Geolocation turned off"))
        }

        const watcher = geo.watchPosition(onChange, onError, {
            maximumAge: 15000,
            timeout: 12000,
        })

        return () => geo.clearWatch(watcher)
    }, [oldCoords])

}

export default usePosition