import webpack from 'webpack'

export default {
  head: {
    titleTemplate: '%s - BCSChain Explorer',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no'},
	  {name: 'google-site-verification', content: '..GOOGLE_VERIFICATION_KEY..'},
	  {name: 'yandex-verification', content: '..YANDEX_VERIFICATION_KEY..'},
	{name: 'msapplication-TileColor', content: "#27262e"},
	{name: "theme-color", content: "#27262e"}
    ],
	link: [
	{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
	{rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png"},
	{rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"},
	{rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"},
	{rel: "manifest", href: "/site.webmanifest"},
	{rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#bb9f89"},
	]
  },
  css: [
    'styles/styles.css',
    '@fortawesome/fontawesome-free/css/all.css',
    '@/styles/common.less',
    '@/styles/card.less',
    '@/styles/info-table.less',
    '@/icons/style.css'
  ],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => ['script', 'style', 'font'].includes(type)
    }
  },
  build: {
    extend(config, {isServer}) {
      config.module.rules.push({
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader'
      })
      config.plugins.push(new webpack.DefinePlugin({
        'process.env.bcsinfoAPIBase': JSON.stringify(process.env.BCSINFO_API_BASE
          || process.env[isServer ? 'BCSINFO_API_BASE_SERVER' : 'BCSINFO_API_BASE_CLIENT']
          || 'http://localhost:7001/'),
        'process.env.bcsinfoWSBase': JSON.stringify(process.env.BCSINFO_WS_BASE
          || process.env.BCSINFO_API_BASE_WS
          || '//localhost:7001/'),
        'process.env.network': JSON.stringify(process.env.BCS_NETWORK || 'mainnet')
      }))
    },
	publicPath: '/dist',
    extractCSS: true,
    postcss: {
      features: {
        customProperties: false
      }
    }
  },
  serverMiddleware: ['~/middleware/ip.js'],
  plugins: [
    '~/plugins/components.js',
    '~/plugins/i18n.js',
    '~/plugins/bcs-utils.js',
    {src: '~/plugins/websocket.js', ssr: false}
  ],
  modules: [
    [
      '@nuxtjs/yandex-metrika',
      {
        id: 'XXXXXXXX',
        webvisor: true,
        clickmap:true,
        // useCDN:false,
        trackLinks:true,
        accurateTrackBounce:true,
      }
    ],
	[
		'@nuxtjs/google-analytics', 
		{
			id: 'XX-XXXXXXXXX-X'
		}
	]
  ]
}
