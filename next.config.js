const { XmlAttributeComponent } = require('docx')

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'dawid-food-ordering.s3.amazonaws.com',
			},
			{
				protocol: 'https',
				hostname: 'dodo_bucket.hb.ru-msk.vkcs.cloud',
			},
		],
	},
}

module.exports = nextConfig
