import {useEffect} from "react";

const useLeafletMarker = () => {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const L = require("leaflet");
        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, []);
}

export default useLeafletMarker