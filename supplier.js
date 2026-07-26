let suppliers =
JSON.parse(
localStorage.getItem("suppliers")
)
||
[];





function addSupplier(){


let name =
document.getElementById("supplierName")
.value;


let phone =
document.getElementById("supplierPhone")
.value;



if(!name){

alert("Masukkan nama supplier");

return;

}



suppliers.push({

id:Date.now(),

name,

phone


});




localStorage.setItem(

"suppliers",

JSON.stringify(suppliers)

);



displaySupplier();


}




function displaySupplier(){


let box =
document.getElementById("supplierList");


box.innerHTML="";



suppliers.forEach((s)=>{


box.innerHTML += `


<div class="product">


<div>

<b>
${s.name}
</b>

<br>

📞 ${s.phone}


</div>


</div>


`;



});


}




displaySupplier();