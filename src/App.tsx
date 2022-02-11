import React, {Suspense, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import usePosition from "./features/position/usePosition";
import useLeafletMarker from "./features/common/useLeafletMarker";
import {fetchClosestStops} from "./features/stop/stopSlice";
import {fetchAllVehicles} from "./features/vehicle/vehicleSlice";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {selectCoordinates} from "./features/position/positionSlice";

const Home = React.lazy(() => import("./features/home/Home"))
const StopMap = React.lazy(() => import("./features/map/StopMap"))

function App() {
    useLeafletMarker()
    usePosition()
    const dispatch = useAppDispatch()
    const coordinates = useAppSelector(selectCoordinates)

    useEffect(() => {
        dispatch(fetchAllVehicles())
        dispatch(fetchClosestStops(coordinates))
    }, [coordinates])

    return (
        <>
            <BrowserRouter>
                <Suspense fallback={"Loading..."}>
                    <Routes>
                        <Route path={"/home"} element={<Home/>}/>
                        <Route path={"/map"} element={<StopMap/>}/>
                        <Route path={"/"} element={<Home/>}/>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
}

export default App;
