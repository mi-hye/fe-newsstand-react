function Tab() {
	return (
		<nav className="my-3 flex justify-between w-full">
			<div className="flex items-center">
				<div className="text-font-color cursor-pointer">전체 언론사</div>
				<div className="ml-4 text-font-color cursor-pointer">내가 구독한 언론사</div>
			</div>
			<div className="flex items-center">
				<i className="fas fa-th-large cursor-pointer text-xl text-font-color"></i>
				<i className="fa-solid fa-list cursor-pointer text-xl mx-4 text-font-color"></i>
			</div>
		</nav>
	);
}

export default Tab;
