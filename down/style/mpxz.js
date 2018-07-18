String.prototype.trim = function(){return this.replace(/(^\s+)|\s+$/g,"");}
function ctrlDisplay()
{
	document.getElementById("myDiv").style.display = "none";
}
function loadXMLDoc()
{
var xmlhttp;
var mp_url;
var judge_url;
var get_url;
//http://www.meipai.com/media/805368928
mp_url =  document.getElementById("user_url").value;
mp_url = mp_url.trim();
mp_url = mp_url.replace(/^https/,"http");
judge_url = mp_url.substr(0, 28);

if(mp_url.trim() == ""){
alert("请输入正确的美拍视频网址");
return;
}else if(judge_url != "http://www.meipai.com/media/")
{
alert("请输入正确的美拍视频网址");
return;
}
else{

get_url = "get_mp.php?url=" + mp_url;
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
		
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			document.getElementById("updateBTN").disabled = false;
			document.getElementById("user_url").value = "";
			var content = "";
			if(xmlhttp.responseText == "error")
			{	
				document.getElementById("myDiv").innerHTML="";
				alert("没有找到正确的下载地址，请检查你输入的网址！");
			}else{

				var server_return = xmlhttp.responseText;
				//alert(server_return);
				var array=server_return.split("\n");
				//alert(array);
				
				var array1 = array[0].split('"'); //url
				var array2 = array[1].split('"'); //title
				
				var url = array1[1];
				var title = array2[1];
				//alert(url);
				//alert(title);
				//var encryptedHexStr = CryptoJS.enc.Hex.parse(flv);
			    //var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	
	        var parsedWordArray = CryptoJS.enc.Base64.parse(url);
            var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
			//alert(parsedStr);		
					content = "<a href=\"";
					content = content + parsedStr;
					content = content + "\" target=\"_self\" download=\"getvoice.mp3\">" + decodeURIComponent(title) +"<\/a>";			
			}
			
			document.getElementById("myDiv").style.display = "block";
			document.getElementById("myDiv").innerHTML="点击下载:<br>" + content;
			}	
		}
}
xmlhttp.open("GET", get_url, true);
xmlhttp.send();
document.getElementById("user_url").value = "正在加载下载地址，请稍等...";
document.getElementById("updateBTN").disabled = true;
}
