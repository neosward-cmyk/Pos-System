let receipt =

JSON.parse(
localStorage.getItem("lastReceipt")
);



if(receipt){



document.getElementById("invoice")
.innerHTML=

receipt.invoice;



document.getElementById("date")
.innerHTML=

receipt.date;



document.getElementById("total")
.innerHTML=

"RM "+
receipt.total.toFixed(2);



document.getElementById("payment")
.innerHTML=

"RM "+
receipt.payment.toFixed(2);



document.getElementById("balance")
.innerHTML=

"RM "+
receipt.balance.toFixed(2);






let box =
document.getElementById("items");



receipt.items.forEach(item=>{


box.innerHTML+=`


<div class="item">


<span>

${item.name}

x${item.qty}

</span>


<span>

RM ${(item.price*item.qty).toFixed(2)}

</span>



</div>


`;



});


}