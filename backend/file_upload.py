from flask import Flask, request
from flask_cors import CORS
import os
import PyPDF2

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def home():
    return 'Hello, Flask!'

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    if file:
        content = file.read().decode('utf-8')  # Read and decode file content
        print("File contents:", content)  # Print the contents to the console
        return 'File received and contents printed on server console', 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)