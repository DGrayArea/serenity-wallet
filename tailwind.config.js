module.exports = {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			scroll: {
				'scrollbar-width': 'none'
			},
			width: {
				'fill': 'fill-available',
				'webkit-fill': '-webkit-fill-available',
				'moz-fill': '-moz-available',
			},
			height: {
				'fill': 'fill-available',
				'webkit-fill': '-webkit-fill-available',
				'moz-fill': '-moz-available',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				glassCard: {
					secondary: "#232D488F"
				},
				neutral: {
					400: "#5F4D79",
					500: "#362854",
					700: "#3E5DB0",
					800: "#171121"
				},
				main: {
					100: "#D4CAFF",
					200: "#ABA8FF",
					300: "#8884FF"
				},
				select:{
					"bg": "#573CFA3D"
				},
				system:{
					danger: "#FF4231",
					warning: "#FFDF40",
					success: "#93FF50"
				}
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function ({ addUtilities }) {
			addUtilities({
				'.scrollbar-none': {
					'scrollbar-width': 'none', // For Firefox
					'&::-webkit-scrollbar': {
						display: 'none', // For Webkit-based browsers (Chrome, Safari, Edge)
					},
				},
			});
		},],
}