/* =====================================
   POS SYSTEM ENGINE v2
===================================== */


let products =
JSON.parse(localStorage.getItem("products"))
||
[
{
id:1,
name:"Air Mineral",
price:2,
stock:50
},

{
id:2,
name:"Milo 1kg",
price:18,
stock:20
},

{
id:3,
name:"Beras 5kg",
price:15,
stock:30
}

];



let cart =
[];



let sales =
Number(localStorage.getItem("sales"))
||
0;




/* =========================
 SAVE DATABASE
========================= */


function saveProducts(){

localStorage.setItem(
"products",
JSON.stringify(products)
);

}





/* =========================
 DISPLAY PRODUCT
========================= */


function displayProducts(){


let list =
document.getElementById("productList");


let search =
document.getElementById("search").value
.toLowerCase();



list.innerHTML="";



products
.filter(p=>
p.name.toLowerCase()
.includes(search)
)

.forEach((p,index)=>{


list.innerHTML += `


<div class="product">


<div>

<b>${p.name}</b>

<br>

RM ${p.price.toFixed(2)}

<br>

Stok:
${p.stock}

</div>



<button onclick="addCart(${index})">

+

</button>


</div>


`;



});


}





/* =========================
 ADD PRODUCT
========================= */


function addProduct(){



let name =
document.getElementById("pname").value;



let price =
Number(
document.getElementById("price").value
);



let stock =
Number(
document.getElementById("stock").value
);



if(!name || !price || !stock){

alert("Sila lengkapkan maklumat produk");

return;

}




products.push({

id:Date.now(),

name,

price,

stock


});



saveProducts();


displayProducts();



document.getElementById("pname").value="";

document.getElementById("price").value="";

document.getElementById("stock").value="";



}





/* =========================
 ADD CART
========================= */


function addCart(index){


let product =
products[index];



let item =
cart.find(
(i)=>i.id===product.id
);



if(product.stock<=0){

alert("Stok habis");

return;

}




if(item){


if(item.qty < product.stock){

item.qty++;

}


}else{


cart.push({

id:product.id,

name:product.name,

price:product.price,

qty:1


});


}



renderCart();



}





/* =========================
 DISPLAY CART
========================= */


function renderCart(){



let box =
document.getElementById("cartList");



let total=0;

let count=0;



box.innerHTML="";




cart.forEach((item,index)=>{


let subtotal =
item.price * item.qty;



total += subtotal;

count += item.qty;



box.innerHTML += `


<div class="cart-item">


<div>


<b>${item.name}</b>

<br>


RM ${item.price.toFixed(2)}


</div>



<div>


<button onclick="minusQty(${index})">
-
</button>



${item.qty}



<button onclick="plusQty(${index})">
+
</button>



<button onclick="removeCart(${index})">

🗑

</button>


<br>

<b>
RM ${subtotal.toFixed(2)}
</b>


</div>


</div>


`;



});




document.getElementById("total")
.innerHTML =
total.toFixed(2);



document.getElementById("itemCount")
.innerHTML =
count;



}





/* =========================
 QUANTITY
========================= */


function plusQty(index){


let item =
cart[index];


let product =
products.find(
(p)=>p.id===item.id
);



if(item.qty < product.stock){

item.qty++;

}


renderCart();


}




function minusQty(index){


if(cart[index].qty>1){

cart[index].qty--;

}

else{


cart.splice(index,1);


}



renderCart();


}





function removeCart(index){


cart.splice(index,1);


renderCart();


}





/* =========================
 CHECKOUT
========================= */


function checkout(){



if(cart.length===0){


alert("Cart kosong");

return;


}



let total =
cart.reduce(
(sum,item)=>
sum+(item.price*item.qty)
,0);



let payment =
prompt(
"Jumlah bayaran pelanggan RM",
total
);



if(!payment){

return;

}



payment =
Number(payment);



if(payment < total){

alert("Bayaran tidak cukup");

return;

}



let balance =
payment-total;




// Update stok


cart.forEach(item=>{


let product =
products.find(
(p)=>p.id===item.id
);



product.stock -= item.qty;



});




// Simpan jualan


sales += total;



localStorage.setItem(
"sales",
sales
);




saveProducts();





// Simpan transaksi


let history =
JSON.parse(
localStorage.getItem("history")
)
||
[];



history.push({

date:new Date().toLocaleString(),

items:cart,

total:total


});



localStorage.setItem(
"history",
JSON.stringify(history)

);




let invoice =
"INV-" +
Date.now();



localStorage.setItem(
"lastReceipt",

JSON.stringify({

invoice,

date:
new Date()
.toLocaleString(),

items:cart,

total,

payment,

balance


})

);




window.location.href=
"receipt.html";




cart=[];



renderCart();



displayProducts();



updateSales();


}





function updateSales(){


document.getElementById("todaySales")
.innerHTML=
"RM "+
sales.toFixed(2);


}





updateSales();

displayProducts();

renderCart();
