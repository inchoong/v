String.prototype.trim = function(){return this.replace(/(^\s+)|\s+$/g,"");}
function ctrlDisplay()
{
	document.getElementById("myDiv").style.display = "none";
}
function loadXMLDoc()
{
var xmlhttp;
var wx_url;
var judge_url;
var get_url;

wx_url =  document.getElementById("user_url").value;
wx_url = wx_url.trim();
wx_url = wx_url.replace(/^https/,"http");
judge_url = wx_url.substr(0, 24);

if(wx_url.trim() == ""){
alert("请输入正确的公众号文章网址");
}else if(judge_url != "https://mp.weixin.qq.com/")
{
alert("请输入正确的公众号文章网址");
}
else{

get_url = "get_wx.php?url=" + wx_url;
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
			if(xmlhttp.responseText == "error")
			{	
				document.getElementById("myDiv").innerHTML="";
				alert("没有找到正确的下载地址，请检查你输入的网址！");
			}else{

				var server_return = xmlhttp.responseText;
				//alert(server_return);
				var array=server_return.split("\n");
				//alert(array);
				var array1 = array[0].split("\"");
				var array2 = array[1].split("\"");
				//alert(array2);
				var url_name = array1[1].replace(/\"/g,"");
				//decodeURIComponent(
				var url_id = array2[1].replace(/\"/g,"");
				var content;
				var judge_type;
				judge_type = url_name.substr(0, 32);
				if(judge_type == "http://ws.stream.qqmusic.qq.com/"){
					content = "<a href=\"";
					content = content + url_name;
					content = content + "\" target=\"_self\" download=\"getvoice.mp3\">" + url_id +"<\/a>";
			
				}else{
					content = "<a href=\"http:\/\/res.wx.qq.com/voice/getvoice?mediaid=";
					content = content + url_id;
					content = content + "\" target=\"_self\" download=\"getvoice.mp3\">" + url_name +"<\/a>";
				}
			document.getElementById("myDiv").style.display = "block";
			document.getElementById("myDiv").innerHTML="点击下载:" + content;
			}	
		}
}
xmlhttp.open("GET", get_url, true);
xmlhttp.send();
document.getElementById("user_url").value = "正在加载下载地址，请稍等...";
document.getElementById("updateBTN").disabled = true;
}
}