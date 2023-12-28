let boton

function mostrar(){
    let contrase = document.getElementById("password");
   if (contrase.type == "password"){
        contrase.type = "text"
   }else{
    contrase.type = "password";
   }
}