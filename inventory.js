let products =
JSON.parse(
localStorage.getItem("products")
)
||
[];




let table =
document.getElementById(
"stockTable"
);





products.forEach((p,index)=>{


let status;


if(p.stock <=5){

status=
"🔴 Stok Rendah";

}

else{

status=
"🟢 OK";

}




table.innerHTML +=`

<tr>

<td>
${p.name}
</td>


<td>
${p.stock}
</td>


<td>
${status}
</td>



<td>

<button onclick="addStock(${index})">

Tambah Stok

</button>


</td>


</tr>

`;


});







function addStock(index){


let qty =
prompt(
"Tambah jumlah stok:"
);



qty =
Number(qty);



products[index].stock += qty;



localStorage.setItem(

"products",

JSON.stringify(products)

);



location.reload();


}