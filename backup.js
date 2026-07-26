function backup(){


let data={

products:

JSON.parse(
localStorage.getItem("products")
),


history:

JSON.parse(
localStorage.getItem("history")
)


};



let file =
new Blob(

[
JSON.stringify(data,null,2)
],

{
type:"application/json"
}

);



let a=document.createElement("a");

a.href=
URL.createObjectURL(file);


a.download=
"backup-pos.json";


a.click();


}







function restore(e){


let file =
e.target.files[0];



let reader =
new FileReader();



reader.onload=function(){


let data =
JSON.parse(
reader.result
);



localStorage.setItem(

"products",

JSON.stringify(
data.products
)

);



localStorage.setItem(

"history",

JSON.stringify(
data.history
)

);



alert(
"Backup berjaya dipulihkan"
);


};



reader.readAsText(file);


}