let H_M_pm=new Intl.DateTimeFormat('en-GB',{timeStyle:'short',hour12:'true'});
let H_M_long=new Intl.DateTimeFormat('en-GB',{dayPeriod:'long',
        hour12:'true',hour:'2-digit',minute:'2-digit'});
let long_dat=new Intl.DateTimeFormat('en-GB',{dateStyle:'full'});
let date_short=new Intl.DateTimeFormat('en-GB',{weekday:'short',month:'short',day:'2-digit'});

const scrollDuration = 200;
let leftPaddle=document.getElementsByClassName('left-paddle')[0];
let rightPaddle=document.getElementsByClassName('right-paddle')[0];
let itemslength=$('.item').length;
let itemsize = $('.item').outerWidth(true);
let paddleMargin=0; //-30 valor probado pero no se elimina el primmer paddle
let contador_scroll = 0
let menu_vertical = document.getElementById('menu_vertical');
let contenido_div = document.getElementById('contenido_div');
let menu_wrapper = document.getElementById('menu_wrapper');
let validate = document.getElementById('validation');
let menuWrapperSize = $('.menu-wrapper').outerWidth();
let infor=document.getElementsByClassName('info')
let table_infor=document.getElementsByClassName('tabla_info')
let time_offset=document.getElementById('time_offset');

let array_vert=[]
let array_hor=[]
let lista_items=document.getElementsByClassName('item_vert');
let lista_items_hor=document.getElementsByClassName('item');
let contenido=[]

rain_span=document.getElementById('rain_span');
snow_span=document.getElementById('snow_span');
icono_div=document.getElementById('icono_clima');
date_vert=document.getElementsByClassName('date_vert');
temp_vert=document.getElementsByClassName('temp_vert');
desc_vert=document.getElementsByClassName('descrip');

actual_3=document.getElementsByClassName('actual_3')

if (activado === 'True') {
    time_offset.innerText=`${clima['timezone_offset']/3600} Hrs`;

    let big_chart={'chart_1':[],'chart_2':[],'chart_3':[],'chart_4':[]};
    let datos = {'minutos':[],'horas_f':[],'horas_t':[]};
    clima['current']['sunset']=H_M_pm.format(clima['current']['sunset']*1000);
    clima['current']['sunrise']=H_M_pm.format(clima['current']['sunrise']*1000);
    try {
        for(let i=0;i<clima['minutely'].length;i++){
            clima['minutely'][i]['dt']=H_M_pm.format(clima['minutely'][i]['dt']*1000);
            datos['minutos'].push({'y':clima['minutely'][i]['precipitation'],'label':clima['minutely'][i]['dt']});
        }
    }catch (error){

    }
    for (let i=0;i<clima['hourly'].length;i++){
        datos['horas_t'].push({'x':clima['hourly'][i]['dt']*1000,'y':clima['hourly'][i]['temp']});
        datos['horas_f'].push({'x':clima['hourly'][i]['dt']*1000,'y':clima['hourly'][i]['feels_like']});
        big_chart['chart_1'].push({'x':clima['hourly'][i]['dt']*1000,'y':clima['hourly'][i]['humidity']/100});
        big_chart['chart_2'].push({'x':clima['hourly'][i]['dt']*1000,'y':clima['hourly'][i]['uvi']});
        big_chart['chart_3'].push({'x':clima['hourly'][i]['dt']*1000,'y':clima['hourly'][i]['clouds']/100});
        big_chart['chart_4'].push({'x':clima['hourly'][i]['dt']*1000,'y':clima['hourly'][i]['pop']});
    }
    for (let i=0;i<clima['daily'].length;i++){
        clima['daily'][i]['sunrise']=H_M_long.format(clima['daily'][i]['sunrise']*1000);
        clima['daily'][i]['sunset']=H_M_long.format(clima['daily'][i]['sunset']*1000);
        clima['daily'][i]['moonrise']=H_M_pm.format(clima['daily'][i]['moonrise']*1000);
        clima['daily'][i]['moonset']=H_M_pm.format(clima['daily'][i]['moonset']*1000);
    }

    actual_3[0].innerText=`${long_dat.format(clima['current']['dt']*1000)} at ${H_M_long.format(clima['current']['dt']*1000)}`
    actual_3[1].innerText=clima['current']['sunrise'];
    actual_3[2].innerText=clima['current']['sunset'];
    window.onload = function () {

        let chartt = new CanvasJS.Chart("chartContainer1", {
            animationEnabled: true,

            title: {
                text: "Precipitation"
            },
            axisX: {
                interval: 1,
                labelFontSize: 10,
            },
            axisY2: {
                interlacedColor: "rgba(1,77,101,.2)",
                gridColor: "rgba(1,77,101,.1)",
                title: "mm of rain"
            },

            data: [{
                type: "bar",
                name: "Precipitation",
                axisYType: "secondary",
                color: "#014D65",
                dataPoints: datos['minutos']
            }]
        });
        chartt.render();
        let chart = new CanvasJS.Chart("chartContainer2", {
            animationEnabled: true,
            title: {
                text: "Temperature and Thermal Sensation"
            },
            axisX: {
                valueFormatString: "hh:mm TT",
            },
            axisY: {
                includeZero: false,
                suffix: "°C"
            },
            toolTip: {
                shared: true
            },
            legend: {
                fontSize: 13
            },

            data: [{
                xValueType: "dateTime",
                type: "splineArea",
                showInLegend: true,
                name: "temperature",
                yValueFormatString: "###°C",
                xValueFormatString:"DD MMM hh:mm TT",
                dataPoints: datos['horas_t']
            },
                {
                    type: "splineArea",
                    xValueType: "dateTime",
                    showInLegend: true,
                    name: "Feels like",
                    yValueFormatString: "###°C",
                    dataPoints: datos['horas_f']


                }]
        });
        chart.render();
        // -------------------------------------------START CHART MULTIPLE
        let charts = [];
  let axisX = {
    labelFormatter: function(){ return "";},
    tickLength: 0,
    lineThickness: 0,
    valueFormatString: "hh:mm TT",
  },
  axisY = {
    labelFormatter: function(){ return "";},
    tickLength: 0,
    gridThickness: 0,
  };

  let newUserOptions = {
    animationEnabled: true,
    theme: "light2",
    title:{
      text: "UV level",
      fontSize: 18,
      verticalAlign: "bottom"
    },
    axisX: axisX,
    axisY: axisY,
    data: [{
        xValueType: "dateTime",
        // xValueFormatString:"DD MMM hh:mm TT",
        yValueFormatString: "##0.# Points",
      type: "splineArea", //change type to bar, line, area, pie, etc
      markerSize: 0,
      dataPoints: big_chart['chart_2'],
    }]
  }
  var bounceRateOptions = {
    animationEnabled: true,
    theme: "light2",
    title:{
      text: "% of Clouds",
      fontSize: 18,
      verticalAlign: "bottom"
    },
    axisX: axisX,
    axisY: axisY,
    data: [{
        xValueType: "dateTime",
        // xValueFormatString:"DD MMM hh:mm TT",
        // yValueFormatString: "#### %",
      type: "splineArea", //change type to bar, line, area, pie, etc
      markerSize: 0,
      yValueFormatString: "###0 %",
      dataPoints: big_chart['chart_3'],
    }]
  }

  var pageViewsOptions = {
    animationEnabled: true,
    theme: "dark1",
    title:{
      text: "Probavility or precipitation",
      fontSize: 18,
      verticalAlign: "bottom"
    },
    axisX: axisX,
    axisY: axisY,
    data: [{
        xValueType: "dateTime",
        yValueFormatString: "#0.##%",
        // xValueFormatString:"DD MMM hh:mm TT",
      type: "splineArea", //change type to bar, line, area, pie, etc
      markerSize: 0,
      dataPoints: big_chart['chart_4'],
    }]
  }

  let visitorsOptions = {
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title:{
      text: "Humidity next 48 hours"
    },
      axisX:{
        valueFormatString: "hh:mm TT",
      },
    axisY: {
        labelFormatter: function(e){
				return  `${e.value*100}`;
			},
      includeZero: false,
        suffix: " %",
        valueFormatString: "###",

    },
    data: [{
        yValueFormatString: "###0 %",
        xValueType: "dateTime",
        xValueFormatString:"DD MMM hh:mm TT",
      type: "column", //change type to bar, line, area, pie, etc
      color: "#6D78AD",
      dataPoints: big_chart['chart_1'],
    }]
  };

  charts.push(new CanvasJS.Chart("chart_Container1", visitorsOptions));
  charts.push(new CanvasJS.Chart("chart_Container2", newUserOptions));
  charts.push(new CanvasJS.Chart("chart_Container3", pageViewsOptions));
  charts.push(new CanvasJS.Chart("chart_Container4", bounceRateOptions));
  syncTooltip(charts);

  for( let i = 0; i < charts.length; i++){
    charts[i].render();
  }

  function syncTooltip(charts) {

    if(!this.onToolTipUpdated){
      this.onToolTipUpdated = function(e) {
        for (let j = 0; j < charts.length; j++) {
          if (charts[j] != e.chart)
            charts[j].toolTip.showAtX(e.entries[0].xValue);
        }
      }
    }

    if(!this.onToolTipHidden){
      this.onToolTipHidden = function(e) {
        for( let j = 0; j < charts.length; j++){
          if(charts[j] != e.chart)
            charts[j].toolTip.hide();
        }
      }
    }

    for(let i = 0; i < charts.length; i++) {
        if(!charts[i].options.toolTip)
          charts[i].options.toolTip = {};

        charts[i].options.toolTip.updated = this.onToolTipUpdated;
        charts[i].options.toolTip.hidden = this.onToolTipHidden;
    }
  }

  // function addSymbols(e){
  //     let suffixes = ["", "K", "M", "B"];
  //
  //     let order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
  //     if(order > suffixes.length - 1)
  //         order = suffixes.length - 1;
  //
  //     let suffix = suffixes[order];
  //     return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  // }

    }
// --------IMPLEMENTACION DEL MAPA-----------------------------
//     let providers = {};
//
//         providers['OSM'] = {
//             title: 'OSM',
//             icon: 'img/layers-osm.png',
//             layer: L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//                 maxZoom: 18,
//                 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             })
//         };
//      var map = L.map('map').setView([60, 50], 3);
//
//
//         //http://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=d9cfe451d5a775abaf178aec4951b4b0
//
//         var Temp = L.tileLayer('http://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=d22d9a6a3ff2aa523d5917bbccc89211', {
//             maxZoom: 18,
//             attribution: '&copy; <a href="http://owm.io">VANE</a>',
//             id: 'temp'
//         }),
//
//         Precipitation = L.tileLayer('http://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=d22d9a6a3ff2aa523d5917bbccc89211', {
//             maxZoom: 18,
//             attribution: '&copy; <a href="http://owm.io">VANE</a>'
//         }),
//
//         Wind = L.tileLayer('http://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=d22d9a6a3ff2aa523d5917bbccc89211', {
//             maxZoom: 18,
//             attribution: '&copy; <a href="http://owm.io">VANE</a>'
//         }),
//
//         Pressure = L.tileLayer('http://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=d22d9a6a3ff2aa523d5917bbccc89211', {
//             maxZoom: 18,
//             attribution: '&copy; <a href="http://owm.io">VANE</a>'
//         }),
//
//
//         Clouds = L.tileLayer('http://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=d22d9a6a3ff2aa523d5917bbccc89211', {
//             maxZoom: 18,
//             attribution: '&copy; <a href="http://owm.io">VANE</a>'
//         });
//
//         var owm = new L.OWMLayer({key: 'b1b15e88fa797225412429c1c50c122a1'});
//         map.addLayer(owm);
//
//         Temp.addTo(map);
//
//         var overlays = {"Temperature": Temp, "Precipitation": Precipitation, "Clouds": Clouds, "Pressure": Pressure, "Wind": Wind};
//         L.control.layers(overlays, null, {collapsed:false}).addTo(map);
//
//         var layers = [];
//             for (var providerId in providers) {
//                 layers.push(providers[providerId]);
//             }
//
//         L.control.iconLayers(layers).addTo(map);


    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' });
    var clouds = L.OWM.clouds({showLegend: false, opacity: 0.5, appId: '7956b2e94a8e0775fbb74d5de6598c31'});
    var temp = L.OWM.temperature({appId: '7956b2e94a8e0775fbb74d5de6598c31'});
    var precipitation = L.OWM.precipitation({appId: '7956b2e94a8e0775fbb74d5de6598c31'});


var rain_map = L.OWM.rain({appId: '7956b2e94a8e0775fbb74d5de6598c31'});

var snow_map = L.OWM.snow({appId: '7956b2e94a8e0775fbb74d5de6598c31'});
var pressure_map = L.OWM.pressure({appId: '7956b2e94a8e0775fbb74d5de6598c31'});

var wind_map = L.OWM.wind({appId: '7956b2e94a8e0775fbb74d5de6598c31'});

var map = L.map('map', { center: new L.LatLng(clima['lat'], clima['lon']), zoom: 10, layers: [osm] });
var baseMaps = { "OSM Standard": osm };
var overlayMaps = { "Clouds": clouds,'Temp':temp, 'Precipitation':precipitation,'Rain':rain_map, 'Snow':snow_map,
'Pressure':pressure_map,'Wind':wind_map};
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
let some_new=L.marker([clima['lat'], clima['lon']]).addTo(map);

//     map.marker([51.5, 10])
}


const getMenuSize = ()=> {
	return itemslength * itemsize;
};
let menuSize = getMenuSize();
let menuInvisibleSize = menuSize - menuWrapperSize;
let getMenuPosition = ()=> {
	return $('.menu').scrollLeft();
};

let clase_menu=document.getElementsByClassName('menu');
$('.menu').on('scroll', ()=> {
	menuInvisibleSize = menuSize - menuWrapperSize;
	let menuPosition = getMenuPosition();
	let menuEndOffset = menuInvisibleSize - paddleMargin;
	if (menuPosition <= paddleMargin) {
		$(leftPaddle).addClass('hidden');
		$(rightPaddle).removeClass('hidden');
	} else if (menuPosition < menuEndOffset) {
		// show both paddles in the middle
		$(leftPaddle).removeClass('hidden');
		$(rightPaddle).removeClass('hidden');
	} else if (menuPosition >= menuEndOffset) {
		$(leftPaddle).removeClass('hidden');
		$(rightPaddle).addClass('hidden');
}
});
$(leftPaddle).on('click', ()=> {
    contador_scroll -= 104;

	$('.menu').animate( { scrollLeft: contador_scroll }, scrollDuration);
});

$(rightPaddle).on('click', ()=> {
    contador_scroll += 104;

	$('.menu').animate( { scrollLeft: contador_scroll}, scrollDuration);
});

for(let i=0; i<8;i++ ){
    element={
        nombre:`nombre ${i+1}`,
        apellido:`apellido ${i+1}`,
        email:`email ${i+1}`,
        nacionalidad:`nacionalidad ${i+1}`,
        direccion:`direccion ${i+1}`,
        id:i,
    };
    contenido.push(element);
}
for(let i=0; i<8;i++ ){

    array_vert.push(lista_items[i]);
    array_hor.push(lista_items_hor[i]);
}


const icono_back=(ind)=>{
    let url=`http://openweathermap.org/img/wn/${ind}@2x.png`;
    icono_div.style.backgroundImage=`url(${url})`;
}
const fase_luna=(a)=>{
    fase=0;
    if(a==1||a==0){
        fase='New Moon';
    }else if(a<=0.35){
        fase='First cuarter Moon';
    }else if(a>0.35 && a<=0.65){
        fase='Full Moon';
    }else if(a>0.65){
        fase='Last Quarter Moon';
    }
    return fase;
}

const tabla_inf=(ind)=>{
        table_infor[0].innerText=clima['daily'][ind]['feels_like']['morn'];
        table_infor[1].innerText=clima['daily'][ind]['feels_like']['eve'];
        table_infor[2].innerText=clima['daily'][ind]['feels_like']['day'];
        table_infor[3].innerText=clima['daily'][ind]['feels_like']['night'];
        table_infor[4].innerText=clima['daily'][ind]['temp']['morn'];
        table_infor[5].innerText=clima['daily'][ind]['temp']['eve'];
        table_infor[6].innerText=clima['daily'][ind]['temp']['day'];
        table_infor[7].innerText=clima['daily'][ind]['temp']['night'];
}

const info_function=(ind)=>{
        infor[0].innerText=fase_luna(clima['daily'][ind]['moon_phase']);
        infor[1].innerText=long_dat.format(clima['daily'][ind]['dt']*1000)
        infor[2].innerText=clima['daily'][ind]['weather']['0']['description']
        infor[3].innerText=clima['daily'][ind]['temp']['max']
        infor[4].innerText=clima['daily'][ind]['temp']['min']
        infor[5].innerText=clima['daily'][ind]['pressure']
        infor[6].innerText=clima['daily'][ind]['humidity']
        infor[7].innerText=clima['daily'][ind]['dew_point']
        infor[8].innerText=clima['daily'][ind]['wind_speed']
        infor[9].innerText=clima['daily'][ind]['wind_deg']
        infor[10].innerText=clima['daily'][ind]['clouds']
        infor[11].innerText=clima['daily'][ind]['uvi']
        infor[12].innerText=clima['daily'][ind]['pop']
}

for(let i=0; i<8;i++ ){
    date_vert[i].innerText=date_short.format(clima['daily'][i]['dt']*1000);
    temp_vert[i].innerText=`${clima['daily'][i]['temp']['min']}°C / ${clima['daily'][i]['temp']['max']}°C`;
    desc_vert[i].innerText=clima['daily'][i]['weather']['0']['description'];
    array_vert[i].addEventListener('click',()=>{
        // console.log(`se ha hecho click en la casilla ${array_vert.indexOf(array_vert[i])}`)
        let ind=array_vert.indexOf(array_vert[i])
        info_function(ind);
        tabla_inf(ind);
        icono_back(clima['daily'][ind]['weather']['0']['icon']);

        validate.innerText=clima['daily'][ind]['dt']

        if(clima['daily'][ind]['rain']){
            rain_span.innerText=clima['daily'][ind]['rain']
        }else{
            rain_span.innerText=0
        }
        if(clima['daily'][ind]['snow']){
            snow_span.innerText=clima['daily'][ind]['snow']
        }else{
            snow_span.innerText=0
        }
        menu_vertical.classList.toggle('hidden');
        contenido_div.classList.toggle('hidden');
        menu_wrapper.classList.toggle('hidden');
    });
    array_hor[i].innerText=date_short.format(clima['daily'][i]['dt']*1000);
    array_hor[i].addEventListener('click',()=>{
        let ind=array_hor.indexOf(array_hor[i])
        if(validate.innerText==clima['daily'][ind]['dt']){
            menu_vertical.classList.toggle('hidden');
            contenido_div.classList.toggle('hidden');
            menu_wrapper.classList.toggle('hidden');
        }
        validate.innerText=clima['daily'][ind]['dt']
        info_function(ind);
        tabla_inf(ind);
        icono_back(clima['daily'][ind]['weather']['0']['icon']);
        if(clima['daily'][ind]['rain']){
            rain_span.innerText=clima['daily'][ind]['rain']
        }else{
            rain_span.innerText=0
        }
        if(clima['daily'][ind]['snow']){
            snow_span.innerText=clima['daily'][ind]['snow']
        }else{
            snow_span.innerText=0
        }

    });

}
