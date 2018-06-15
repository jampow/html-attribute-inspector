((attribute) => {
	const delegate = (elSelector, eventName, selector, fn) => {
		var element = document.querySelector(elSelector);

		element.addEventListener(eventName, function(event) {
			var possibleTargets = element.querySelectorAll(selector);
			var target = event.target;

			for (var i = 0, l = possibleTargets.length; i < l; i++) {
				var el = target;
				var p = possibleTargets[i];

				while(el && el !== element) {
					if (el === p) {
						return fn.call(p, event);
					}

					el = el.parentNode;
				}
			}
		});
	}

	const id = 'attr-inspector';
	const head = document.getElementsByTagName('head')[0];
	const body = document.getElementsByTagName('body')[0];

	const style = document.createElement('style');
	style.innerText = `
		[${attribute}] {
			border:red 1px solid !important;
			position:relative !important;
		}
		
		#${id} {
			position: fixed;
			bottom: 0;
			right: 0;
			padding: 5px 10px;
			background-color: red;
		}`;

	const insp = document.createElement('div');
	insp.id = id;

	head.appendChild(style);
	body.appendChild(insp);

	delegate('body', 'mouseover', `[${attribute}]`, ev => {
		document.getElementById(id).innerText = ev.target.getAttribute(attribute)
	})
})('data-qa')
