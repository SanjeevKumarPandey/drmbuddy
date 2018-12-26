var statuses = [];
var __msg = "";
var msg = [];

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
        for(i=0; i<3; i++){
            if (currStatus[i]==true){
                if(i===0){
                    document.getElementById('License').innerHTML= `<span style="font-weight:700; font-size:80px;">${_msg[0]}</span>`;
                    document.getElementById('license_svr').classList.remove("bad");
                    document.getElementById('license_svr').classList.add("ok");
                } else if(i===1){
                    document.getElementById('Indiv').innerHTML= `<span style="font-weight:700; font-size:80px;">${_msg[1]}</span>`;
                    document.getElementById('indiv_svr').classList.remove("bad");
                    document.getElementById('indiv_svr').classList.add("ok");
                } else if(i===2){
                    document.getElementById('CRL').innerHTML= `<span style="font-weight:700; font-size:80px;">${_msg[2]}</span>`;
                    document.getElementById('crl_svr').classList.remove("bad");
                    document.getElementById('crl_svr').classList.add("ok");
                }

            } else if (currStatus[i]==false){
                if(i===0){
                    document.getElementById('license_svr').classList.remove("ok");
                    document.getElementById('license_svr').classList.add("bad");
                    document.getElementById('License').innerHTML= `<span style="font-weight:600; font-size:35px;">${_msg[0]}</span>`;
                } else if(i===1){
                    document.getElementById('indiv_svr').classList.remove("ok");
                    document.getElementById('indiv_svr').classList.add("bad");
                    document.getElementById('Indiv').innerHTML= `<span style="font-weight:600; font-size:35px;">${_msg[1]}</span>`;
                } else if(i===2){
                    document.getElementById('crl_svr').classList.remove("ok");
                    document.getElementById('crl_svr').classList.add("bad");
                    document.getElementById('CRL').innerHTML= `<span style="font-weight:600; font-size:35px;">${_msg[2]}</span>`;
                }
            }
        }
    } else {
        console.log('cookie NOT found');
    }
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
    xmlhttp.onloadend=function(){
    if (this.readyState==4){
        if(this.status==200){
        document.getElementById(id).innerHTML= '<span style="font-weight:700; font-size:80px;">OK</span>';
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
        document.getElementById(id).innerHTML= '<span style="font-weight:600; font-size:35px;">No Internet!</span>';
        status = false;
        __msg = 'No Internet!';
        msg[index] = __msg;
        statuses[index] = status; 
    } else if(this.status==404){
        //$(widget_id).removeClass('ok').addClass('bad');
        document.getElementById(widget_id).classList.remove("ok");
        document.getElementById(widget_id).classList.add("bad");
        document.getElementById(id).innerHTML= '<span style="font-weight:700; font-size:75px;">404</span>';
        status = false;
        __msg = '404';
        msg[index] = __msg;
        statuses[index] = status;
    } else {
        //$(widget_id).removeClass('ok').addClass('bad');
        document.getElementById(widget_id).classList.remove("ok");
        document.getElementById(widget_id).classList.add("bad");
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
//JSON.stringify(statuses)
createCookie("status", JSON.stringify(statuses));
createCookie("message", JSON.stringify(msg));
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
