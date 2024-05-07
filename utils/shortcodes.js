const Image = require("@11ty/eleventy-img")
const cheerio = require("cheerio")

module.exports = {
	icon: function (name) {
		return `<svg class="icon icon--${name}" role="img" aria-hidden="true">
                    <use xlink:href="#svg-${name}"></use>
                </svg>`
	},
	image: async function (
		src,
		alt,
		sizes = "(max-width: 480px) 100vw, (max-width: 768px) 90vw, 1280px",
		width,
		height
	) {
		let path
		if (src.startsWith("/writing/")) {
			path = `src${src}`
		} else if (src.startsWith("/writings/")) {
			path = `src${src.replace("/writings/", "/writing/")}`
		} else {
			path = `src/assets/images/${src}`
		}
		console.log(`Generating image(s) from: ${path}`)

		try {
			let metadata = await Image(path, {
				widths: [480, 768, "auto"],
				formats: ["webp"],
				urlPath: "/assets/images/",
				outputDir: "./dist/assets/images/"
			})

			let imageAttributes = {
				alt,
				sizes,
				loading: "lazy",
				decoding: "async"
			}

			let imageHTML = Image.generateHTML(metadata, imageAttributes)

			if (width && height) {
				imageHTML = imageHTML.replace(
					"<img",
					`<img width="${width}" height="${height}"`
				)
			}

			return imageHTML
		} catch (error) {
			return ""
		}
	},

	openGraphScreenshotURL: function () {
		const encodedURL = encodeURIComponent(
			`https://afnizarnur.com/social-card${this.page.url}`
		)
		const cacheKey = `_${new Date().valueOf()}`
		return `https://v1.screenshot.11ty.dev/${encodedURL}/opengraph/${cacheKey}/_wait:2/`
	}
}
