let db;



let request =
indexedDB.open(
"POS_DATABASE",
1
);



request.onupgradeneeded=function(e){


db=e.target.result;



let store =
db.createObjectStore(
"products",
{
keyPath:"id"
}
);



store.createIndex(
"barcode",
"barcode",
{
unique:false
}
);


};




request.onsuccess=function(e){

db=e.target.result;


console.log(
"Database Ready"
);


};





function saveDB(product){


let tx =
db.transaction(
"products",
"readwrite"
);



tx.objectStore(
"products"
)
.put(product);



}





function loadDB(){


let tx =
db.transaction(
"products",
"readonly"
);



let request =
tx.objectStore(
"products"
)
.getAll();



request.onsuccess=function(){


products=request.result;


displayProducts();


};


}