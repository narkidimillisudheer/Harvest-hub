from flask import Flask, request, jsonify, render_template
import os
from PIL import Image
import numpy as np
import json
from flask_cors import CORS
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app) 
model = load_model('./plant_disease_prediction_model.h5')
class_indices = json.load(open('./class_indices.json'))

def load_and_preprocess_image(image_path, target_size=(224, 224)):
    img = Image.open(image_path)
    img = img.resize(target_size)
    img_array = np.array(img)
    img_array = img_array.astype('float32') / 255.
    return img_array

def predict_image_class(image_path):
    preprocessed_img = load_and_preprocess_image(image_path)
    preprocessed_img = np.expand_dims(preprocessed_img[:, :, :3], axis=0)
    predictions = model.predict(preprocessed_img)
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    predicted_class_name = class_indices[str(predicted_class_index)]
    return predicted_class_name

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        file = request.files['file']
        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)
        predicted_class_name = predict_image_class(file_path)
        result = {'class_name': predicted_class_name, 'image_path': file_path}
        return jsonify(result)  # Return the result as JSON

if __name__ == '__main__':
    app.run(debug=True)
