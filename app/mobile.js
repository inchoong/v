(function (c, d) {
  var e = document.documentElement || document.body,
      a = "orientationchange" in window ? "orientationchange" : "resize",
      b = function () {
        var f = e.clientWidth;
        // e.style.fontSize = (f >= 750) ? "100px" : 100 * (f / 750) + "px"
        e.style.fontSize = (f >= 580) ? "77px" : 77 * (f / 580) + "px"
      };
  b();
  c.addEventListener(a, b, false)
})(window);
function isIos() {
    return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
}