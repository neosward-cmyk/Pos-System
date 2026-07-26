let products =

JSON.parse(
localStorage.getItem("products")
)
||
[];



let purchases =

JSON.parse(
localStorage.getItem("purchases")
)
||
[];





let select =
document.getElementById(
"productSelect"
);





products.forEach((p,index)=>{


select.innerHTML += `

<option value="${index}">

${p.name}

</option>


`;



});







function purchaseStock(){


let index =
Number(select.value);



let qty =
Number(
document.getElementById("qty")
.value
);



let cost =
Number(
document.getElementById("purchaseCost")
.value
);





if(!qty || !cost){

alert("Lengkapkan maklumat");

return;

}





let product =
products[index];





// tambah stok


product.stock += qty;



// update harga modal terbaru


product.cost = cost;





// simpan rekod


purchases.push({

date:
new Date()
.toLocaleString(),


product:
product.name,


qty,


cost,


total:
qty*cost


});





localStorage.setItem(

"products",

JSON.stringify(products)

);



localStorage.setItem(

"purchases",

JSON.stringify(purchases)

);




alert(
"Stok berjaya ditambah"
);



location.reload();


}