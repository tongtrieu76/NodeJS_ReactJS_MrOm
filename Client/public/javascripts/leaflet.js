// error 1 : fix bug warring console khi load map refresh
// var container = L.DomUtil.get("mapid");
// if (container != null) {
//   container._leaflet_id = "";
// }
// end error 1.

var mymap = new L.map("mapid").setView([40.776, -73.972], 16);
L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox.streets", //streets,satellite
    accessToken:
      "pk.eyJ1IjoiY2hpZXVjaGlldSIsImEiOiJjanZhazdpaWUwa3puM3lubTY1MGJ0azhkIn0.X4Q45YxQ2HUGCjXBDCkahQ",
    zoom: 16,
    minZoom: 10,
    maxZoom: 18,
    maxNativeZoom: 20,
    zoomAnimation: true
  }
).addTo(mymap);

var x = 0,
  y = 0;
var market;

// icon xe
var icon_book = L.icon({
  iconUrl: '../images/car.png',
  iconSize: [30,65]
})
//

// arr xe dang gan day
var arr = []; //bus(10.7669435,106.69505219999999),bus(10.7669445,106.69505219999999),bus(10.7669455,106.69505219999999)
//

// load map
navigator.geolocation.getCurrentPosition(showcoor);
function showcoor(pos) {
  var coord = pos.coords;
  var long = coord.longitude;
  var lat = coord.latitude;
  x = lat;y = long;
  mymap.setView([lat, long], 16);
  marker = L.marker([lat, long]).addTo(mymap);
  marker.bindPopup("<b>Bạn đang ở đây.</b>").openPopup();

  var bus = L.marker([10.7679435,106.69505219999999],{icon: icon_book}).addTo(mymap);
};
//

//event click vị trí của tôi
document.getElementById("get_my_location").onclick = function getlocate() {
  marker.openPopup();
  // alert(x + "," + y);
  mymap.setView([x, y], 16);
};
//

document.getElementById("btn-timxe").onclick = ()=>{
  alert("Đã bấm vào tìm xe!");
}
