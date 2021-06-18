// Ссылки на кинопоиск
const API_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_POPULAR_PAGE = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=';
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

// кнопки
const previous = document.getElementById('previous');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const next = document.getElementById('next');


// кнопка 1
one.addEventListener('click', function() {
	const page_one = `${API_URL_POPULAR_PAGE}1`;
	getMovies(page_one);
	active_one();
});

// кнопка 2
two.addEventListener('click', function() {
	const page_two = `${API_URL_POPULAR_PAGE}2`;
	getMovies(page_two);
	active_two();
});

// кнопка 3
three.addEventListener('click', function() {
	const page_three = `${API_URL_POPULAR_PAGE}3`;
	getMovies(page_three);
	active_three();
});

// кнопка 4
four.addEventListener('click', function() {
	const page_four = `${API_URL_POPULAR_PAGE}4`;
	getMovies(page_four);
	active_four();
});

// кнопка 5
five.addEventListener('click', function() {
	const page_five = `${API_URL_POPULAR_PAGE}5`;
	getMovies(page_five);
	active_five();
});

// начальный счетчик на кнопку пред. страница
let counterPrev = 1;

// После переключения на копку с цифрой(1,2,3) не идет переключение на кнопку по списку, т.к. идет по counter-у, как встроить это переключение, чтобы при нажатии на кнопку 3, а потом на кнопку next, переключение шло на 4, а не на 2, как по дефолту я сделал. Оба варианта рабочие, но не взаимосвязанные.

// Вопрос совсем не понятен. Что за кнопка по списку и какое на неё должно происходить переключение с кнопкок с цифрой(1,2,3)? Чем точнее вы будете описывать задачу, чем конкретнее будут составлены вопросы, тем больше ясности будет у вас по данной задаче, тем больше вероятность самостоятельно найти ответ.

// Код решения задачи написан очень сложно. Всё что нужно сделать в пагинации, так это хранить значение текущей страницы в отдельной переменной. Значение текущей страницы можно менять назад или вперёд, проверяя её на достижение минимальной и максимальной границ по страницам. Для переключения по номерам страницам достаточно присваивать в данную переменную соответствующие значения страниц. Всегда, когда вы получаете новое значение страницы, нужно запускать один и тот же код, который загрузит новую порцию информации с сервера.

// Вверху я увидел пять слушателей события клик на пять элементов номеров страниц. Но почему бы здесь не приминить делигированные событий и обрабатывать событие клика по страницам из их общего родителя. Вы используете материал предыдущих модулей или нет?
//----------------------------------------- c д е л а н о------------------------------------------//


// Ниже в обработчике клика по previous (из названия не понятно что это) я снова встречаю пустые команды return. И снова вопрос, нужны ли они в вашем коде? Понимаете ли вы как они работают и нужны ли они здесь в данном конкретном случае?
// --------------------------------------- у б р а н о --------------------------------------------//


// Ещё ниже я увидел по 5 методов от classList. Зачем так писать, если до установки нового номера страницы вы имеете старый номер страницы, и по нему можно просто снять класс, а затем установить его для новой страницы?



// событие на кнопку пред.
previous.addEventListener('click', function() {
	let prev = `${API_URL_POPULAR_PAGE}${counterPrev - 1}`;

	if (counterPrev == 1) {
		counterPrev = 5;
		prev = `${API_URL_POPULAR_PAGE}5`;
		getMovies(prev);
		active_five();
		return;
	}
	else if (counterPrev == 5) {
		counterPrev--;
		getMovies(prev);
		active_four();
		return;
	}
	else if (counterPrev == 4) {
		counterPrev--;
		getMovies(prev);
		active_three();
		return;
	}

	else if (counterPrev == 3) {
		counterPrev--;
		getMovies(prev);
		active_two();
		return;
	}

	else if (counterPrev == 2) {
		counterPrev--;
		getMovies(prev);
		active_one();
		return;
	}
})

//счетчик на кнопку след. страница
let counterNext = 1;


// обработчик события на кнопку след. страница
next.addEventListener('click', function() {
	let next = `${API_URL_POPULAR_PAGE}${counterNext + 1}`;

	if (counterNext == 1) {
		counterNext = 2;
		getMovies(next);
		active_two();
		return;
	}
	else if (counterNext == 2) {
		counterNext++;
		getMovies(next);
		active_three();
		return;
	}
	else if (counterNext == 3) {
		counterNext++;
		getMovies(next);
		active_four();
		return;
	}

	else if (counterNext == 4) {
		counterNext++;
		getMovies(next);
		active_five();
		return;
	}

	else if (counterNext == 5) {
		counterNext = counterNext - 4;
		next = `${API_URL_POPULAR_PAGE}1`
		getMovies(next);
		active_one();
		return;
	}
})

// функции на переключение фона у текущего элемента
function active_one() {
	one.classList.toggle('active');
	two.classList.remove('active');
	three.classList.remove('active');
	four.classList.remove('active');
	five.classList.remove('active');
}

function active_two() {
	one.classList.remove('active');
	two.classList.add('active');
	three.classList.remove('active');
	four.classList.remove('active');
	five.classList.remove('active');
}

function active_three() {
	one.classList.remove('active');
	two.classList.remove('active');
	three.classList.add('active');
	four.classList.remove('active');
	five.classList.remove('active');
}

function active_four() {
	one.classList.remove('active');
	two.classList.remove('active');
	three.classList.remove('active');
	four.classList.add('active');
	five.classList.remove('active');
}

function active_five() {
	one.classList.remove('active');
	two.classList.remove('active');
	three.classList.remove('active');
	four.classList.remove('active');
	five.classList.add('active');
}

//// поиск

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
	if (search.value) {
		getMovies(apiSearchUrl);
		search.value = '';
	}
})