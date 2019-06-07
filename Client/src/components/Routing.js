import {MapLayer,withLeaflet} from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet-routing-machine';

    
import L from 'leaflet';
import 'leaflet-routing-machine';

class RoutingMachine extends MapLayer {
  createLeafletElement() {
    // const setDisTime=this.props.setDisTime;
    // const {map, from,to } = this.props;
    const {map, from,to,route } = this.props;
    if (route) route.remove(map);
    console.log(map);
    // console.log(L.Routing)
   
  
    // if (route) route.remove(map);
    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(from[0],from[1]),
        L.latLng(to[0],to[1]),
    ],
      altLineOptions: { styles: [{opacity: 0}] },
      createMarker: () => { return null; }
    })
    .addTo(map.leafletElement)
    this.props.setRoute(leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(RoutingMachine);
