interface Props {
	margin?: string;
	newsHeadline: Headline[];
}

interface Style {
	[key: string]: string;
}

const style: Style = {
	common:
		"cursor-pointer hover:underline font-light text-xs absolute w-full overflow-hidden text-ellipsis dark:text-white/90",
	0: "bottom-10",
	1: "top-0.5",
	2: "top-10",
};

function RollingNews({ margin = "", newsHeadline }: Props) {
	return (
		<div
			className={`my-1 p-2 w-1/2 ${margin} border-2 border-customGray bg-customGray flex items-center`}
		>
			<span className="mx-2 text-sm font-bold dark:text-white">연합뉴스</span>
			<div className="mx-2 flex flex-col relative w-4/5 h-5 overflow-hidden whitespace-nowrap">
				{newsHeadline.map((headline, i) => (
					<a key={i} href={headline.href} className={`${style.common} ${style?.[i]}`}>
						{headline.title}
					</a>
				))}
			</div>
		</div>
	);
}

export default RollingNews;
