// Create variable to hold map element, give initial settings to map
var map = L.map('map', {
    center: [10.99, -74.8334],
    zoom: 12,
    minZoom: 12,
    scrollWheelZoom: false,
});

map.once('focus', function() { map.scrollWheelZoom.enable(); });

L.easyButton('<img src="images/fullscreen.png">', function (btn, map) {
    var cucu = [10.99, -74.8334];
    map.setView(cucu, 12);
}).addTo(map);

var esriAerialUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services' +
    '/World_Imagery/MapServer/tile/{z}/{y}/{x}';
var esriAerialAttrib = 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, ' +
    'USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the' +
    ' GIS User Community';
var esriAerial = new L.TileLayer(esriAerialUrl,
    {maxZoom: 18, attribution: esriAerialAttrib}).addTo(map);


var opens = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
});


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = (props ?
        'Localidad ' + props.NMB_LC_CM + '<br />' +
        'Viviendas ' + props.V_CON_OCUP + '<br />' +
        'Hogares ' + props.HOG + '<br />' +
        'Personas ' + props.HA_TOT_PER + '<br />' +  
        'Población de origen Venezuela ' + props.VEN + '<br />' +  '<br />' + 

        '<b>Vivienda </b>' + '<br />' +
        'Vivienda adecuada: ' + props.VIV_ADE.toFixed(0) + ' %' + '<br />' +
        'Espacio vital suficiente: ' + props.ES_VIT_SUF.toFixed(0) + ' %' + '<br />' +
        'Agua mejorada: ' + props.A_ACU.toFixed(0) + ' %' + '<br />' +
        'Saneamiento: ' + props.A_ALC.toFixed(0) + ' %' + '<br />' +
        'Electricidad: ' + props.A_ELEC.toFixed(0) + ' %' + '<br />' +
        'Internet: ' + props.A_INTER.toFixed(0) + ' %' + '<br />' + 
        'Dependencia económica: ' + props.D_ECONO.toFixed(2) + '<br />' + 
        'Estrato: ' + props.MAX_EST.toFixed(0)  + '<br />' +  '<br />' +  

        '<b>Salud</b>' + '<br />' +
        'Proximidad centros de salud: ' + props.P_SALUD.toFixed(0) + ' m' + '<br />' +
        'Proximidad hospitales: ' + props.P_SALUD1.toFixed(0) + ' m' + '<br />' +
        'Concentración de Pm10: ' + props.PM10.toFixed(2) + ' µg/m3' +  '<br />' +   
        'Contaminación residuos sólidos: ' + props.CON_SOL.toFixed(0) + ' %' + '<br />' + 
        'Esperanza de vida al nacer: ' + props.E_VIDA.toFixed(0) + ' años' + '<br />' +
        'Brecha género esperanza de vida al nacer: ' + props.B_E_VIDA.toFixed(2) + '<br />' +  '<br />' +   
        
        '<b>Educación, cultura y diversidad </b>' + '<br />' +
        'Proximidad equipamientos culturales: ' + props.P_BIB.toFixed(0) + ' m' + '<br />' +
        'Proximidad equipamientos educativos: ' + props.P_EDU.toFixed(0) + ' m' + '<br />' +
        'Diversidad ingresos: ' + props.SHANON_ES.toFixed(2) + '/1.79' + '<br />' +
        'Diversidad nivel educativo: ' + props.MIX_EDU.toFixed(2) +'/2.20' +  '<br />' +
        'Diversidad edades: ' + props.MIX_EDAD.toFixed(2) + '/1.79' + '<br />' +
        'Diversidad etnias y razas: ' + props.MIX_ETNIA.toFixed(2) + '/1.61' +'<br />' +
        'Brecha género años promedio educación: ' + props.DIF_M_H.toFixed(2) + '<br />' +
        'Años promedio educación: ' + props.ESC_ANOS.toFixed(0) + ' años'+ '<br />' +  '<br />' +  
        
        '<b>Espacios públicos, seguridad y recreación </b>' + '<br />' +
        'Proximidad espacio público: ' + props.P_EP.toFixed(0) + ' m' + '<br />' +
        'M² per capita de espacio público: ' + props.M2_ESP_PU.toFixed(2) + '<br />' +
        'Densidad poblacional: ' + props.D_POB.toFixed(2) + '<br />' +
        'Diversidad usos del suelo: ' + props.MIXTICIDAD.toFixed(2) + '/1.61' +'<br />' + '<br />' +

        '<b>Oportunidades económicas </b>' + '<br />' +
        'Proximidad unidades servicios y comerciales: ' + props.P_COMSER.toFixed(0) + ' m' + '<br />' +
        'Desempleo: ' + props.T_DESEMP.toFixed(0) + ' %' + '<br />' +
        'Empleo: ' + props.EMPLEO.toFixed(0) + ' %' + '<br />' +
        'Desempleo juvenil: ' + props.DESEM_JUVE.toFixed(0) + ' %' + '<br />' +
        'Brecha género desempleo: ' + props.DESEM_M_H.toFixed(2)  : 'Seleccione una manzana');
};
info.addTo(map);

function stylec(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: '#ffffff',
        fillOpacity: 0,
        dashArray: '3',
    };
}

var loc = L.geoJson(localidad, {
    style: stylec,
    onEachFeature: popupText,
}).addTo(map);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'black',
        dashArray: '',
        fillColor: false
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

var manzanas;

function resetHighlight(e) {
    manzanas.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function style(feature) {
    return {
        weight: 0.6,
        opacity: 0.5,
        color: '#ffffff00',
        fillOpacity: 0,
    };
}


function changeLegend(props) {
    var _legend = document.getElementById('legend'); // create a div with a class "info"
    _legend.innerHTML = (props ?
        `<p style="font-size: 11px"><strong>${props.title}</strong></p>
            <p>${props.subtitle}</p>
            <p id='colors'>
                ${props.elem1}
                ${props.elem2}
                ${props.elem3}
                ${props.elem4}
                ${props.elem5}
                ${props.elem6}
                ${props.elem7}<br>
                <span style='color:#000000'>Fuente: </span>${props.elem8}<br>
            </p>` :
        `<p style="font-size: 12px"><strong>Área urbana</strong></p>
            <p id='colors'>
                <span style='color:#c3bfc2'>▉</span>Manzanas<br>
            </p>`);
}

var legends = {
    ZA_SALUD1: {
        title: "Proximidad equipamientos de salud",
        subtitle: "Pendiente",
        elem1: '<div><span  style= "color:#1a9641">▉</span>A nivel</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>Ligeramente inclinada</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>Moderadamente inclinada</div>',
        elem4: '<div><span  style= "color:#d7191c">▉</span>Fuertemente inclinada</div>',
        elem5: '',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Por fuera de la zona de accesibilidad (> 500 m)</div>',
        elem7: '',
        elem8: "DANE, SISPRO",
    },
    ZA_EDU1: {
        title: "Proximidad equipamientos de educación",
        subtitle: "Pendiente",
        elem1: '<div><span  style= "color:#1a9641">▉</span>A nivel</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>Ligeramente inclinada</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>Moderadamente inclinada</div>',
        elem4: '<div><span  style= "color:#d7191c">▉</span>Fuertemente inclinada</div>',
        elem5: '',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Por fuera de la zona de accesibilidad (> 500 m)</div>',
        elem7: '',
        elem8: "DANE, Google Maps",
    },
    ZA_BIB_MU1: {
        title: "Proximidad equipamientos culturales",
        subtitle: "Pendiente",
        elem1: '<div><span  style= "color:#1a9641">▉</span>A nivel</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>Ligeramente inclinada</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>Moderadamente inclinada</div>',
        elem4: '<div><span  style= "color:#d7191c">▉</span>Fuertemente inclinada</div>',
        elem5: '',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Por fuera de la zona de accesibilidad (> 500 m)</div>',
        elem7: '',
        elem8: "DANE, Google Maps",
    },
    ESC_ANOS: {
        title: "Años promedio educación",
        subtitle: "Años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 16</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>14 - 15</div>',
        elem3: '<div><span  style= "color:#f4f466">▉</span>12 - 13</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>9 - 11</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>3 - 8</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIXTICIDAD: {
        title: "Diversidad usos del suelo",
        subtitle: "Índice de Shanon -  Nivel de diversidad por manzana", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.06 - 1.67</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.79 - 1.05</div>',
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.54 - 0.78</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.30 - 0.53</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.29</div>',
        elem6: '',
        elem7: '',
        elem8: "Alcalcía de Barranquilla",
    },
    ZA_EPUBLI1: {
        title: "Proximidad espacio público",
        subtitle: "Pendiente",
        elem1: '<div><span  style= "color:#1a9641">▉</span>A nivel</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>Ligeramente inclinada</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>Moderadamente inclinada</div>',
        elem4: '<div><span  style= "color:#d7191c">▉</span>Fuertemente inclinada</div>',
        elem5: '',
        elem6: '<div><span  style= "color:#c3bfc2">▉</span>Por fuera de la zona de accesibilidad (> 500 m)</div>',
        elem7: '',
        elem8: "Plan de Ordenamiento Territorial Cúcuta",
    },
    P_MAT_ADE: {
        title: "Vivienda Adecuada",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Mayor 86</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>66 - 85</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>36 - 65</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>16 - 35</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>Menor 15</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    A_ACU: {
        title: "Acceso a agua mejorada",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>98 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>89 - 97</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>74 - 88</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>46 - 73</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>4 - 45</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    A_ALC: {
        title: "Acceso a saneamiento",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>97 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>86 - 96</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>65 - 85</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>30 - 64</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 29</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },  
    DESEM_JUVE: {
        title: "Desempleo juvenil",
        subtitle: "% de Personas entre 15 y 24 años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 4</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>5 - 11</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>12 - 20</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>21 - 38</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>39 - 100</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    A_INTER: {
        title: "Acceso a internet",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>86 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>52 - 85</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>33 - 51</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>14 - 32</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0 - 13</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    T_DESEMP: {
        title: "Tasa de desempleo",
        subtitle: "% de Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 3</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>4 - 7</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>8 - 11</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>12 - 20</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>21 - 57</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    }, 
    PM10: {
        title: "Concentración Pm10",
        subtitle: "µg/m3",
        elem1: '<div><span  style= "color:#1a9641">▉</span>37 - 39</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>40 - 41</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>42 - 43</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>44 - 45</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>46 - 47</div>',
        elem6: '',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
    },
    VEN: {
        title: "Población de origen Venezuela",
        subtitle: "Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>1 - 5</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>6 - 25</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>26 - 77</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>78 - 100</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>100 - 205</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MAX_EST: {
        title: "Estratificación socioeconómica",
        subtitle: "Máximo conteo",
        elem1: '<div><span  style= "color:#1a9641">▉</span>Estrato 6</div>',
        elem2: '<div><span  style= "color:#82E0AA">▉</span>Estrato 5</div>', 
        elem3: '<div><span  style= "color:#a6d96a">▉</span>Estrato 4</div>',
        elem4: '<div><span  style= "color:#f4f466">▉</span>Estrato 3</div>',
        elem5: '<div><span  style= "color:#fdae61">▉</span>Estrato 2</div>',
        elem6: '<div><span  style= "color:#d7191c">▉</span>Estrato 1</div>',
        elem7: '<div><span  style= "color:#c3bfc2">▉</span>Sin estrato</div>',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_ETNIA: {
        title: "Diversidad etnias y razas",
        subtitle: "Índice de Shanon -  Nivel de diversidad por manzana", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.25 - 0.50</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.15 - 0.24</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.09 - 0.14</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.03 - 0.08</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.02</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_EDU: {
        title: "Diversidad nivel educativo",
        subtitle: "Índice de Shanon -  Nivel de diversidad por manzana", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.56 - 1.98</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1.34 - 1.55</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1.08 - 1.33</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.47 - 1.07</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.46</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    MIX_EDAD: {
        title: "Diversidad edades",
        subtitle: "Índice de Shanon -  Nivel de diversidad por manzana", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>1.54 - 1.74</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1.45 - 1.53</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1.34 - 1.44</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1.13 - 1.33</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.35 - 1.12</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    SHANON_ES: {
        title: "Diversidad ingresos",
        subtitle: "Índice de Shanon -  Nivel de diversidad por manzana", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.78 - 1.52</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.55 - 0.77</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.34 - 0.54</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.13 - 0.33</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.00 - 0.12</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    D_POB: {
        title: "Densidad residencial",
        subtitle: "Población x m2", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.000 - 0.007</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.008 - 0.014</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.015 - 0.020</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>0.021 - 0.040</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>0.041 - 0.540</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    P_SALUD: {
        title: "Proximidad centros de salud",
        subtitle: "Distancia en m x Factor inclinación del terreno", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 1500</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1501 - 3000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>3001 - 5492</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
    },
    P_SALUD1: {
        title: "Proximidad hospitales",
        subtitle: "Distancia en m x Factor inclinación del terreno", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 1000</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1001 - 2000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>2001 - 4000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>4001 - 8000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>5001 - 12745</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
    },
    VIV_ADE: {
        title: "Vivienda Adecuada",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>98 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>91 - 97</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>78 - 90</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>42 - 77</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>6 - 41</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    ES_VIT_SUF: {
        title: "Espacio vital suficiente",
        subtitle: "% de Hogares",
        elem1: '<div><span  style= "color:#1a9641">▉</span>98 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>91 - 97</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>83 - 90</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>72 - 82</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>25 - 71</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    A_ELEC: {
        title: "Acceso a electricidad",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>99 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>95 - 98</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>86 - 94</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>61 - 85</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>24 - 60</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    D_ECONO: {
        title: "Dependencia económica",
        subtitle: "Población/Población ocupada",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.00 - 2.51</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>2.52 - 3.24</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>3.25 - 5.33</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>5.34 - 16.00</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>16.01 - 46.00</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    CON_SOL: {
        title: "Contaminación residuos sólidos",
        subtitle: "% de Viviendas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 4</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>5 - 16</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>17 - 33</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>34 - 64</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>65 - 100</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    E_VIDA: {
        title: "Esperanza de vida al nacer",
        subtitle: "Años",
        elem1: '<div><span  style= "color:#1a9641">▉</span>76 - 78</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>74 - 75</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>71 - 73</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>66 - 70</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>21 - 65</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    B_E_VIDA: {
        title: "Brecha género esperanza de vida al nacer",
        subtitle: "Relación esperanza de vida al nacer de mujeres y hombres",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.83 - 0.98</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.99 - 1.03</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1.04 - 1.07</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1.08 - 1.17</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>1.18 - 1.85</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    P_BIB: {
        title: "Proximidad equipamientos culturales",
        subtitle: "Distancia en m x Factor inclinación del terreno", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>46 - 500</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>501 - 1000</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1001 - 3000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>3001 - 5000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>5001 - 11196</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
    },
    P_EDU: {
        title: "Proximidad equipamientos educativos",
        subtitle: "Distancia en m x Factor inclinación del terreno", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>6 - 200</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>201 - 500</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>501 - 1000</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1001 - 1500</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>1501 - 3108</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
    },
    DIF_M_H: {
        title: "Brecha género años promedio educación",
        subtitle: "Relación años promedio educación de mujeres y hombres", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.00 - 1.01</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>1.02 - 1.30</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>1.31 - 1.84</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1.85 - 2.00</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>2.01 - 15.33</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    P_EP: {
        title: "Proximidad espacio público",
        subtitle: "Distancia en m x Factor inclinación del terreno", 
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 100</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>101 - 300</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>301 - 500</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>501 - 800</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>801 - 1955</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
    },
    M2_ESP_PU: {
        title: "M² per capita de espacio público",
        subtitle: "m²/habitante",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 3</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>4 - 9</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>10 - 43</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>44 - 100</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>101 - 564</div>',
        elem6: '',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
    },
    P_COMSER: {
        title: "Proximidad unidades de servicios y comerciales",
        subtitle: "Distancia en m x Factor inclinación del terreno",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 50</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>51 - 200</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>201 - 500</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>501 - 1000</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>1001 - 1534</div>',
        elem6: '<br />Factor de inclinación del terreno <br />A nivel: 1<br /> Ligeramente inclinada: 1.25<br /> Moderadamente inclinada: 1.5<br /> Fuertemente inclinada: 1.75<br /> Escarpada: 2<br />',
        elem7: '',
        elem8: "Alcaldía de Barranquilla",
    },
    EMPLEO: {
        title: "Empleo",
        subtitle: "% Personas",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0 - 28</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>29 - 41</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>42 - 49</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>50 - 58</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>59 - 91</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
    DESEM_M_H: {
        title: "Brecha de género desempleo",
        subtitle: "Relación desempleo de mujeres y hombres",
        elem1: '<div><span  style= "color:#1a9641">▉</span>0.00 - 0.31</div>',
        elem2: '<div><span  style= "color:#a6d96a">▉</span>0.32 - 0.84</div>', 
        elem3: '<div><span  style= "color:#f4f466">▉</span>0.85 - 1.62</div>',
        elem4: '<div><span  style= "color:#fdae61">▉</span>1.63 - 3.14</div>',
        elem5: '<div><span  style= "color:#d7191c">▉</span>3.15 - 10.29</div>',
        elem6: '',
        elem7: '',
        elem8: "DANE Censo Nacional Población y Vivienda 2018",
    },
}

var indi = L.geoJson(Manzana, {
    style: legends.D_POB,
}).addTo(map);

var currentStyle = 'D_POB';

manzanas = L.geoJson(Manzana, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);


function setProColor(d) {
    if (currentStyle === 'P_MAT_ADE') {
        return d > 85 ? '#1a9641' :
            d > 65 ? '#a6d96a' :
                d > 35 ? '#f4f466' :
                    d > 15 ? '#fdae61' :
                        '#d7191c';
    }else if (currentStyle === 'A_ACU') {
        return d > 97 ? '#1a9641' :
            d > 88 ? '#a6d96a' :
                d > 73 ? '#f4f466' :
                    d > 45 ? '#fdae61' :
                        '#d7191c';
    } 
    else if (currentStyle === 'A_ALC') {
        return d > 86 ? '#1a9641' :
            d > 85 ? '#a6d96a' :
                d > 64 ? '#f4f466' :
                    d > 29 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'ESC_ANOS') {
        return d > 15 ? '#1a9641' :
            d > 13 ? '#a6d96a' :
                d > 11 ? '#f4f466' :
                    d > 8 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'MIXTICIDAD') {
        return d > 1.05 ? '#1a9641' :
            d > 0.78 ? '#a6d96a' :
                d > 0.53 ? '#f4f466' :
                    d > 0.29 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'DESEM_JUVE') {
                        return d > 38 ? '#d7191c' :
                        d > 20 ? '#fdae61' :
                            d > 11 ? '#f4f466' :
                                d > 4 ? '#a6d96a':
                                '#1a9641';
    }
    else if (currentStyle === 'A_INTER') {
        return d > 85 ? '#1a9641' :
            d > 51 ? '#a6d96a' :
                d > 32 ? '#f4f466' :
                    d > 13 ? '#fdae61' :
                        '#d7191c';
    }
    else if (currentStyle === 'T_DESEMP') {
        return d > 20 ? '#d7191c' :
                        d > 11 ? '#fdae61' :
                            d > 7 ? '#f4f466' :
                                d > 3 ? '#a6d96a':
                                '#1a9641';
    }
    else if (currentStyle === 'PM10') {
        return d > 45 ? '#d7191c' :
            d > 43 ? '#fdae61' :
                d > 41 ? '#f4f466' :
                    d > 39 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'DES_RANGO') {
        return d > 11 ? '#d7191c' :
            d > 8 ? '#fdae61' :
                d > 5 ? '#f4f466' :
                    d > 2 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'MAX_EST') {
        return d > 5 ? '#1a9641':
            d > 4 ? '#82E0AA'  :
            d > 3 ? '#a6d96a'  :
                d > 2 ? '#f4f466' :
                    d > 1 ? '#fdae61' :
                    d > 0 ? '#d7191c':
                    '#c3bfc2';
    }
    else if (currentStyle === 'VEN') {
        return d > 100 ? '#d7191c' :
            d > 77 ? '#fdae61' :
                d > 25 ? '#f4f466' :
                    d > 5 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'MIX_ETNIA') {
        return d > 0.24 ? '#1a9641' :
            d > 0.14 ? '#a6d96a' :
                d > 0.08 ? '#f4f466' :
                    d > 0.02 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EDU') {
        return d > 1.55 ? '#1a9641' :
            d > 1.33 ? '#a6d96a' :
                d > 1.07 ? '#f4f466' :
                    d > 0.46 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'SHANON_ES') {
        return d > 0.77 ? '#1a9641' :
            d > 0.54 ? '#a6d96a' :
                d > 0.33 ? '#f4f466' :
                    d > 0.12 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'MIX_EDAD') {
        return d > 1.53 ? '#1a9641' :
            d > 1.44 ? '#a6d96a' :
                d > 1.33 ? '#f4f466' :
                    d > 1.12 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'D_POB') {
        return d > 0.040 ? '#d7191c' :
            d > 0.020 ? '#fdae61' :
                d > 0.014 ? '#f4f466' :
                    d > 0.007 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'P_SALUD') {
        return d > 3000 ? '#d7191c' :
            d > 1500 ? '#fdae61' :
                d > 1000 ? '#f4f466' :
                    d > 500 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'P_SALUD') {
        return d > 3000 ? '#d7191c' :
            d > 1500 ? '#fdae61' :
                d > 1000 ? '#f4f466' :
                    d > 500 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'P_SALUD1') {
        return d > 8000 ? '#d7191c' :
            d > 4000 ? '#fdae61' :
                d > 2000 ? '#f4f466' :
                    d > 1000 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'VIV_ADE') {
        return d > 97 ? '#1a9641' :
            d > 90 ? '#a6d96a' :
                d > 77 ? '#f4f466' :
                    d > 41 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'ES_VIT_SUF') {
        return d > 97 ? '#1a9641' :
            d > 90 ? '#a6d96a' :
                d > 82 ? '#f4f466' :
                    d > 71 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'A_ELEC') {
        return d > 98 ? '#1a9641' :
            d > 94 ? '#a6d96a' :
                d > 85 ? '#f4f466' :
                    d > 60 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'D_ECONO') {
        return d > 16 ? '#d7191c' :
            d > 5.33 ? '#fdae61' :
                d > 3.24 ? '#f4f466' :
                    d > 2.51 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'CON_SOL') {
        return d > 64 ? '#d7191c' :
            d > 33 ? '#fdae61' :
                d > 16 ? '#f4f466' :
                    d > 4 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'E_VIDA') {
        return d > 75 ? '#1a9641' :
            d > 73 ? '#a6d96a' :
                d > 70 ? '#f4f466' :
                    d > 65 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'B_E_VIDA') {
        return d > 1.17 ? '#1a9641' :
            d > 1.07 ? '#a6d96a' :
                d > 1.03 ? '#f4f466' :
                    d > 0.98 ? '#fdae61' :
                    '#d7191c';
    }
    else if (currentStyle === 'P_BIB') {
        return d > 5000 ? '#d7191c' :
            d > 3000 ? '#fdae61' :
                d > 1000 ? '#f4f466' :
                    d > 500 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'P_EDU') {
        return d > 1500 ? '#d7191c' :
            d > 1000 ? '#fdae61' :
                d > 500 ? '#f4f466' :
                    d > 200 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'DIF_M_H') {
        return d > 2 ? '#d7191c' :
            d > 1.84 ? '#fdae61' :
                d > 1.30 ? '#f4f466' :
                    d > 1.01 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'P_EP') {
        return d > 800 ? '#d7191c' :
            d > 500 ? '#fdae61' :
                d > 300 ? '#f4f466' :
                    d > 100 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'M2_ESP_PU') {
        return d > 100 ? '#d7191c' :
            d > 43 ? '#fdae61' :
                d > 9 ? '#f4f466' :
                    d > 3 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'P_COMSER') {
        return d > 1000 ? '#d7191c' :
            d > 500 ? '#fdae61' :
                d > 200 ? '#f4f466' :
                    d > 50 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'EMPLEO') {
        return d > 58 ? '#d7191c' :
            d > 49 ? '#fdae61' :
                d > 41 ? '#f4f466' :
                    d > 28 ? '#a6d96a' :
                    '#1a9641';
    }
    else if (currentStyle === 'DESEM_M_H') {
        return d > 3.14 ? '#d7191c' :
            d > 1.62 ? '#fdae61' :
                d > 0.84 ? '#f4f466' :
                    d > 0.31 ? '#a6d96a' :
                    '#1a9641';
    }
    else {
        return d > 3 ? '#d7191c' :
                d > 2 ? '#f4f466' :
                    d > 1 ? '#a6d96a' :
                        '#1a9641';
    }

}


function fillColor(feature) {
    return {
        fillColor:  setProColor(feature.properties[currentStyle]),
        weight: 0.6,
        opacity: 0.1,
        color: (currentStyle) ? '#ffffff00' : '#c3bfc2', 
        fillOpacity: (currentStyle) ? 0.9 : 0.5,
    };
}

function changeIndi(style) {
    currentStyle = style.value;
    indi.setStyle(fillColor);
    changeLegend((style.value && legends[style.value]) ? legends[style.value] :
        {
            
        });
}

var baseMaps = {
    'Esri Satellite': esriAerial,
    'Open Street Map': opens

};

// Defines the overlay maps. For now this variable is empty, because we haven't created any overlay layers
var overlayMaps = {
    //'Comunas': comu,
    //'Límite fronterizo con Venezuela': lim
};

// Adds a Leaflet layer control, using basemaps and overlay maps defined above
var layersControl = new L.Control.Layers(baseMaps, overlayMaps, {
    collapsed: true,
});
map.addControl(layersControl);
changeIndi({value: 'D_POB'});

function popupText(feature, layer) {
    layer.bindPopup('Localidad ' + feature.properties.LOCALIDAD + '<br />')
}
