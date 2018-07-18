String.prototype.trim = function(){return this.replace(/(^\s+)|\s+$/g,"");}
function ctrlDisplay()
{
	document.getElementById("myDiv").style.display = "none";
}
function loadXMLDoc()
{
var xmlhttp;
var open_url;
var judge_url;
var get_url;
//http://open.163.com/movie/2016/6/4/J/MBOR278SK_MBP8E2U4J.html
open_url =  document.getElementById("user_url").value;
open_url =  open_url.trim();
open_url = open_url.replace(/^https/,"http");
judge_url = open_url.substr(0, 26);

if(open_url.trim() == ""){
alert("请输入正确的公众号文章网址");
return;
}else if(judge_url != "http://open.163.com/movie/")
{
alert("请输入正确的公众号文章网址");
return;
}
else{

get_url = "get_open.php?url=" + open_url;
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
				
				var array1 = array[0].split(' = '); //title
				var array2 = array[1].split(' = '); //encrypt
				var content = "";
				var judge_array = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10");
				var is_duplicate = 0;
				for(var i = 2; i< array.length - 1; i++)
				{
			
					var array3 = array[i].split(' = '); //flv
					//alert(array3);
					var title = array1[1];
					//decodeURIComponent(
					var encrypt = array2[1];
					var flv = array3[1];
				
					if(flv.length > 100){
					var key;
						//alert(flv);

						var encryptedHexStr = CryptoJS.enc.Hex.parse(flv);
						var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
						if(encrypt == 1)
						{
							key = "4fxGZqoGmesXqg2o";
						}
						else if(encrypt == 2)
						{
							key = "3fxVNqoPmesAqg2o";
						}else{
							alert("解析失败");
							return;
						}
						var aesDecrypt = CryptoJS.AES.decrypt(srcs, CryptoJS.enc.Utf8.parse(key),{
						mode: CryptoJS.mode.ECB,
						padding: CryptoJS.pad.Pkcs7
						});
				
						var flv_url = aesDecrypt.toString(CryptoJS.enc.Utf8);
						var array_name1 = flv_url.split('/'); //title
						var array_name2 = array_name1[array_name1.length -1].split('.');
						var array_name3 = array_name2[0].split('_');
						//alert(array_name3[1]);
				
						judge_array[(i-2)] = flv_url;
						//alert(i-2);
						//alert(judge_array[(i-2)]);
						if(i > 3){
							//alert(flv_url);
							for(var j= 0; j< i- 2; j++)
							{
							    
								//alert("judge_array" + j + judge_array[j]);
								if(flv_url == judge_array[j]){
								//duplicate url, don't need add	
								is_duplicate = 1;
								//alert("is duplicate");
								}
							}
						}
						
						if(is_duplicate == 0)
						{	
							content += "<a href=\"" + flv_url;
							content += "\" target=\"_self\" download=\"open.flv\">" + decodeURIComponent(title) +"<\/a>";
					
							if(array_name3[1] == "shd")
							{
								content += '----------超清<br>';
							}else if(array_name3[1] == "hd")
							{
								content += '----------高清<br>';
							}else
							{
								content += '----------标清<br>';
							}
						}	
					}
				is_duplicate = 0;					
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
}