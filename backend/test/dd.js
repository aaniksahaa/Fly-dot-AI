
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
	apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function f() {

	const response = await openai.createImage({
		prompt: "beautiful colorful children-friendly very light colored appealing pencil graffitti of tiny stars, galaxies, planets, men, trees, rivers, birds, flowers, fishes etc for making background picture for children's book",
		n: 3,
		size: "1024x1024",
	});
	image_url = response.data.data;
	console.log(image_url);
}
f();




