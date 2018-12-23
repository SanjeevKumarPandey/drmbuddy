// $(function() {
//     $("a").click(function() {
//         var color = $(this).text();
//         $("body").removeClass().addClass(color);
//         //createCookie("color",color);
//         return false;
//     });

//     if (readCookie("color") != null) {
//       $("body").removeClass().addClass(readCookie("color"));

//     }
//     else {
//       $("body").removeClass().addClass("red");
//     }
// });

// function createCookie(name,value,days) {
//     if (days) {
//         var date = new Date();
//         date.setTime(date.getTime()+(days*24*60*60*1000));
//         var expires = "; expires="+date.toGMTString();
//     }
//     else
//         var expires = "";
//         document.cookie = name+"="+value+expires+"; path=/";
//     }

//     function readCookie(name) {
//         var nameEQ = name + "=";
//         var ca = document.cookie.split(';');
//         for (var i=0;i < ca.length;i++) {
//             var c = ca[i];
//             while (c.charAt(0)==' ')
//                 c = c.substring(1,c.length);
//             if (c.indexOf(nameEQ) == 0)
//                 return c.substring(nameEQ.length,c.length);
//         }
//         return null;
//     }

//     function eraseCookie(name) {
//     createCookie(name,"",-1);
// }

/*-----*/

$(document).ready(function(){
    $("#checkupbtn").click(function(){
        $("#box").animate({width: "150px"},2000,function(){
            //console.log("finished");
        });
    });
});

function externalURLHandler(url, widget_id, id){
    var xmlhttp = createXMLHttpRequestObject();
    xmlhttp.open('GET',url,true);
    xmlhttp.onloadend=function(){
    if (this.readyState==4){
        if(this.status==200){
        document.getElementById(id).innerHTML= 'OK';
        document.getElementById(widget_id).classList.remove("bad");
        document.getElementById(widget_id).classList.add("ok");
        //$(widget_id).removeClass('bad').addClass('ok');
         
    } else if(this.status==0) {
        //$(widget_id).removeClass('ok').addClass('bad');
        document.getElementById(widget_id).classList.remove("ok");
        document.getElementById(widget_id).classList.add("bad");
        document.getElementById(id).innerHTML= 'No Internet!';
    } else if(this.status==404){
        //$(widget_id).removeClass('ok').addClass('bad');
        document.getElementById(widget_id).classList.remove("ok");
        document.getElementById(widget_id).classList.add("bad");
        document.getElementById(id).innerHTML= '404';
    } else {
        //$(widget_id).removeClass('ok').addClass('bad');
        document.getElementById(widget_id).classList.remove("ok");
        document.getElementById(widget_id).classList.add("bad");
        document.getElementById(id).innerHTML= `ERROR! ${this.status}`;
    }
    };};
    xmlhttp.send();
}

function createXMLHttpRequestObject(){
  var xmlHttp;
  try
  {
    xmlHttp = new XMLHttpRequest();
  }
  catch(e)
    {
        try
    {
      xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
    }
    catch(e) { }
    }
  if (!xmlHttp)
    alert("Error creating the XMLHttpRequest object.");
  else 
    return xmlHttp;
}


function setUrl(){
externalURLHandler("http://access.adobeprimetime.com//axs_prod/flashaccess/license/v6","license_svr","License");
var t = setTimeout(function(){
    externalURLHandler("http://individualization.adobe.com/flashaccess/i15n/v5","indiv_svr", "Indiv");
}, 2000);
var f = setTimeout(function(){externalURLHandler("http://crl2.adobe.com/Adobe/FlashAccessIndividualizationCA.crl","crl_svr","CRL")},4000);
}