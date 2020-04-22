var scheduledOpen = false;

function initServices () {
	let queryString = window.location.search;

	let urlParams = new URLSearchParams(queryString);

	var date = urlParams.get('d');
	var hour = urlParams.get('h');
	var partner = urlParams.get('p');
	var type = urlParams.get('t');


	// d=2020-04-21&h=13:00&p=Dmitrow%20Igor&t=Bible
	document.cookie = encodeURIComponent(date + ' ' + hour) + '=' + encodeURIComponent(partner + '|' + type)+'; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT';
	addSchedule();
	history.replaceState({ foo: 'bar' }, 'page 2','/');

	var username = getUsername();
	if (!username) {
		username = '';
	}
	document.querySelector('section.settings input').value = username;

}

function changebleType () {
	let input = document.querySelectorAll('.changable');

    if(input != '') {
        setTimeout(function () {
            input[0].addEventListener('focus', function() {
                input[0].type = 'date';
            }, true);

            input[0].addEventListener('blur', function() {
                 input[0].type = 'text';
            }, true);

            input[1].addEventListener('focus', function() {
                input[1].type = 'time';
            }, true);

            input[1].addEventListener('blur', function() {
                 input[1].type = 'text';
            }, true);  
        }, 500);
    }

    document.querySelectorAll('.addSchedule form input[type="text"]').forEach( function(element, index) {
    	element.addEventListener('change', function (e) {
    		hidden = document.querySelector('input[type="hidden"]');
    		if(e.target.classList.contains('Date')){
    			val = hidden.value.split('&');
    			val[0] = `?d=${e.target.value}`;
    			hidden.value = val.join('&');
    		}else if (e.target.classList.contains('Hour')) {
    			val = hidden.value.split('&');
    			val[1] = `h=${e.target.value}`;
    			hidden.value = val.join('&');
    		}
    	})
    });
    var lang = document.querySelectorAll('.languages button');

   	lang.forEach( function(element, index) {
    	element.addEventListener('click', function (e) {
    		lang.forEach(function (el, index) {
    			el.classList.add('disabled');
    		});
    		e.target.classList.remove('disabled');		
    	});
    });

    username = document.querySelector('section.settings input');
    username.addEventListener('change', function (e) {
    	document.cookie = `username=${encodeURIComponent(e.target.value)}; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
    });
}



window.addEventListener('scroll', function () {
	var offtop = window.pageYoffset || document.documentElement.scrollTop;
	var scheduled = document.querySelector('.scheduled');
	if( offtop >= 253) {
		scheduled.style.borderRadius = '0';
		if (scheduledOpen == false) {
			document.body.style.overflow = 'hidden';
			scheduledOpen = true;
			scroll(0,254);
			setTimeout(function () {
				document.body.style.overflow = 'initial';
				scroll(0,254);
			}, 150);
		}
	}else {
		scheduledOpen = false;
		scheduled.style.borderRadius = `${30-offtop*0.118110}px`
	}
});

window.addEventListener('load', function () {
	var newSchedule = document.querySelector('.newSchedule');
	var close = document.querySelector('.addSchedule .close');
	var openSet = document.querySelector('img.settings');	
	var closeSet = document.querySelector('.settings .close');
	registerSW();
	// addSchedule();
	initServices();
	newSchedule.addEventListener('click',function () {
		document.querySelector('.addSchedule').classList.remove('invisible');
		document.querySelector('.addSchedule .content').classList.add('aniSchedule');
		document.body.style.overflow = 'hidden';

		setTimeout(function () {
			document.querySelector('.addSchedule .content').classList.remove('aniSchedule');
		}, 10);
	});

	openSet.addEventListener('click',function () {
		document.querySelector('section.settings').classList.remove('invisible');
		document.querySelector('section.settings .content').classList.add('aniSchedule');
		document.body.style.overflow = 'hidden';

		setTimeout(function () {
			document.querySelector('section.settings .content').classList.remove('aniSchedule');
		}, 10);
	});

	close.addEventListener('click',function () {
		document.querySelector('.addSchedule').classList.add('invisible');
		document.body.style.overflow = 'initial';
	});

	closeSet.addEventListener('click',function () {
		document.querySelector('section.settings').classList.add('invisible');
		document.body.style.overflow = 'initial';
	});

	changebleType();
});

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (e) {
      console.log(`SW registration failed`);
    }
  }
}