from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
from OCR import Reader, GPT_3, read_img  # Import your functions and classes from OCR.py

app = Flask(__name__)

# Assuming you want to upload the image as multipart/form-data
@app.route('/process', methods=['POST'])
def process():
    if 'image' not in request.files:
        return jsonify({"error": "No image part in the request"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No image selected for uploading"}), 400

    if file:
        # You may want to secure the filename and save the file before processing
        filename = secure_filename(file.filename)
        file_path = os.path.join('/tmp', filename)
        file.save(file_path)

        # Create instances of your OCR and GPT-3 classes
        reader = Reader(is_cuda=False)  # Set to True if you're on a CUDA-enabled GPU
        gpt_3 = GPT_3(os.getenv("AZURE_OPENAI_KEY"))

        # Process the image and summarize the text
        img = read_img(file_path)
        text, extracted_image = reader(img)
        combined_text = ' '.join(text)
        summarization_result = gpt_3.summarize(combined_text)

        # Return the result as a JSON response
        return jsonify({
            "extracted_text": combined_text,
            "summarized_text": summarization_result
        })

    else:
        return jsonify({"error": "Error processing the image"}), 500

if __name__ == "__main__":
    app.run(debug=True)
