var scheduledOpen = false;

function initServices () {
	let queryString = window.location.search;

	let urlParams = new URLSearchParams(queryString);

	var date = urlParams.get('d');
	var hour = urlParams.get('h');
	var partner = urlParams.get('p');
	var type = urlParams.get('t');


	// d=2020-04-21&h=13:00&p=Dmitrow%20Igor&t=Bible
	console.log(date,hour,partner,type);

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

    let inputs = document.querySelectorAll('form input[type="text"]');
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
	var close = document.querySelector('.close');
	registerSW();
	addSchedule();
	newSchedule.addEventListener('click',function () {
		document.querySelector('.addSchedule').classList.remove('invisible');
		document.querySelector('.addSchedule .content').classList.add('aniSchedule');
		document.body.style.overflow = 'hidden';

		setTimeout(function () {
			document.querySelector('.addSchedule .content').classList.remove('aniSchedule');
		}, 10);
	});

	close.addEventListener('click',function () {
		document.querySelector('.addSchedule').classList.add('invisible');
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