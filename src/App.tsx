import React, {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import usePosition from "./features/position/usePosition";
import useLeafletMarker from "./features/common/useLeafletMarker";

const Home = React.lazy(() => import("./features/home/Home"))
const StopMap = React.lazy(() => import("./features/map/StopMap"))


function App() {
    useLeafletMarker()
    usePosition()

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
