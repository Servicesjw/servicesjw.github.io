months = ['Error','січня',"лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"];
order = true;

var button = document.querySelector('.planService');
var sort = document.querySelector('.sort');
var shareButton = document.querySelector('.shareButton');

button.addEventListener('click', function () {
	let partner = document.querySelector('input.partner').value;
	let date = document.querySelector('input.Date').value;
	let hour = document.querySelector('input.Hour').value;
	let type = document.querySelector('select.Type').value;

	document.cookie = encodeURIComponent(date + ' ' + hour) + '=' + encodeURIComponent(partner + '|' + type)+'; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT';

	document.querySelector('.addSchedule').classList.add('invisible');
	document.body.style.overflow = 'initial';
	addSchedule();
});

sort.addEventListener('click', function () {
	order = !order;
	addSchedule();
});

shareButton.addEventListener('click', event => {
  if (navigator.share) {
  	urls = getInviteUrl();
    navigator.share({
		title: 'Тест',
		text: 'Тест 2',
    	url: urls
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
  } else {
	  console.log('1');
  }
});

function getInviteUrl () {
	return document.location.href + document.querySelector('input[type="hidden"]').value;
}

function addSchedule () {
	var allCookie = document.cookie.split('; ').sort();
	var hours = 0;
	if(!order) {
		allCookie = allCookie.reverse();
	}
	if(allCookie != ''){
		document.querySelector('.service').innerHTML = '';
		allCookie.forEach( function(element, index) {
			var service = decodeURIComponent(element).split('=');
			if(service != '') {
				time = service[0].split(' ');
				value = service[1].split('|');
				date = time[0].split('-');
				hour = time[1];
				partner = value[0];
				type = value[1];
				let dateObj = new Date();
			    let month = dateObj.getMonth()+1;
			    let day = dateObj.getDate()
			    let year = dateObj.getFullYear();
			    // if(date[0] >= year && date[1] >= month && date[2] >= day) {
			    if(date[0] == year && date[1] >= month && date[2] >= day || date[0] > year){
			    	if(!document.getElementById(`${date[2]}|${date[1]}`)){
			    		let dateBox = document.createElement('div');
		                dateBox.setAttribute("id", `${date[2]}|${date[1]}`);
		                dateBox.classList.add('dateBox');
		                dateBox.innerHTML = `<h3>${date[2]} ${months[parseInt(date[1])]}</h3>`;
		                document.querySelector('.service').appendChild(dateBox);
			    	}

			    	wrapper = document.createElement('div');
			    	wrapper.classList.add('wrapper');
			    	document.getElementById(`${date[2]}|${date[1]}`).appendChild(wrapper);

			    	part = document.createElement('h4');
			    	part.classList.add('partner');
			    	part.innerHTML = partner;
			    	wrapper.appendChild(part);

			    	time = document.createElement('h5');
			    	time.classList.add('time');
			    	time.innerHTML = hour;
			    	wrapper.appendChild(time);

			    	close = document.createElement('div');
			    	close.classList.add('close');
			    	close.setAttribute("id", service[0]);
			    	wrapper.appendChild(close);
			    	close.addEventListener('click',function (e) {
			    		cookie = encodeURIComponent(e.target.getAttribute('id'));
			    		console.log(e.target);
			    		document.cookie = cookie + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			    		e.target.parentElement.classList.add('aniDelete');
			    		setTimeout(function () {
			    			e.target.parentElement.classList.add('invisible');
			    		}, 300);
			    	})

			    }else if (date[0] == year && date[1] == month && parseInt(date[2]) < day) {
			    	hours++;
			    	console.log(1);
			    }else {
			    	console.log(year==date[0],month==date[1],month,date[1],day<date[2]);
			    }
			}
		});	

		document.querySelector('.hours').innerHTML = hours;
	}
}
