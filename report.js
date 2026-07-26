let history =
JSON.parse(
localStorage.getItem("history")
)
||
[];



let products =
JSON.parse(
localStorage.getItem("products")
)
||
[];





// JUMLAH JUALAN


let totalSales =

history.reduce(

(sum,item)=>

sum+item.total

,0);





document.getElementById("sales")
.innerHTML=

"RM "+
totalSales.toFixed(2);





document.getElementById("todaySales")
.innerHTML=

"RM "+
totalSales.toFixed(2);







// JUMLAH TRANSAKSI


document.getElementById("transaction")
.innerHTML=

history.length;





// JUMLAH PRODUK


document.getElementById("products")
.innerHTML=

products.length;









// PRODUK TERLARIS


let sold={};



history.forEach(transaction=>{


transaction.items.forEach(item=>{


if(!sold[item.name]){

sold[item.name]=0;

}


sold[item.name]+=item.qty;



});


});




let best =
Object.entries(sold)
.sort(
(a,b)=>b[1]-a[1]
)[0];




if(best){

document.getElementById("best")
.innerHTML=

best[0];


}









// CARTA JUALAN


let dates=[];

let values=[];



history.forEach(item=>{


dates.push(item.date);


values.push(item.total);



});




new Chart(

document.getElementById("salesChart"),

{

type:"line",

data:{


labels:dates,

datasets:[{

label:"Jualan",

data:values,

borderWidth:3

}]


},


options:{

responsive:true

}


}

);








// CARTA PRODUK


let productNames =
Object.keys(sold);


let productQty =
Object.values(sold);




new Chart(

document.getElementById("productChart"),

{

type:"bar",

data:{


labels:productNames,


datasets:[{

label:"Unit Terjual",

data:productQty,

borderWidth:2

}]


},


options:{

responsive:true

}


}

);