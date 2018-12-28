var statuses = [];
var __msg = "";
var msg = [];
const months = ["JAN", "FEB", "MAR", "APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

//index 0 - license svr 
//index 1 - indiv svr
//index 2 - crl svr
//license_svr","License

$(function() {
    if ((readCookie("status") != null) && (readCookie("message") != null)) {
        //$("body").removeClass().addClass(readCookie("color"));
        var getCookie = readCookie("status");
        var getMsg = readCookie("message");
        var currStatus = JSON.parse(getCookie);
        var _msg = JSON.parse(getMsg);
        console.log('cookie found\n');
        console.log(currStatus);
        console.log(getMsg);
        for(i=0; i<3; i++){
            if (currStatus[i]==true){
                if(i===0){
                    document.getElementById('License').innerHTML= `${_msg[0]}`;
                    document.getElementById('License').classList.remove('bad-content');
                    document.getElementById('License').classList.remove('c404');
                    document.getElementById('License').classList.add('ok-content');
                    document.getElementById('license_svr').classList.remove("bad");
                    document.getElementById('license_svr').classList.add("ok");
                } else if(i===1){
                    document.getElementById('Indiv').innerHTML= `${_msg[1]}`;
                    document.getElementById('Indiv').classList.remove('bad-content');
                    document.getElementById('Indiv').classList.remove('c404');
                    document.getElementById('Indiv').classList.add('ok-content');
                    document.getElementById('indiv_svr').classList.remove("bad");
                    document.getElementById('indiv_svr').classList.add("ok");
                } else if(i===2){
                    document.getElementById('CRL').innerHTML= `${_msg[2]}`;
                    document.getElementById('CRL').classList.remove('bad-content');
                    document.getElementById('CRL').classList.remove('c404');
                    document.getElementById('CRL').classList.add('ok-content');
                    document.getElementById('crl_svr').classList.remove("bad");
                    document.getElementById('crl_svr').classList.add("ok");
                }

            } else if ((currStatus[i]==false) && (_msg[i] !== "404")){
                if(i===0){
                    document.getElementById('license_svr').classList.remove("ok");
                    document.getElementById('license_svr').classList.add("bad");
                    document.getElementById('License').innerHTML= `${_msg[0]}`;
                    document.getElementById('License').classList.remove('ok-content');
                    document.getElementById('License').classList.remove('c404');
                    document.getElementById('License').classList.add('bad-content');
                } else if(i===1){
                    document.getElementById('indiv_svr').classList.remove("ok");
                    document.getElementById('indiv_svr').classList.add("bad");
                    document.getElementById('Indiv').innerHTML= `${_msg[1]}`;
                    document.getElementById('Indiv').classList.remove('ok-content');
                    document.getElementById('Indiv').classList.remove('c404');
                    document.getElementById('Indiv').classList.add('bad-content');
                } else if(i===2){
                    document.getElementById('crl_svr').classList.remove("ok");
                    document.getElementById('crl_svr').classList.add("bad");
                    document.getElementById('CRL').innerHTML= `${_msg[2]}`;
                    document.getElementById('CRL').classList.remove('ok-content');
                    document.getElementById('CRL').classList.remove('c404');
                    document.getElementById('CRL').classList.add('bad-content');
                }
            } else if ((currStatus[i]==false) && (_msg[i] == "404")){
                if(i===0){
                    document.getElementById('license_svr').classList.remove("ok");
                    document.getElementById('license_svr').classList.add("bad");
                    document.getElementById('License').innerHTML= `${_msg[0]}`;
                    document.getElementById('License').classList.remove('ok-content');
                    document.getElementById('License').classList.remove('bad-content');
                    document.getElementById('License').classList.add('c404');
                } else if(i===1){
                    document.getElementById('indiv_svr').classList.remove("ok");
                    document.getElementById('indiv_svr').classList.add("bad");
                    document.getElementById('Indiv').innerHTML= `${_msg[1]}`;
                    document.getElementById('License').classList.remove('ok-content');
                    document.getElementById('License').classList.remove('bad-content');
                    document.getElementById('License').classList.add('c404');
                } else if(i===2){
                    document.getElementById('crl_svr').classList.remove("ok");
                    document.getElementById('crl_svr').classList.add("bad");
                    document.getElementById('CRL').innerHTML= `${_msg[2]}`;
                    document.getElementById('License').classList.remove('ok-content');
                    document.getElementById('License').classList.remove('bad-content');
                    document.getElementById('License').classList.add('c404');
                }
            }
        }
    } else {
        console.log('cookie NOT found');
    }
    var __ts = readCookie("log");
    document.getElementById('timestamp').innerText = __ts;
});

$(document).ready(function(){
    $("#checkupbtn").click(function(){
        $("#box").animate({width: "240px"},2000,function(){
            //console.log("finished");
        });
    });
});

function externalURLHandler(url, widget_id, id, status, index){
    var xmlhttp = createXMLHttpRequestObject();
    xmlhttp.open('GET',url,true);
    //xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "http://crl2.adobe.com/Adobe/FlashAccessIndividualizationCA.crl");
    xmlhttp.onloadend=function(){
    if (this.readyState==4){
        if(this.status==200){
        document.getElementById(id).innerHTML= 'OK';
        document.getElementById(id).classList.remove('bad-content');
        document.getElementById(id).classList.remove('c404');
        document.getElementById(id).classList.add('ok-content');
        document.getElementById(widget_id).classList.remove("bad");
        document.getElementById(widget_id).classList.add("ok");
        //$(widget_id).removeClass('bad').addClass('ok');
        status = true;
        __msg = 'OK';
        msg[index] = __msg;
        statuses[index] = status; 
    } else if(this.status==0) {
        //$(widget_id).removeClass('ok').addClass('bad');
        document.getElementById(widget_id).classList.remove("ok");
        document.getElementById(widget_id).classList.add("bad");
        document.getElementById(id).classList.remove('ok-content');
        document.getElementById(id).classList.remove('c404');
        document.getElementById(id).classList.add('bad-content');
        document.getElementById(id).innerHTML= '☎';
        status = false;
        __msg = '☎';
        msg[index] = __msg;
        statuses[index] = status; 
    } else if(this.status==404){
        //$(widget_id).removeClass('ok').addClass('bad');
        document.getElementById(widget_id).classList.remove("ok");
        document.getElementById(widget_id).classList.add("bad");
        document.getElementById(id).classList.remove('ok-content');
        document.getElementById(id).classList.remove('bad-content');
        document.getElementById(id).classList.add('c404');
        document.getElementById(id).innerHTML= '404';
        status = false;
        __msg = '404';
        msg[index] = __msg;
        statuses[index] = status;
    } else {
        //$(widget_id).removeClass('ok').addClass('bad');
        document.getElementById(widget_id).classList.remove("ok");
        document.getElementById(widget_id).classList.add("bad");
        document.getElementById(id).classList.remove('ok-content');
        document.getElementById(id).classList.remove('c404');
        document.getElementById(id).classList.add('bad-content');
        document.getElementById(id).innerHTML= `ERROR! ${this.status}`;
        status = false;
        __msg = 'ERROR';
        msg[index] = __msg;
        statuses[index] = status;
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
externalURLHandler("http://access.adobeprimetime.com/flashaccessserver/axs_prod/flashaccess/license/v6","license_svr","License", "lsvr_status", 0);
externalURLHandler("http://individualization.adobe.com/flashaccess/i15n/v5","indiv_svr", "Indiv", "indiv_status", 1);
externalURLHandler("http://crl2.adobe.com/Adobe/FlashAccessIndividualizationCA.crl","crl_svr","CRL", "crl_status", 2);
//statuses.join('|');
var d = new Date();
var log = d.toLocaleDateString().split('/')[1] + months[d.getMonth()] +" "+ d.toLocaleTimeString();
document.getElementById('timestamp').innerText = log;
createCookie("log", log);
setCookies();
}

function setCookies() {
    var n = setTimeout(function(){createCookie("status", JSON.stringify(statuses));
    createCookie("message", JSON.stringify(msg));},2000);
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else
        var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ')
                c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {
    createCookie(name,"",-1);
}
