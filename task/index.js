var table=document.createElement('table');
table.setAttribute('class','table');

var thead=document.createElement('thead');
thead.setAttribute('class','thead-dark');

var tr=document.createElement('tr');
var th1=createelement('th',first);
var th2=createelement('th',last);
tr.append(th1,th2)
thead.append(tr);

var tbody=document.createElement('tbody');
var tr=document.createElement('tr')
var td1=createelement('td','mark')
var td2=createelement('td','doe')

tr.append(td1,td2);
tbody.append(tr);
table.append(thead,tbody);

document.body.append(table);

function createelement(elename,value=""){
    var element=document.createElement(elename);
    element.innerHTML=value;
    
    return element;


}