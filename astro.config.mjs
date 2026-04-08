// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeBlack from 'starlight-theme-black'

// https://astro.build/config
export default defineConfig({
	site: 'https://www.gonetsim.lachlanharris.dev',
	integrations: [
		starlight({
			title: 'GoNetSim',
			favicon: '/favicon.png',
			description: 'An unofficial, spiritual successor to INetSim, a suite of tools for simulating common internet services for malware analysis and testing.',
			logo: {
				src: './src/assets/logo_transparent.png',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/lachlanharrisdev/gonetsim' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Installation', slug: 'guides/installation' },
						{ label: 'Usage', slug: 'guides/usage' },
						{ label: 'Configuration', slug: 'guides/configuration' },
						{ label: 'Docker', slug: 'guides/docker' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			editLink: {
				baseUrl: 'https://github.com/lachlanharrisdev/gonetsim-docs/edit/main',
			},
			customCss: [
				'./src/styles/custom.css',
			],


			plugins: [
				starlightThemeBlack({
				navLinks: [
					{
						label: 'Docs',
						link: '/guides/installation/',
					},
					{
						label: 'About',
						link: '/about/',
					},
					{
						label: 'Downloads',
						link: 'https://github.com/lachlanharrisdev/gonetsim/releases',
					},
					{
						label: 'Contact',
						link: '/contact/',
					}
				],
				footerText: //optional
					'Copyright (c) 2026 Lachlan Harris. All Rights Reserved.'
				})
			],
		}),
	],
});
