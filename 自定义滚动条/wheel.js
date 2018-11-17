//   方法：
		//function myfn(){}----整体返回一个false则表示清除默认事件
		//wheel(obj,myfn)
function wheel(obj,efn){
			function fn(e){
				e=e||window.event;
				var wheelValue=e.wheelDelta/120||-e.detail/3;
				if(efn.call(this,e,wheelValue)===false){
					!-[1,]?e.preventDefault():e.returnValue=false;
				}
			}
			var type=obj.onmousewheel===null?'mousewheel':'DOMMouseScroll';
			!-[1,]?obj.attachEvent(type,fn):obj.addEventListener(type,fn);
		}