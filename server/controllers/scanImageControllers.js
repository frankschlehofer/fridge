import axios from 'axios';

// IMPORTANT: Store your API key securely, preferably in environment variables
const GOOGLE_VISION_API_KEY = process.env.GOOGLE_CLOUD_VISION_API_KEY;
const VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`;

export const scanImage = async (req, res, next) => {
    try {
        // Need base64 encoded image
        // https://cloud.google.com/vision/docs/object-localizer#vision_localize_objects-drest

        // 1. Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded.' });
        }
    
        // 2. Access the image buffer from multer
        const imageBuffer = req.file.buffer;
    
        // 3. Base64 encode the image
        const base64Image = imageBuffer.toString('base64');

        console.log('base64L ', base64Image);

        // 4. Construct the Vision API Request
        // We'll request object localization and text detection
        const requestPayload = {
            requests: [
            {
                image: {
                content: base64Image,
                },
                features: [
                {
                    type: 'LABEL_DETECTION',
                    maxResults: 30,
                },
                ],
            },
            ],
        };

        // 5. Call the Vision API
        // Use axios here for its simplicity, rather than fetch()
        console.log('Sending request to Vision API...');
        const visionApiResponse = await axios.post(VISION_API_URL, requestPayload, {
        headers: {
            'Content-Type': 'application/json',
        },
        });

        // 6. Process the Response
        // The response structure can be complex.
        // visionApiResponse.data.responses[0] will contain the results for our single image request.
        const visionData = visionApiResponse.data.responses[0];
        let parsedItems = [];

        const generalLabelsToExclude = [
            'Food', 'Fruit', 'Produce', 'Ingredient', 'Plant',
            'Still life photography', 'Natural foods', 'Vegan nutrition',
            'Accessory fruit', 'Whole food', 'Local food', 'Staple food',
            'Superfood', 'Cuisine', 'Dish', 'Tableware', 'Serveware',
            'Kitchen utensil', 'Countertop', 'Photography', 'Wood',
            'Citrus', 'Food group', 'Red', 
        ].map(label => label.toLowerCase());

        const minConfidence = 0.75;

        // Extract localized objects
        if (visionData.labelAnnotations) {
            visionData.labelAnnotations.forEach(label => {
                const labelNameLower = label.description.toLowerCase();
                if (label.score >= minConfidence && !generalLabelsToExclude.includes(labelNameLower)) {
                    parsedItems.push({
                        name: label.description,
                        type: 'label',
                        confidence: label.score,
                    });
                }
            });
        }

        console.log('Successfully parsed image. Items found:', parsedItems.length);

        // 7. Send Data Back to Client
        // Your client expects an object with an 'items' array
        res.status(200).json({ items: parsedItems });
    } catch (error) {
        console.error('Error in scanImage controller:', error.response ? error.response.data : error.message);
        // Send a more specific error message if available from Vision API
        if (error.response && error.response.data && error.response.data.error) {
        return res.status(error.response.status || 500).json({
            message: `Vision API Error: ${error.response.data.error.message}`,
            details: error.response.data.error.details
        });
        }
        res.status(500).json({ message: 'Failed to process image on the server.' });
    }
};