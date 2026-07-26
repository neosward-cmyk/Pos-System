let scanner;



function startScanner(){


scanner = new Html5QrcodeScanner(

"scanner",

{

fps:10,

qrbox:250

}

);



scanner.render(

(code)=>{


document.getElementById("barcode")
.value=code;



searchBarcode();



},

(error)=>{

}

);


}






function searchBarcode(){


let code =
document.getElementById("barcode").value;



if(!code)
return;



let product =
products.find(

p=>p.barcode==code

);



if(product){


addCart(
products.indexOf(product)
);


document.getElementById("barcode")
.value="";


}


}