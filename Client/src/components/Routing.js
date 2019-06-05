import {MapLayer,withLeaflet} from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet-routing-machine';

    
import * as L from 'leaflet';
import 'leaflet-routing-machine';

class RoutingMachine extends MapLayer {
  createLeafletElement() {
    // const setDisTime=this.props.setDisTime;
    const {map, from,to } = this.props;
    console.log(map);
    // console.log(L.Routing)
    let waypoints = [ L.latLng(from[0],from[1]), L.latLng(to[0],to[1])]
  
    // if (route) route.remove(map);
    let leafletElement = L.Routing.control({
      waypoints: waypoints,
    draggableWaypoints : false,//to set draggable option to false
    addWaypoints : false //disable adding new waypoints to the existing path 
    
    })
    .addTo(map.leafletElement).on('routesfound', function (e) {
      console.log(e);
      // distance = e.routes[0].summary.totalDistance;
      // min = e.routes[0].summary.totalTime;
   //   setDisTime(e.routes[0].summary.totalDistance,e.routes[0].summary.totalTime);
});
    // this.props.setRoute(leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(RoutingMachine);
