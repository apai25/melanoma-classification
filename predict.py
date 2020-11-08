"""
Predicts whether a single melanona sample is benign or malignant 
"""
from tensorflow.keras.models import load_model
import numpy as np 
from tensorflow.keras.preprocessing.image import load_img, img_to_array

image_path = 'data/test/malignant/532.jpg'

def predict(image_path):
    cnn = load_model('model')
    image = load_img(image_path, target_size=(128, 128))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    prediction = int(cnn.predict(image)[0][0])
    return prediction

if __name__ == '__main__':
    prediction = predict(image_path)
    if prediction == 1:
        print('The tumor is malignant (1.0)')
    elif prediction == 0:
        print('The tumor is benign (0.0)')
