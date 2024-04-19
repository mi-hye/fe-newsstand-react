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
				"news-gray": "rgba(148,148,148, 0.8)",
				"news-blue": "#4361cf",
			},
			animation: {
				wiggle: "wiggle 1s ease-in-out infinite",
				rolling: "rolling 10s cubic-bezier(0.22, 0.7, 1, 1.01) forwards infinite",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(-10deg)" },
					"50%": { transform: "rotate(10deg)" },
				},
				rolling: {
					"0%": {
						transform: "translateY(250%)",
					},
					"10%,40%": {
						transform: "translateY(0)",
					},
					"50%,100%": {
						transform: "translateY(-240%)",
					},
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
