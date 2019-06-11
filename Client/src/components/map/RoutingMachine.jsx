import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";
import 'leaflet-control-geocoder'
class Routing extends MapLayer {
  createLeafletElement() {
    const setDisTime=this.props.setDisTime;
    const { map, from, to ,route} = this.props;
    if (route) route.remove(map);
    console.log(from)
    var distance = 0;
    console.log(to + "dfsdfsfsddfsfdsfds");
    // console.log( L.Control.Geocoder.nominatim());
    let leafletElement = L.Routing.control({    
      waypoints: [  
      L.latLng(from[0],from[1]),
      L.latLng(to[0],to[1])],
      geocoder: L.Control.Geocoder.nominatim(),
      routeWhileDragging: true,
    }).addTo(map.leafletElement).on('routesfound', function (e) {
    // distance = e.routes[0].summary.totalDistance;
      // min = e.routes[0].summary.totalTime;
      setDisTime(e.routes[0].summary.totalDistance,e.routes[0].summary.totalTime);
// console.log(distance)

    });
this.props.setRoute(leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
