(()=>{var t=[[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,0,1,1],[1,0,0,0,0,0,1],[1,0,1,0,1,0,1],[1,0,1,0,1,0,1],[1,1,1,1,1,1,1]],e=window.innerWidth,n=window.innerHeight,a=32,o=u(60),l="#d52b1e",r="#ffffff",i="#013aa6",f="#012975",h="#ffa600",c={x:48,y:64,angle:u(0),speed:0},d=document.createElement("canvas");d.setAttribute("width",e),d.setAttribute("height",n),document.body.appendChild(d);var s=d.getContext("2d");function u(t){return t*Math.PI/180}function y(t,e,n,a){return Math.sqrt(Math.pow(n-t,2)+Math.pow(a-e,2))}function M(e,n){return e<0||e>=t[0].length||n<0||n>=t.length}setInterval((function(){s.fillStyle="red",s.fillRect(0,0,e,n),c.x+=Math.cos(c.angle)*c.speed,c.y+=Math.sin(c.angle)*c.speed;var d,u,g,v=(d=c.angle-o/2,g=o/(u=e),Array.from({length:u},(function(e,n){return l=function(e){for(var n,o=Math.abs(Math.floor((e-Math.PI/2)/Math.PI)%2),l=o?Math.floor(c.x/a)*a+a:Math.floor(c.x/a)*a,r=c.y+(l-c.x)*Math.tan(e),i=o?a:-32,f=i*Math.tan(e),h=l,d=r;!n;){var s=o?Math.floor(h/a):Math.floor(h/a)-1,u=Math.floor(d/a);if(M(s,u))break;(n=t[u][s])||(h+=i,d+=f)}return{angle:e,distance:y(c.x,c.y,h,d),vertical:!0}}(o=d+n*g),r=function(e){for(var n,o=Math.abs(Math.floor(e/Math.PI)%2),l=o?Math.floor(c.y/a)*a:Math.floor(c.y/a)*a+a,r=c.x+(l-c.y)/Math.tan(e),i=o?-32:a,f=i/Math.tan(e),h=r,d=l;!n;){var s=Math.floor(h/a),u=o?Math.floor(d/a)-1:Math.floor(d/a);if(M(s,u))break;(n=t[u][s])||(h+=f,d+=i)}return{angle:e,distance:y(c.x,c.y,h,d),vertical:!1}}(o),r.distance>=l.distance?l:r;var o,l,r})));(function(t){t.forEach((function(t,e){var a=160/function(t,e,n){var a=e-n;return t*Math.cos(a)}(t.distance,t.angle,c.angle)*277;s.fillStyle=t.vertical?f:i,s.fillRect(e,n/2-a/2,1,a),s.fillStyle=l,s.fillRect(e,n/2+a/2,1,n/2-a/2),s.fillStyle=r,s.fillRect(e,0,1,n/2-a/2)}))})(v),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments.length>2?arguments[2]:void 0,l=arguments.length>3?arguments[3]:void 0,r=o*a;t.forEach((function(t,a){t.forEach((function(t,o){t&&(s.fillStyle="grey",s.fillRect(e+o*r,n+a*r,r,r))}))})),s.fillStyle="blue",s.fillRect(e+c.x*o-5,n+c.y*o-5,10,10),s.strokeStyle="blue",s.beginPath(),s.moveTo(c.x*o,c.y*o),s.lineTo((c.x+20*Math.cos(c.angle))*o,(c.y+20*Math.sin(c.angle))*o),s.closePath(),s.stroke(),s.strokeStyle=h,l.forEach((function(t){s.beginPath(),s.moveTo(c.x*o,c.y*o),s.lineTo((c.x+Math.cos(t.angle)*t.distance)*o,(c.y+Math.sin(t.angle)*t.distance)*o),s.closePath(),s.stroke()}))}(0,0,.75,v)}),30),document.addEventListener("keydown",(function(t){"w"===t.key&&(c.speed=2),"s"===t.key&&(c.speed=-2),"a"===t.key&&(c.angle-=u(5)),"d"===t.key&&(c.angle+=u(5))})),document.addEventListener("keyup",(function(t){"w"!==t.key&&"s"!==t.key||(c.speed=0)}))})();