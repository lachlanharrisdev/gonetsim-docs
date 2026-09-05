// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeBlack from 'starlight-theme-black'
import starlightLlmsTxt from 'starlight-llms-txt'

// https://astro.build/config
export default defineConfig({
	site: 'https://gonetsim.lachlanharris.au',
	base: '/',
	integrations: [
		starlight({
			title: 'GoNetSim',
			favicon: '/favicon.png',
			description: 'A programmable network simulator for malware analysis; simulate any network protocol with small, sandboxed, shareable Lua handlers.',
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
					label: 'Scripting',
					items: [
						{ label: 'Getting Started', slug: 'scripting/getting-started' },
						{ label: 'Lua API', slug: 'scripting/api' },
						{ label: 'Examples', slug: 'scripting/examples' },
					],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
			editLink: {
				baseUrl: 'https://github.com/lachlanharrisdev/gonetsim-docs/edit/main',
			},
			customCss: [
				'./src/styles/custom.css',
			],
			/*
			head: [
				{
					tag: 'script',
					attrs: {
						src: 'https://cloud.umami.is/script.js',
						defer: true,
						'data-website-id': '786e8085-a637-4f5f-bd8e-e452871c2281'
					}
				}
			],*/


            plugins: [
                starlightLlmsTxt({
                    optionalLinks: [
                        {
                            label: 'Repository',
                            description: 'link to the source repository on GitHUb',
                            url: 'https://github.com/lachlanharrisdev/gonetsim'
                        },
                        {
                            label: 'Readme',
                            description: 'link to the raw readme from the source repository on GitHub',
                            url: 'https://raw.githubusercontent.com/lachlanharrisdev/gonetsim/main/README.md'
                        }
                    ],
                    customSets: [
                        {
                            label: 'Guides',
                            description: 'useful references for setup, installation and basic syntax',
                            paths: ['guides/**']
                        },
                        {
                            label: 'Lua',
                            description: 'all documentation regarding creating custom scripts and listeners, including examples',
                            paths: ['scripting/**']
                        },
                        {
                            label: 'Reference',
                            description: 'detailed documentation for built-in services (HTTP/S, DNS), how listeners run and extra tools (such as TLS)',
                            paths: ['scripting/**']
                        },
                    ],
                }),
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
				})
			],
		}),
	],
});
