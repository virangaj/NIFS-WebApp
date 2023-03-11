/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'body-content-bg': 'var(--body-content-bg)',
			},
		},
	},
	plugins: [require('daisyui')],
};
