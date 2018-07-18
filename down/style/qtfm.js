String.prototype.trim = function(){return this.replace(/(^\s+)|\s+$/g,"");}
function ctrlDisplay()
{
	document.getElementById("myDiv").style.display = "none";
	document.getElementById("rename").style.display = "none";
}

function loadXMLDoc()
{
var xmlhttp;
var qtfm_url;
var judge_url;
var get_url;

qtfm_url =  document.getElementById("user_url").value;
qtfm_url = qtfm_url.trim();
qtfm_url = qtfm_url.replace(/^https/,"http");
judge_url = qtfm_url.substr(0, 23);

//http://www.qingting.fm/channels/212192/programs/7761527
if(qtfm_url.trim() == ""){
alert("请输入正确的蜻蜓FM网址");
}else if(judge_url != "http://www.qingting.fm/")
{
alert("请输入正确的蜻蜓网址");
}
else{

get_url = "get_qtfm.php?url=" + qtfm_url;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
{
		var content = "";
		var content2 = "";
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			document.getElementById("updateBTN").disabled = false;
			document.getElementById("user_url").value = "";
			if(xmlhttp.responseText == "error" || xmlhttp.responseText == "" )
			{	
				document.getElementById("myDiv").innerHTML="";
				alert("没有找到正确的下载地址，请检查你输入的网址！");
			}else if(xmlhttp.responseText == "error1"){
				document.getElementById("myDiv").innerHTML="";
				alert("专辑个数超过200个，请使用第三种链接格式下载！");
			}
			else
			{

				var server_return = xmlhttp.responseText;
				//alert(server_return);
				var array = server_return.split("\n");
				var tmp_len = (array.length - 1)/2;
				//alert(tmp_len);
				for(var i= 0; i< tmp_len; i++){
					var url_name = array[i*2 + 1];
					var url_id = array[i*2];
					var url_encode_name_array = url_id.split('/');
					var url_encode_name = url_encode_name_array[url_encode_name_array.length - 1];
					//alert(url_encode_name);
					//alert(url_name);
					
					url_name = url_name.replace(/\./,"");
					url_name = url_name.replace(/\\/,"");
					url_name = url_name.replace(/\//,"");
					url_name = url_name.replace(/\:/,"");
					url_name = url_name.replace(/\*/,"");
					url_name = url_name.replace(/\?/,"");
					url_name = url_name.replace(/\"/,"");
					url_name = url_name.replace(/\</,"");
					url_name = url_name.replace(/\>/,"");
					url_name = url_name.replace(/\|/,"");
					url_name = url_name.replace(/\'/,"");
                    var reg = /\\+|\~+|\!+|\@+|\#+|¥+|\￥+|\%+|\^+|\&+|\*+|\(+|\)+|\'+|(\")+|\$+|`+|\“+|\”+|\‘+|\’+|\s+/g;
                    url_name = url_name.replace(reg,"");
                    var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
                    
                    if(regStr.test(url_name)){
                       url_name = url_name.replace(regStr,"")
                    }
                    
				content2 = content2 + "rename " + url_encode_name + ' "' + url_name + '.mp3"' + "\n";
						content = content + "<a href=\"";
						content = content + "http://od.qingting.fm/" + url_id;
						content = content + "\" target=\"_self\" download=\"new\">" + url_name +"<\/a><br>";
				
						//alert(content); //decodeURIComponent()
				}
			//alert(content2);
			document.getElementById("myDiv").style.display = "block";
			document.getElementById("myDiv").innerHTML = "点击下载:" + content;
			if(tmp_len > 1){
				document.getElementById("rename").style.display = "block";
				document.getElementById("rename_content").innerHTML = content2;
			}
			}	
		}
}
xmlhttp.open("GET", get_url, true);
xmlhttp.send();
document.getElementById("user_url").value = "正在加载下载地址，请稍等...";
document.getElementById("updateBTN").disabled = true;
}
}