navigator.geolocation.getCurrentPosition(getposition); // on récupère la position gps de l'utilisateur

let myMap; // on déclare une variable pour notre carte
const mappa = new Mappa("Leaflet"); // on fait appel à la librairie js Leaflet

// variables pour récupérer la position gps de l'utilisateur
var position;
let userLat = 47.14748855793256;
let userLon = -1.5316817974753112;

let mousePos;

// coordonnées de l'edna
let edna_lat = 48.85264680801034;
let edna_lng = 2.3497472367157473;

// BEAUJOIRE
let zone1_lat = 47.25618350185474; // latitude
let zone1_lng = -1.524685728835956; // longitude

// BOUTIQUE
let zone2_lat = 47.256431085586; // latitude
let zone2_lng = -1.5265740039643265; // longitude

// BOUTIQUE (marché de noël)
let zone3_lat = 47.21314061529943; // latitude
let zone3_lng = -1.5581126357043025; // longitude

// STADE RENNAIS
let zone4_lat = 48.10751585769294; // latitude
let zone4_lng = -1.7131369923738093; // longitude

// MARCEL SAUPIN
let zone5_lat = 47.212915830794834; // latitude
let zone5_lng = -1.5381391731869816; // longitude

// CENTRE DE FORMATION
let zone6_lat = 47.26039097229387; // latitude
let zone6_lng = -1.5428687168601851;

// LIEU DE CRÉATION
let zone7_lat = 47.22285320891437; // latitude
let zone7_lng = -1.5519728475507601; // longitude

// TERASSES DE L'ERDRE
let zone8_lat = 47.26004815177255; // latitude
let zone8_lng = -1.5325161027883494; // longitude

// position de départ = cité des congrès
let initial_lat = 47.22285320891437; // latitude de départ
let initial_lng = -1.5646817613361534; // longitude de départ

// variables pour notre avatar
let avatarLat;
let avatarLng;
let avatarPos;
let avatarPosX;
let avatarPosY;

// Calcul des distances
let distance_edna_avatar;
let distance_source1_avatar;
let distance_zone1_avatar;

// variables qui vont nous permettre de dessiner les zones
let diametreSource1_lat = 47.199044159443524;
let diametreSource1_lng = -1.561260223388672;

// audio
let sound1;
let volume_sound1;
let sound2;
let volume_sound2;
let sound3;
let volume_sound3;
let sound4;
let volume_sound4;

//nos images
let zone1_img;

// déplacement de l'avatar
let avatar_easing_lat = initial_lat;
let avatar_easing_lng = initial_lng;
let avatar_target_lat = initial_lat;
let avatar_target_lng = initial_lng;
let easing = 0.05;

let zone2_img;
let zone3_img;
let zone4_img;
let zone5_img;
let zone6_img;
let zone7_img;
let zone8_img;

let avatar_img;

function preload() {
  sound1 = loadSound("assets/beaujoire.mp3");
  zone1_img = loadImage("assets/beaujoire 2.png");
  sound2 = loadSound("assets/money.mp3");
  zone2_img = loadImage("assets/boutique.png");
  sound3 = loadSound("assets/noel.mp3");
  zone3_img = loadImage("assets/boutique.png");
  sound4 = loadSound("assets/bouh.mp3");
  zone4_img = loadImage("assets/beaujoire 2.png");
  zone5_img = loadImage("assets/beaujoire 2.png");
  zone6_img = loadImage("assets/beaujoire 2.png");
  zone7_img = loadImage("assets/beaujoire 2.png");
  zone8_img = loadImage("assets/beaujoire 2.png");
  avatar_img = loadImage("assets/ririlecanaris.png");
}

// Lets put all our map options in a single object
// lat and lng are the starting point for the map.
const options = {
  lat: initial_lat,
  lng: initial_lng,
  zoom: 13, // zoom de départ
  style: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  // Create a tile map with the options declared
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  textAlign(CENTER);
  imageMode(CENTER);
  sound1.loop(); //On joue en boucle le son 1
  sound1.amp(0);
  sound2.loop(); //On joue en boucle le son 2
  sound2.amp(0);
  sound3.loop(); //On joue en boucle le son 3
  sound3.amp(0);
  sound4.loop(); //On joue en boucle le son 3
  sound4.amp(0);
} // fin de la fonction setup

function getposition(position) {
  userLat = position.coords.latitude;
  userLon = position.coords.longitude;
}

function draw() {
  // Clear the previous canvas on every frame
  clear();

  mousePos = myMap.fromPointToLatLng(mouseX, mouseY); // on convertit la position de la souris en coordonnées gps
  let edna = myMap.latLngToPixel(47.2040006, -1.5630606); // on convertit la position gps en position XY
  let userPos = myMap.latLngToPixel(userLat, userLon); // idem
  let zone1Pos = myMap.latLngToPixel(zone1_lat, zone1_lng); // on convertit la position gps vers une position XY
  let zone2Pos = myMap.latLngToPixel(zone2_lat, zone2_lng); // on convertit la position gps vers une position XY
  let zone3Pos = myMap.latLngToPixel(zone3_lat, zone3_lng);
  let zone4Pos = myMap.latLngToPixel(zone4_lat, zone4_lng);
  let zone5Pos = myMap.latLngToPixel(zone5_lat, zone5_lng);
  let zone6Pos = myMap.latLngToPixel(zone6_lat, zone6_lng);
  let zone7Pos = myMap.latLngToPixel(zone7_lat, zone7_lng);
  let zone8Pos = myMap.latLngToPixel(zone8_lat, zone8_lng);
  if (mouseIsPressed) {
    avatarPos = myMap.latLngToPixel(mousePos.lat, mousePos.lng); // on récupère la position en pixels de la position gps de l'avatar
    avatarPosX = avatarPos.x; // on met à jour avatarPosX
    avatarPosY = avatarPos.y; // on met à jour avatarPosY
    avatarLat = mousePos.lat; // on met à jour avatarLat
    avatarLng = mousePos.lng; // on met à jour avatarLng
    print("mousePos.lat = " + mousePos.lat);
    print("mousePos.lng = " + mousePos.lng);
    avatar_target_lat = mousePos.lat;
    avatar_target_lng = mousePos.lng;
    distance_edna_avatar =
      abs(edna_lat - avatarLat) + abs(edna_lng - avatarLng);
    print("distance_edna_avatar = " + distance_edna_avatar);
  } // fin de mousePressed

  let dx = avatar_target_lat - avatar_easing_lat;
  avatar_easing_lat += dx * easing;

  let dy = avatar_target_lng - avatar_easing_lng;
  avatar_easing_lng += dy * easing;
  let avatarEasing = myMap.latLngToPixel(avatar_easing_lat, avatar_easing_lng);
  //fin du calcul

  /*
  if(abs(edna_lat-mousePos.lat)<0.005 && abs(edna_lng-mousePos.lng)<0.005){
    print("l'utilisateur est entré dans la zone de l'EDNA")
  }
  */

  /////////////////////////////
  // EDNA /////////////////////
  /////////////////////////////

  // abs permet de calculer une valeur qui sera toujours positive pour obtenir la distance entre le centre de la zone 1 et la souris
  if (distance_edna_avatar < 0.005) {
    print("l'avatar est entré dans la zone de l'EDNA");
  }
  // si on sort de la zone
  if (distance_edna_avatar > 0.005) {
    print("l'avatar est sorti de la zone de l'EDNA");
  }

  /////////////////////////////
  // ZONE 1 ///////////////////
  /////////////////////////////

  distance_zone1_avatar =
    abs(zone1_lat - avatar_easing_lat) + abs(zone1_lng - avatar_easing_lng);

  if (distance_zone1_avatar < 0.00525705805429455) {
    volume_sound1 = map(distance_zone1_avatar, 0, 0.00525705805429455, 1, 0);
    sound1.amp(volume_sound1);

    //print("l'avatar est entré dans la zone 1")
  }

  if (distance_zone1_avatar > 0.00525705805429455) {
    sound1.amp(0);
  }

  /////////////////////////////
  // ZONE 2 ///////////////////
  /////////////////////////////

  distance_zone2_avatar =
    abs(zone2_lat - avatar_easing_lat) + abs(zone2_lng - avatar_easing_lng);

  if (distance_zone2_avatar < 0.00525705805429455) {
    volume_sound2 = map(distance_zone2_avatar, 0, 0.00525705805429455, 1, 0);
    sound1.amp(volume_sound2);

    //print("l'avatar est entré dans la zone 2")
  }

  if (distance_zone2_avatar > 0.00525705805429455) {
    sound2.amp(0);
  }

  /////////////////////////////
  // ZONE 3 ///////////////////
  /////////////////////////////

  distance_zone3_avatar =
    abs(zone3_lat - avatar_easing_lat) + abs(zone3_lng - avatar_easing_lng);

  if (distance_zone3_avatar < 0.00525705805429455) {
    volume_sound3 = map(distance_zone3_avatar, 0, 0.00525705805429455, 1, 0);
    sound1.amp(volume_sound3);

    //print("l'avatar est entré dans la zone 3")
  }

  if (distance_zone3_avatar > 0.00525705805429455) {
    sound3.amp(0);
  }

  /////////////////////////////
  // ZONE 4 ///////////////////
  /////////////////////////////

  distance_zone4_avatar =
    abs(zone4_lat - avatar_easing_lat) + abs(zone4_lng - avatar_easing_lng);

  if (distance_zone4_avatar < 0.00525705805429455) {
    volume_sound4 = map(distance_zone4_avatar, 0, 0.00525705805429455, 1, 0);
    sound1.amp(volume_sound4);

    //print("l'avatar est entré dans la zone 4")
  }

  if (distance_zone4_avatar > 0.00525705805429455) {
    sound4.amp(0);
  }

  //calcul du diamètre des zones
  let entree_zone = myMap.latLngToPixel(47.2547657637925, -1.5237941639497878);
  //print("entree_zone = " + entree_zone.x)
  let rayon_zone1 = dist(entree_zone.x, entree_zone.y, zone1Pos.x, zone1Pos.y);

  textAlign(CENTER);
  fill("red");
  text("EDNA", edna.x, edna.y); // on dessine le centre de la zone 1
  image(avatar_img, avatarEasing.x, avatarEasing.y, 75, 35); // on dessine l'avatar
  fill(255, 0, 0, 150); // on donne une transparence de 150 (minimum = 0 et max = 255)
  imageMode(CENTER);
  image(zone1_img, zone1Pos.x, zone1Pos.y, 70, 70);
  text("Entree", entree_zone.x, entree_zone.y);
  noFill();
  circle(zone1Pos.x, zone1Pos.y, rayon_zone1 * 2, rayon_zone1 * 2);
  fill(0);
  text("beaujoire", zone1Pos.x, zone1Pos.y);

  imageMode(CENTER);
  image(zone2_img, zone2Pos.x, zone2Pos.y, 70, 70);
  noFill();
  circle(zone2Pos.x, zone2Pos.y, 35);
  fill(0);
  text("boutique officielle", zone2Pos.x, zone2Pos.y);

  imageMode(CENTER);
  image(zone3_img, zone3Pos.x, zone3Pos.y, 70, 70);
  noFill();
  circle(zone3Pos.x, zone3Pos.y, 35);
  fill(0);
  text("marché de noël", zone3Pos.x, zone3Pos.y);

  imageMode(CENTER);
  image(zone4_img, zone4Pos.x, zone4Pos.y, 70, 70);
  noFill();
  circle(zone4Pos.x, zone4Pos.y, 35);
  fill(0);
  text("stade rennais", zone4Pos.x, zone4Pos.y);

  imageMode(CENTER);
  image(zone5_img, zone5Pos.x, zone5Pos.y, 70, 70);
  noFill();
  circle(zone5Pos.x, zone5Pos.y, 35);
  fill(0);
  text("marcel saupin", zone5Pos.x, zone5Pos.y);

  imageMode(CENTER);
  image(zone6_img, zone6Pos.x, zone6Pos.y, 70, 70);
  noFill();
  circle(zone6Pos.x, zone6Pos.y, 35);
  fill(0);
  text("centre de formation", zone6Pos.x, zone6Pos.y);

  imageMode(CENTER);
  image(zone7_img, zone7Pos.x, zone7Pos.y, 70, 70);
  noFill();
  circle(zone7Pos.x, zone7Pos.y, 35);
  fill(0);
  text("lieu de creation", zone7Pos.x, zone7Pos.y);

  imageMode(CENTER);
  image(zone8_img, zone8Pos.x, zone8Pos.y, 70, 70);
  noFill();
  circle(zone8Pos.x, zone8Pos.y, 35);
  fill(0);
  text("terasses de l'erdre", zone8Pos.x, zone8Pos.y);
} // fin de la fonction draw

function keyPressed() {
  if (key == "i") {
    print("distance lat edna-souris = " + abs(edna_lat - mousePos.lat));
    print("distance lng edna-souris = " + abs(edna_lng - mousePos.lng));
  }

  if (key == "d") {
    // tour bretagne - EDNA
    let distance = getDistance(
      [47.217061367605126, -1.5580521187386853],
      [47.204453255090016, -1.5630417793063813]
    );
    //let distance = getDistance([47.18,-1.55], [44.841225, -0.5800364])
    print("distance = " + distance);
  }
}

// Test distance
function getDistance(origin, destination) {
  // return distance in meters
  var lon1 = toRadian(origin[1]),
    lat1 = toRadian(origin[0]),
    lon2 = toRadian(destination[1]),
    lat2 = toRadian(destination[0]);

  var deltaLat = lat2 - lat1;
  var deltaLon = lon2 - lon1;

  var a =
    Math.pow(Math.sin(deltaLat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
  var c = 2 * Math.asin(Math.sqrt(a));
  var EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS * 1000;
}
function toRadian(degree) {
  return (degree * Math.PI) / 180;
}
