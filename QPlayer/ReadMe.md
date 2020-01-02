# @[QPlayer](https://github.com/Jrohy/QPlayer)
一款简洁小巧的HTML5底部悬浮音乐播放器. 效果展示: https://32mb.space

##界面
![QPlayer.PNG][1]

##Tips
此版本为纯网页版， 建议有插件冲突的 或 PJAX难以实现的， 使用此版本自定义加入到网页里

欢迎Fork添加无限可能


 [1]: https://32mb.space/usr/uploads/2016/08/858331127.png

 [2]: https://camo.githubusercontent.com/42b56f599b52a82e158df8f7cd1717278c0f274b/68747470733a2f2f33326d622e73706163652f7573722f75706c6f6164732f323031362f30382f3835383333313132372e706e67
 
 - 【**代码使用**】view-source:https://go.choong.net/
 
1.在顶部 < head > 代码 < / head > 之间：

 ```
     <link rel="stylesheet" href="../QPlayer/css/player.css"><!-- 网页悬浮音乐播放器 -->
 ```
 
2.在正文 < body > 代码   < / body > 之间：

 ```
     <!-- 网页悬浮音乐播放器 -->
	<div id="QPlayer">
<div id="pContent">
	<div id="player">
		<span class="cover"></span>
		<div class="ctrl">
			<div class="musicTag marquee">
				<strong>Title</strong>
				 <span> - </span>
				<span class="artist">Artist</span>
			</div>
			<div class="progress">
				<div class="timer left">0:00</div>
				<div class="contr">
					<div class="rewind icon"></div>
					<div class="playback icon"></div>
					<div class="fastforward icon"></div>
				</div>
				<div class="right">
					<div class="liebiao icon"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="ssBtn">
	        <div class="adf"></div>
    </div>
</div>
<ol id="playlist"></ol>
</div>

<script src="../QPlayer/js/jquery.min.js"></script>
<script src="../QPlayer/js/jquery.marquee.min.js"></script>

<script>
  var	playlist = [
      {title:"口弦",artist:"妙子",mp3:"../QPlayer/Music/妙子%20-%20口弦.mp3",cover:"http://p4.music.126.net/KLw_TLTRUe9pClPv4vlEtQ==/936783906865219.jpg?param=106x106",},
  ];  
  var isRotate = true;
  var autoplay = false;
</script>
<script src="../QPlayer/js/player.js"></script>
<script>

function bgChange(){
	var lis= $('.lib');
	for(var i=0; i<lis.length; i+=2)
	lis[i].style.background = 'rgba(246, 246, 246, 0.5)';
}
window.onload = bgChange;
</script> <!-- 网页悬浮音乐播放器 -->
 ```
