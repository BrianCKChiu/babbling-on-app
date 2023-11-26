import imageAnalyzer from "@/selfAssessment/imageAnalyzer";

global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('imageAnalyzer', () => {
  it('returns true for a valid image URL and correct letter prediction', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        predictions: [{ class: 'A' }] 
      }),
    });

   
    const [status, isCorrectLetter] = await imageAnalyzer('<Image_URL>', 'A');

    expect(status).toBe(true);
    expect(isCorrectLetter).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/image/detect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image_url: '<Image_URL>' }),
    });
  });

});
