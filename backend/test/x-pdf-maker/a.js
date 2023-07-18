const PDFDocument = require('pdfkit');
const axios = require('axios')
const fs = require('fs');

const { Configuration, OpenAIApi } = require("openai");

const get_prompt = (topic, pagenum) => {
    const pdf_prompt = "give a page-by-page specification containing text and generate-image-prompt-for-openai-api for a child-friendly pdf book with " + pagenum + " pages about "+ topic + " with one image on every page, interesting coherent 2-sentenced-text related to the topic on every page, formatted as {pages: [{text:'',prompt:''}etc]}, no other text in front, just json with no new line, easily parsable"
    return pdf_prompt
} 

const configuration = new Configuration({
  apiKey: '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'
	//apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const getPDFDetails = async (prompt) => {
  console.log(prompt)
	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: prompt }],
	});
	var response = completion.data.choices[0].message.content
	response = response.replace('\n','').trim()
	//console.log(response)
	json = JSON.parse(response)
  if(json.hasOwnProperty('pages')){json = json['pages']}
  console.log(json)
  return json
}

const getImageUrl = async (img_prompt) => {
    console.log('Generating Image URL',img_prompt)
    const response = await openai.createImage({
        prompt: img_prompt,
        n: 1,
        size: "256x256"
	  });
    url = response.data.data[0]['url'];
    console.log(url);
    return url
}

async function fetchImage(src) {
  const image = await axios
      .get(src, {
          responseType: 'arraybuffer'
      })
  return image.data;
}

async function generatePDF(topic, pagenum) {
    const pdf_prompt = get_prompt(topic,pagenum)
    //const pdf_prompt = "give a page-by-page specification containing text and generate-image-prompt-for-openai-api for a child-friendly pdf book with " + pagenum + " pages about "+ topic + " with one image on every page, 2-sentence-text on every page, formatted as {pages: [{text:'',prompt:''}etc]}, no other text in front, just json with no new line, easily parsable"
    //console.log(pdf_prompt)
    const json = await getPDFDetails(pdf_prompt)
    const doc = new PDFDocument();

    const len = json.length

    topic = topic.trim()

    filename = '/tmp/' + topic.replace(' ','-').trim() + '.pdf'

    console.log(filename)

    // Create a writable stream to output the PDF to a file
    const writeStream = fs.createWriteStream(filename);
    doc.pipe(writeStream);

    // Set enchanting font and font size
    fontname = 'penguin.ttf'

    doc.font(fontname)
      .fontSize(35);

    for(let i=0;i<len;i++)
    {
        if(i>0) {doc.addPage()}
        console.log(i+1)
        // Add the text
        txt = json[i]['text']
        arr = txt.split(':')
        if(arr.length > 1)
        {
          txt = arr[1]
        }
        console.log(txt)
        doc.text(txt, {
          align: 'center',
          width: 500,
          height: 250
        });
        
        url = await getImageUrl(json[i]['prompt'])
        console.log(url)
        //url = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-yGNDU0MyRiwWa6CvwNPe7oHC/user-kzzUWbwZBvkG2tpTcP4SAysR/img-CjhYQ4N4Jxe3KijEPvdu0yrs.png?st=2023-07-13T13%3A56%3A20Z&se=2023-07-13T15%3A56%3A20Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-07-12T20%3A27%3A26Z&ske=2023-07-13T20%3A27%3A26Z&sks=b&skv=2021-08-06&sig=v04hU9HjjeiU5aqS55zAYZhdVhWAVgCxJc5AE0F9CjU%3D'
        
        // Add the image
        const image = await fetchImage(url);
        //const image = 'cc.png'; // Replace with the path to the image file
        doc.image(image, {
          fit: [450, 450], // Adjust the dimensions as needed
          align: 'center',
          valign: 'center'
        });
    }
    // Finalize the PDF and end the writable stream
    doc.end();
    writeStream.on('finish', () => {
      console.log('PDF generated successfully.');
    });

}

const topic = "Tom and Jerry"
const pagenum = "1"
const pdf_prompt = get_prompt(topic,pagenum)

// Invoke the function to generate the PDF
generatePDF(topic,pagenum).catch((error) => console.error(error));

//getPDFDetails(pdf_prompt)
