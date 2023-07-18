const { response } = require("express");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
	apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const topic = "Tom and Jerry"
const pagenum = "3"

const pdf_prompt = "give a page-by-page specification containing text and generate-image-prompt-for-openai-api for a child-friendly pdf book with " + pagenum + " pages about "+ topic + " with one image on every page, 2-sentence-text on every page, formatted as {pages: [{text:'',prompt:''}etc]}, no other text in front, just json with no new line, easily parsable"
    
async function f() {

	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: pdf_prompt }],
	});
	
	var response = completion.data.choices[0].message.content
	response = response.replace('\n','').trim()
	console.log(response)
	jss = JSON.parse(response)
	console.log(jss['pages'][0]);
	
}
f();
/*
var response = '{ "pages": [{"text": "Once upon a time, in a faraway land, there lived a young girl named Cinderella.","prompt": ""}]}'
jss = JSON.parse(response)
console.log(jss);
*/