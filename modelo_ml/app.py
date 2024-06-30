from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np

app = Flask(__name__)
model = tf.keras.models.load_model('model/modelo_becas.h5')

@app.route('/predecir', methods=['POST'])
def predict():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)  # Adjust the reshape based on your input shape
    prediction = model.predict(features)
    return jsonify({'eligibility': float(prediction[0][0])})

if __name__ == '__main__':
    app.run(debug=True)
