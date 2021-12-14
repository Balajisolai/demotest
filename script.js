var request = new XMLHttpRequest();
request.open('Get','https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json',true);
request.send();
request.onload=function(){
    var data=JSON.parse(request.response);
    
    console.log(data);{
    //for (var i=0;i<data.length;i++){
      //  console.log(data[i].name+" "+data[i].latlng+" ")
       
        for (var i in data){
            try{
                 var name= data[i].name;
            var lang=data[i].latlng;
            if (lang.length ===0) throw new Error (" Longitude not found");
            wd(name,...lang);
            }catch(e){
                console.log("invalid coordinates"+name+" "+e.message);
            }
    }
}

function wd(name,lat,lon){
var url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dad6ba38571f598eb924a7dedd1e5031`;
var request = new XMLHttpRequest();
request.open('Get',url,true);
request.send();
request.onload=function(){
    var data=JSON.parse(request.response);

console.log(`${name}-${data.main.temp}`);
}
}
}