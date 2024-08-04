from flask import Flask, request
from flask_cors import CORS
import os
from dotenv import load_dotenv
load_dotenv()

from llama_parse import LlamaParse
from llama_index.core import SimpleDirectoryReader
from llama_index.core import VectorStoreIndex

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


api_key = os.getenv("LLAMA_CLOUD_API_KEY")

# Example usage of the API key
print("Your API key is:", api_key)

def parse_doc(file, queries, filetype=".pdf", result_type="markdown"):
    parser = LlamaParse(
        result_type=result_type
    )
    documents = SimpleDirectoryReader(input_files=[file], file_extractor={filetype: parser}).load_data()
    index = VectorStoreIndex.from_documents(documents)
    query_engine = index.as_query_engine()
    print("Llama parse done")
    responses = []
    for q in queries:
        responses.append(ask_doc(q, query_engine))
    print("responses: ", responses)
    return responses, query_engine

def ask_doc(query, query_engine):
    response = query_engine.query(query)
    return response


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