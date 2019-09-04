let Lang = (lang) => {
	return lang == 'uz'
		? {
				lenta: 'Лента',
				hot: 'Тезкор хабарлар',
				most: 'Кўп ўқилган',
				about: 'Биз ҳақимизда',
				contact: 'Биз билан боғланиш',
				main: 'Асосий'
			}
		: {
				lenta: 'Лента',
				hot: 'Новости коротко',
				most: 'Популярные новости',
				about: 'О нас',
				contact: 'Контакты',
				main: 'Главная'
			};
};

export default Lang;
