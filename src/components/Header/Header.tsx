const initDate = (): string =>
	new Intl.DateTimeFormat("ko-KR", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		weekday: "long",
	}).format(new Date());

const toggleDarkMode = () => document.body.classList.toggle("dark");

function Header() {
	return (
		<header className="my-7 w-full flex justify-between items-center">
			<a href="#" className="dark:text-white font-extrabold text-xl">
				<i className="fa-solid fa-newspaper mr-2 text-news-blue"></i>뉴스스탠드
			</a>
			<i
				onClick={toggleDarkMode}
				className="fa-solid fa-moon text-2xl cursor-pointer hover:animate-wiggle transition-colors dark:text-yellow-400"
			></i>
			<span className="text-sm dark:text-white">{initDate()}</span>
		</header>
	);
}

export default Header;
