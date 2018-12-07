(function($){
	var searchParent = function(selector,type,parent) {
		if(!parent.length) {
			throw "Parent not found!";
		}
		if(type == 'id') {
			if('#'+parent.attr('id') == selector) {
				return parent;
			}
		} else if(parent.hasClass(selector.substr(1))) {
            return parent;
        }
		return searchParent(selector,type,parent.parent());
	};
	$.fn.extend({
		findparent: function(selector) {
        	var type = selector.substr(0,1) == '#' ? 'id' : 'class';
			return searchParent(selector,type,this.parent());
		}
	})
})(jQuery);


Object.defineProperty(window, 'mlzl_showErrors', {
    get: function() { 
        return function(errors) {
            var container = arguments[1] ? arguments[1] : null;

            if( !(errors instanceof Array) ) {
                errors = [errors];
            }
            
            var html_errors = '<ul style="padding: 0 0 0 20px;margin: 30px 0 0 0;">';

            if( container ) {

                errors.forEach(function(error,idx){
                    html_errors += '<li style="color: #a00;margin: 0 0 15px 0;"><span style="color: #a00;">'+error+'</span></li>';
                });
    
                html_errors += '</ul>';

                var class_panel = 'lzlsE_mzra_container20171014';
                var element = null;
                if( container.getElementsByClassName(class_panel).length > 0 ) {
                    element = container.getElementsByClassName("class_panel")[0];
                } else {
                    var element = document.createElement('div');
                    element.setAttribute('class', class_panel);
                    element.style.display = 'block';
                    element.style.margin = '20px 0';
                    element.style.background = '#fff';
                    element.style.color = '#fff';
                    element.innerHTML = html_errors;
                    container.appendChild(element);
                }

                element.innerHTML = html_errors;
            } else {

                errors.forEach(function(error,idx){
                    html_errors += '<li style="color: #a00;margin: 0 0 15px 0;"><span style="color: #000;">'+error+'</span></li>';
                });
    
                html_errors += '</ul>';

                var id_panel = 'lzlsE_mzra_panel20171014';

                if(	document.getElementById(id_panel) ) {
                    return;
                }

                var element = document.createElement('div');
                element.setAttribute('id', id_panel);
                element.style.display = 'block';
                element.style.position = 'fixed';
                element.style.left = '0';
                element.style.top = '0';
                element.style.width = '100%';
                element.style.height = '100%';
                element.style.background = 'rgba(255,255,255,0.5)';
                element.style.zIndex = '9999';
                element.innerHTML = '<span style="position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);font-style: italic;font-size: 17px;line-height: 17px;font-weight: bold;background: rgba(0,0,0,0.9);padding: 20px 40px 20px 30px;color: #000;background-color: #fff;border: 1px solid #a00;font-family: Open Sans,sans-serif;"><span style="position: absolute;right: -10px;top: -10px;height: 25px;width: 25px;display: block;border: 2px solid #a00;border-radius: 50%;font-family: Courier New;color: #a00;background-color: #fff;text-align: center;font-style: normal;font-size: 15px;line-height: 24px;cursor: pointer;z-index: 5;" onClick="document.getElementById(\''+id_panel+'\').parentNode.removeChild(document.getElementById(\''+id_panel+'\'));return false;" style="text-decoration: none;position: absolute;">X</span><span style="color: #fff;background-color: #a00;width: 100%;display: block;margin: 0;position: absolute;left: 0;top: 0;padding: 7px 0 7px 15px;z-index: 4;font-style: normal;border: 0;font-size: 13px;line-height: 13px;font-family: Open Sans,sans-serif;">Error</span>'+html_errors+'</span>';

                document.body.appendChild(element);
            }
        };
    }
});

Object.defineProperty(window, 'mlzl_loading', {
    get: function() { 
        return function() {
			var options = {
				text: 'Loading',
				action: 'start',
			};

			var args = arguments[0] ? arguments[0] : {};

			for(var i in options) {
				if( !args[i] ) {
					args[i] = options[i];
				}
			}

			var id_panel = 'ldg_mzra_panel1014';

			if(args.action == 'start') {
				
				if(	document.getElementById(id_panel) ) {
					return;
				}

				window.dotsAnimation = window.setInterval( function() {
		        	var dots = document.getElementById('dots_1014');
			        if( dots.innerHTML.length == 3) {
			            dots.innerHTML = '';
			        } else {
			            dots.innerHTML = dots.innerHTML+'.';
			        }
		        }, 1000);

				var element = document.createElement('div');
				element.setAttribute('id', id_panel);
				element.style.display = 'block';
				element.style.position = 'fixed';
				element.style.left = '0';
				element.style.top = '0';
				element.style.width = '100%';
				element.style.height = '100%';
				element.style.background = 'rgba(255,255,255,0.5)';
				element.style.zIndex = '9999';
				element.innerHTML = '<span style="color: #fff;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);font-style: italic;font-size: 25px;font-weight: bold;background: rgba(0,0,0,0.9);border-radius:20px;padding: 20px 40px 20px 30px;font-family: Open Sans,sans-serif;">'+args.text+'<i id="dots_1014" style="text-decoration: none;position: absolute;"></i></span>';

				document.body.appendChild(element);
			} else if(args.action == 'stop') {
				if(window.dotsAnimation) {
					clearInterval(window.dotsAnimation);
				}
				if(	document.getElementById(id_panel) ) {
					var elem = document.getElementById(id_panel);
					elem.parentNode.removeChild(elem);
				}
			}
        };
    }
});

Object.defineProperty(window, 'mlzl_fail', {
    get: function() {
        return function(error,hrxr) {
             var id_panel = 'lfail_bg_mzra_panel2093';
 
             console.log(error);
             console.log(error.status);
             console.log(error.statusText);
             console.log(hrxr);
 
             var options = {
                 seconds: 10,
                 text: 'Connection is lost. Try connect in {t} Message: {error}',
             };
 
             var args = {};
 
             for(var i in options) {
                 if( !args[i] ) {
                     args[i] = options[i];
                 }
             }

             args.text = args.text.replace("{error}",error.statusText);
 
             if( document.getElementById(id_panel) ) {
                 return;
             }
 
             var element = document.createElement('div');
             element.setAttribute('id', id_panel);
             element.style.display = 'block';
             element.style.position = 'fixed';
             element.style.left = '0';
             element.style.top = '0';
             element.style.width = '100%';
             element.style.height = '100%';
             element.style.background = 'rgba(255,255,255,0.5)';
             element.style.zIndex = '9999';
             element.innerHTML = '<span style="color: #fff;position: absolute;left: 50%;top: 50px;transform: translate(-50%,-50%);font-style: italic;font-size: 18px;font-weight: bold;background: rgba(0,0,0,0.9);border-radius:20px;padding: 20px 40px 20px 30px;font-family: Open Sans,sans-serif;"><span id="text-lost_1014">'+args.text.replace("{t}",args.seconds)+'</span><i id="dots_1014" style="text-decoration: none;position: absolute;"></i></span>';
 
             document.body.appendChild(element);
 
             document.getElementById('text-lost_1014').data_time = args.seconds;
 
             window.dotsTAnimation = window.setInterval(function(){
                 var e = document.getElementById('text-lost_1014');
                 var t = parseInt(e.data_time);
                 if(t < 0) {
                     return;
                 }
                 document.getElementById('text-lost_1014').innerHTML = args.text.replace(/{t}/g,t);
                 t--;
                 document.getElementById('text-lost_1014').data_time = t;
                 if(t < 0 && window.dotsTAnimation) {
                     clearInterval(window.dotsTAnimation);
                     window.location.reload();
                 }
             },1000);
        };
    }
 });
