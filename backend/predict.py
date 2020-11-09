"""
Predicts whether a single melanona sample is benign or malignant 
"""

from tensorflow.keras.models import load_model
import numpy as np 
from tensorflow.keras.preprocessing.image import load_img, img_to_array

import firebase
import pyrebase 
from google.cloud import storage
from google.cloud.storage import client

import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
import glob 

config  = {
  'apiKey': 'AIzaSyDW2-_l6ALgHftWD6w3pVfTgGRAxUXb6W4',
  'authDomain': 'melclas.firebaseapp.com',
  'databaseURL': 'https://melclas.firebaseio.com',
  'projectId': 'melclas',
  'storageBucket': 'melclas.appspot.com',
  'messagingSenderId': '793958947873',
  'appId': '1:793958947873:web:7d6142c037de883ea7d760',
  'measurementId': 'G-RGFLCF7ZK3'
}

firebase = pyrebase.initialize_app(config)
storage = firebase.storage()

firebase_path = 'input/input'
storage.child(firebase_path).download('backend/input/input.png')

image_path = 'backend/input/input.png'
def predict(image_path):
    cnn = load_model('backend/model')
    image = load_img(image_path, target_size=(128, 128))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    prediction = int(cnn.predict(image)[0][0])
    return prediction

prediction = predict(image_path)
if prediction == 1:
    print('benign')
    storage.child('output/output').put('backend/output/benign.png')
elif prediction == 0:
    print('malignant')
    storage.child('output/output').put('backend/output/malignant.png')
