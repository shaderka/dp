import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import uniqid from 'uniqid'

export async function POST(req) {
	const data = await req.formData()
	if (data.get('file')) {
		const file = data.get('file')

		const s3Client = new S3Client({
			region: 'ru-msk',
			credentials: {
				accessKeyId: process.env.VK_ACCESS_KEY,
				secretAccessKey: process.env.VK_SECRET_KEY,
			},
			endpoint: 'https://hb.ru-msk.vkcs.cloud',
		})

		const ext = file.name.split('.').slice(-1)[0]
		const newFileName = uniqid() + '.' + ext

		const chunks = []
		for await (const chunk of file.stream()) {
			chunks.push(chunk)
		}
		const buffer = Buffer.concat(chunks)

		s3Client.send(
			new PutObjectCommand({
				Bucket: 'dodo_bucket',
				Key: newFileName,
				ACL: 'public-read',
				ContentType: file.type,
				Body: buffer,
			})
		)

		return Response.json(
			'https://dodo_bucket.hb.ru-msk.vkcs.cloud/' + newFileName
		)
	}

	return Response.json(true)
}
