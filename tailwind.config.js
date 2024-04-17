/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "selector",
	theme: {
		extend: {
			width: {
				1000: "1000px",
			},
			height: {
				600: "600px",
			},
			colors: {
				"news-blue": "#4361cf",
			},
			animation: {
				wiggle: "wiggle 1s ease-in-out infinite",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(-10deg)" },
					"50%": { transform: "rotate(10deg)" },
				},
			},
			borderColor: {
				customGray: "rgba(177,177,177, 0.3)",
			},
			backgroundColor: {
				customGray: " rgba(177,177,177, 0.2)",
			},
		},
	},
	plugins: [],
};
