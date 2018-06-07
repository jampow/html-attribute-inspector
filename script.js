(() => {
	const id = 'qa-inspector';
	const head = document.getElementsByTagName('head')[0];
	const body = document.getElementsByTagName('body')[0];

	const style = document.createElement('style');
	style.innerText = `
		[data-qa] {
			border:red 1px solid !important;
			position:relative !important;
		}
		
		#${id} {
			position: absolute;
			bottom: 0;
			right: 0;
			padding: 5px 10px;
			background-color: red;
		}`;

	const insp = document.createElement('div');
	insp.id = id;

	head.appendChild(style);
	body.appendChild(insp);

	[].forEach.call(document.querySelectorAll('[data-qa]'), el => {
		el.addEventListener('mouseenter', ev => {
			document.getElementById(id).innerText = ev.target.getAttribute('data-qa')
        })
    });
})()
