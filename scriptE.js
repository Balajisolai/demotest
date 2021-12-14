var request = new XMLHttpRequest();
request.open('Get','https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json',true);
request.send();
request.onload=function(){
    var data=JSON.parse(request.response);
    
    console.log(data);{

     let cusd=data.filter((x)=>{
         for (let cur in x.currencies){
             if (x.currencies[cur].code==="USD")
             return true;
         }
     })
   console.log(cusd);
    }
}