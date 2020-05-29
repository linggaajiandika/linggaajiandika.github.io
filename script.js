// This watches for arrow keys to advance the tabs
function openPage(pageName,elmnt,color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();

// ############ MAP ##############
// Edit the center point and zoom level
var map = L.map('map', {
  center: [-6.96, 109.55],
  zoom: 8,
});

// Edit links to your GitHub repo and data source credit
// map.attributionControl
// .setPrefix('View <a href="http://github.com/jackdougherty/leaflet-map-polygon-tabs">data and code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>; design by <a href="http://ctmirror.org">CT Mirror</a>');

// Basemap layer
new L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png', {
  // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

// Edit to upload GeoJSON data file from your local directory
$.getJSON("dataolah.geojson", function (data) {
  geoJsonLayer = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
});

// Edit range cutoffs and colors to match your data; see http://colorbrewer.org
// Any values not listed in the ranges below displays as the last color
function getColor(d) {
  return d > 45 ? '#bd0026' :
         d > 30 ? '#f03b20' :
         d > 15 ? '#fd8d3c' :
         d > 0.9 ? '#fecc5c' :
                   'white' ;
}

// Edit the getColor property to match data properties in your GeoJSON file
// In this example, columns follow this pattern: index1910, index1920...
function style(feature) {
  return {
    fillColor: getColor(feature.properties['Positif: Dirawat']),
    weight: 1,
    opacity: 1,
    color: 'black',
    fillOpacity: 0.9
  };
}

// This highlights the polygon on hover, also for mobile
function highlightFeature(e) {
  resetHighlight(e);
  var layer = e.target;
  layer.setStyle({
    weight: 4,
    color: 'black',
    fillOpacity: 0.7
  });
  info.update(layer.feature.properties);
}

// This resets the highlight after hover moves away
function resetHighlight(e) {
  geoJsonLayer.setStyle(style);
  info.update();
}

// This instructs highlight and reset functions on hover movement
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: highlightFeature
  });
}

// Creates an info box on the map
var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

// Edit info box labels (such as props.town) to match properties of the GeoJSON data
info.update = function (props) {
  var winName =
  this._div.innerHTML = (props ?
    '<div class="areaName">' + props.KABKOT + '</div>' : '<div class="areaName faded"><small>Arahkan Mouse<br>Untuk Detail</small></div>') + '<div class="areaLabel"><div class="areaValue">Positif Dirawat</div>' +(props ? '' + (checkNull(props['Positif: Dirawat'])) : '--') + '</div>';
};
info.addTo(map);

// When a new tab is selected, this changes the year displayed

// Edit grades in legend to match the range cutoffs inserted above
// In this example, the last grade will appear as "2+"
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1, 15, 30, 45],
    labels = [],
    from, to;
  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];
    // manually inserted from + 0.1 to start one step above default 0 = white color
    labels.push(
      '<i style="background:' + getColor(from + 0.1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  }
  div.innerHTML = labels.join('<br>');
  return div;
};
legend.addTo(map);


// ############ MAP ##############
// Edit the center point and zoom level
var map1 = L.map('map1', {
  center: [-6.96, 109.55],
  zoom: 8,
});

// Edit links to your GitHub repo and data source credit
// map.attributionControl
// .setPrefix('View <a href="http://github.com/jackdougherty/leaflet-map-polygon-tabs">data and code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>; design by <a href="http://ctmirror.org">CT Mirror</a>');

// Basemap layer
new L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png', {
  // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map1);

// Edit to upload GeoJSON data file from your local directory
$.getJSON("dataolah.geojson", function (data1) {
  geoJsonLayer1 = L.geoJson(data1, {
    style: style1,
    onEachFeature: onEachFeature1
  }).addTo(map1);
});

// Edit range cutoffs and colors to match your data; see http://colorbrewer.org
// Any values not listed in the ranges below displays as the last color
function getColor1(d) {
  return d > 7 ? '#980043' :
  d > 5 ? '#dd1c77' :
  d > 3 ? '#df65b0' :
  d > 0.9 ? '#d7b5d8' :
            'white' ;
}

// Edit the getColor property to match data properties in your GeoJSON file
// In this example, columns follow this pattern: index1910, index1920...
function style1(feature) {
  return {
    fillColor: getColor1(feature.properties['Positif: Meninggal']),
    weight: 1,
    opacity: 1,
    color: 'black',
    fillOpacity: 0.9
  };
}

// This highlights the polygon on hover, also for mobile
function highlightFeature1(e) {
  resetHighlight1(e);
  var layer = e.target;
  layer.setStyle({
    weight: 4,
    color: 'black',
    fillOpacity: 0.7
  });
  info1.update(layer.feature.properties);
}

// This resets the highlight after hover moves away
function resetHighlight1(e) {
  geoJsonLayer1.setStyle(style1);
  info1.update();
}

// This instructs highlight and reset functions on hover movement
function onEachFeature1(feature, layer) {
  layer.on({
    mouseover: highlightFeature1,
    mouseout: resetHighlight1,
    click: highlightFeature1
  });
}

// Creates an info box on the map
var info1 = L.control();
info1.onAdd = function (map1) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

// Edit info box labels (such as props.town) to match properties of the GeoJSON data
info1.update = function (props) {
  var winName1 =
  this._div.innerHTML = (props ?
    '<div class="areaName">' + props.KABKOT + '</div>' : '<div class="areaName faded"><small>Arahkan Mouse<br>Untuk Detail</small></div>') + '<div class="areaLabel"><div class="areaValue">Positif Meninggal</div>' +(props ? '' + (checkNull(props['Positif: Meninggal'])) : '--') + '</div>';
};
info1.addTo(map1);

// When a new tab is selected, this changes the year displayed

// Edit grades in legend to match the range cutoffs inserted above
// In this example, the last grade will appear as "2+"
var legend1 = L.control({position: 'bottomright'});
legend1.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1, 3, 5, 7],
    labels = [],
    from, to;
  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];
    // manually inserted from + 0.1 to start one step above default 0 = white color
    labels.push(
      '<i style="background:' + getColor1(from + 0.1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  }
  div.innerHTML = labels.join('<br>');
  return div;
};
legend1.addTo(map1);


// ############ MAP ##############
// Edit the center point and zoom level
var map2 = L.map('map2', {
  center: [-6.96, 109.55],
  zoom: 8,
});

// Edit links to your GitHub repo and data source credit
// map.attributionControl
// .setPrefix('View <a href="http://github.com/jackdougherty/leaflet-map-polygon-tabs">data and code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>; design by <a href="http://ctmirror.org">CT Mirror</a>');

// Basemap layer
new L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png', {
  // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map2);

// Edit to upload GeoJSON data file from your local directory
$.getJSON("dataolah.geojson", function (data2) {
  geoJsonLayer2 = L.geoJson(data2, {
    style: style2,
    onEachFeature: onEachFeature2
  }).addTo(map2);
});

// Edit range cutoffs and colors to match your data; see http://colorbrewer.org
// Any values not listed in the ranges below displays as the last color
function getColor2(d) {
  return d > 30 ? '#006837' :
  d > 20 ? '#31a354' :
  d > 10 ? '#78c679' :
  d > 0.9 ? '#c2e699' :
            'white' ;
}

// Edit the getColor property to match data properties in your GeoJSON file
// In this example, columns follow this pattern: index2920, index2920...
function style2(feature) {
  return {
    fillColor: getColor2(feature.properties['Positif: Sembuh']),
    weight: 1,
    opacity: 1,
    color: 'black',
    fillOpacity: 0.9
  };
}

// This highlights the polygon on hover, also for mobile
function highlightFeature2(e) {
  resetHighlight2(e);
  var layer = e.target;
  layer.setStyle({
    weight: 4,
    color: 'black',
    fillOpacity: 0.7
  });
  info2.update(layer.feature.properties);
}

// This resets the highlight after hover moves away
function resetHighlight2(e) {
  geoJsonLayer2.setStyle(style2);
  info2.update();
}

// This instructs highlight and reset functions on hover movement
function onEachFeature2(feature, layer) {
  layer.on({
    mouseover: highlightFeature2,
    mouseout: resetHighlight2,
    click: highlightFeature2
  });
}

// Creates an info box on the map
var info2 = L.control();
info2.onAdd = function (map2) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

// Edit info box labels (such as props.town) to match properties of the GeoJSON data
info2.update = function (props) {
  var winName2 =
  this._div.innerHTML = (props ?
    '<div class="areaName">' + props.KABKOT + '</div>' : '<div class="areaName faded"><small>Arahkan Mouse<br>Untuk Detail</small></div>') + '<div class="areaLabel"><div class="areaValue">Positif Sembuh</div>' +(props ? '' + (checkNull(props['Positif: Sembuh'])) : '--') + '</div>';
};
info2.addTo(map2);

// When a new tab is selected, this changes the year displayed

// Edit grades in legend to match the range cutoffs inserted above
// In this example, the last grade will appear as "2+"
var legend2 = L.control({position: 'bottomright'});
legend2.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1, 10, 20, 30],
    labels = [],
    from, to;
  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];
    // manually inserted from + 0.2 to start one step above default 0 = white color
    labels.push(
      '<i style="background:' + getColor2(from + 0.1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  }
  div.innerHTML = labels.join('<br>');
  return div;
};
legend2.addTo(map2);


// ############ MAP ##############
// Edit the center point and zoom level
var map3 = L.map('map3', {
  center: [-6.96, 109.55],
  zoom: 8,
});

// Edit links to your GitHub repo and data source credit
// map.attributionControl
// .setPrefix('View <a href="http://github.com/jackdougherty/leaflet-map-polygon-tabs">data and code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>; design by <a href="http://ctmirror.org">CT Mirror</a>');

// Basemap layer
new L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png', {
  // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map3);

// Edit to upload GeoJSON data file from your local directory
$.getJSON("dataolah.geojson", function (data3) {
  geoJsonLayer3 = L.geoJson(data3, {
    style: style3,
    onEachFeature: onEachFeature3
  }).addTo(map3);
});

// Edit range cutoffs and colors to match your data; see http://colorbrewer.org
// Any values not listed in the ranges below displays as the last color
function getColor3(d) {
  return d > 30 ? '#253494' :
  d > 20 ? '#2c7fb8' :
  d > 10 ? '#41b6c4' :
  d > 0.9 ? '#bdd7e7' :
            'white' ;
}

// Edit the getColor property to match data properties in your GeoJSON file
// In this example, columns follow this pattern: index3930, index3930...
function style3(feature) {
  return {
    fillColor: getColor3(feature.properties['PDP: Dirawat']),
    weight: 1,
    opacity: 1,
    color: 'black',
    fillOpacity: 0.9
  };
}

// This highlights the polygon on hover, also for mobile
function highlightFeature3(e) {
  resetHighlight3(e);
  var layer = e.target;
  layer.setStyle({
    weight: 4,
    color: 'black',
    fillOpacity: 0.7
  });
  info3.update(layer.feature.properties);
}

// This resets the highlight after hover moves away
function resetHighlight3(e) {
  geoJsonLayer3.setStyle(style3);
  info3.update();
}

// This instructs highlight and reset functions on hover movement
function onEachFeature3(feature, layer) {
  layer.on({
    mouseover: highlightFeature3,
    mouseout: resetHighlight3,
    click: highlightFeature3
  });
}

// Creates an info box on the map
var info3 = L.control();
info3.onAdd = function (map3) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

// Edit info box labels (such as props.town) to match properties of the GeoJSON data
info3.update = function (props) {
  var winName3 =
  this._div.innerHTML = (props ?
    '<div class="areaName">' + props.KABKOT + '</div>' : '<div class="areaName faded"><small>Arahkan Mouse<br>Untuk Detail</small></div>') + '<div class="areaLabel"><div class="areaValue">PDP Dirawat</div>' +(props ? '' + (checkNull(props['PDP: Dirawat'])) : '--') + '</div>';
};
info3.addTo(map3);

// When a new tab is selected, this changes the year displayed

// Edit grades in legend to match the range cutoffs inserted above
// In this example, the last grade will appear as "3+"
var legend3 = L.control({position: 'bottomright'});
legend3.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1, 10, 20, 30],
    labels = [],
    from, to;
  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];
    // manually inserted from + 0.3 to start one step above default 0 = white color
    labels.push(
      '<i style="background:' + getColor3(from + 0.1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  }
  div.innerHTML = labels.join('<br>');
  return div;
};
legend3.addTo(map3);


// ############ MAP ##############
// Edit the center point and zoom level
var map4 = L.map('map4', {
  center: [-6.96, 109.55],
  zoom: 8,
});

// Edit links to your GitHub repo and data source credit
// map.attributionControl
// .setPrefix('View <a href="http://github.com/jackdougherty/leaflet-map-polygon-tabs">data and code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>; design by <a href="http://ctmirror.org">CT Mirror</a>');

// Basemap layer
new L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png', {
  // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map4);

// Edit to upload GeoJSON data file from your local directory
$.getJSON("dataolah.geojson", function (data4) {
  geoJsonLayer4 = L.geoJson(data4, {
    style: style4,
    onEachFeature: onEachFeature4
  }).addTo(map4);
});

// Edit range cutoffs and colors to match your data; see http://colorbrewer.org
// Any values not listed in the ranges below displays as the last color
function getColor4(d) {
  return d > 60 ? '#7a0177' :
  d > 40 ? '#c51b8a' :
  d > 20 ? '#f768a1' :
  d > 0.9 ? '#fbb4b9' :
            'white' ;
}

// Edit the getColor property to match data properties in your GeoJSON file
// In this example, columns follow this pattern: index4940, index4940...
function style4(feature) {
  return {
    fillColor: getColor4(feature.properties['ODP: Proses']),
    weight: 1,
    opacity: 1,
    color: 'black',
    fillOpacity: 0.9
  };
}

// This highlights the polygon on hover, also for mobile
function highlightFeature4(e) {
  resetHighlight4(e);
  var layer = e.target;
  layer.setStyle({
    weight: 4,
    color: 'black',
    fillOpacity: 0.7
  });
  info4.update(layer.feature.properties);
}

// This resets the highlight after hover moves away
function resetHighlight4(e) {
  geoJsonLayer4.setStyle(style4);
  info4.update();
}

// This instructs highlight and reset functions on hover movement
function onEachFeature4(feature, layer) {
  layer.on({
    mouseover: highlightFeature4,
    mouseout: resetHighlight4,
    click: highlightFeature4
  });
}

// Creates an info box on the map
var info4 = L.control();
info4.onAdd = function (map4) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

// Edit info box labels (such as props.town) to match properties of the GeoJSON data
info4.update = function (props) {
  var winName4 =
  this._div.innerHTML = (props ?
    '<div class="areaName">' + props.KABKOT + '</div>' : '<div class="areaName faded"><small>Arahkan Mouse<br>Untuk Detail</small></div>') + '<div class="areaLabel"><div class="areaValue">ODP Proses</div>' +(props ? '' + (checkNull(props['ODP: Proses'])) : '--') + '</div>';
};
info4.addTo(map4);

// When a new tab is selected, this changes the year displayed

// Edit grades in legend to match the range cutoffs inserted above
// In this example, the last grade will appear as "4+"
var legend4 = L.control({position: 'bottomright'});
legend4.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1, 20, 40, 60],
    labels = [],
    from, to;
  for (var i = 0; i < grades.length; i++) {
    from = grades[i];
    to = grades[i + 1];
    // manually inserted from + 0.4 to start one step above default 0 = white color
    labels.push(
      '<i style="background:' + getColor4(from + 0.1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  }
  div.innerHTML = labels.join('<br>');
  return div;
};
legend4.addTo(map4);

// In info.update, this checks if GeoJSON data contains a null value, and if so displays "--"
function checkNull(val) {
  if (val != null || val == "NaN") {
    return comma(val);
  } else {
    return "--";
  }
}

// Use in info.update if GeoJSON data needs to be displayed as a percentage
function checkThePct(a,b) {
  if (a != null && b != null) {
    return Math.round(a/b*1000)/10 + "%";
  } else {
    return "--";
  }
}

// Use in info.update if GeoJSON data needs to be displayed with commas (such as 123,456)
function comma(val){
  while (/(\d+)(\d{3})/.test(val.toString())){
    val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  }
  return val;
}

