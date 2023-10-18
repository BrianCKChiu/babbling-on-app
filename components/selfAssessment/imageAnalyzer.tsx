// Function returns a tuple : (success, result)
async function imageAnalyzer(imageURL: string, currentLetter: string): Promise<[boolean, boolean]> {
  try {
    if (!imageURL) {
      return [false, false];
    }

    const response = await fetch('http://localhost:8080/ai/analyze-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image_url: imageURL }),
    });

    if (!response.ok) {
      throw new Error(`There was an error: ${response.status}`);
    }

    const responseData = await response.json();
    
    console.log(`Recognised Alphabet: ${responseData.prediction}`)
    return [true, responseData.prediction === currentLetter];
  } catch (error: any) {
    console.error('Error:', error.message);
    return [false, false];
  }
}

export default imageAnalyzer;
