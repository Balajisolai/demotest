var request = new XMLHttpRequest();
request.open('Get','https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json',true);
request.send();
request.onload=function(){
    var data=JSON.parse(request.response);
    
    console.log(data);{
       
const calculateAverageCountryPopulation = (countries) => countries.reduce((a,{ population: p}) => a+=p,0)/countries.length;

console.log(calculateAverageCountryPopulation(data)); 

 
   }}