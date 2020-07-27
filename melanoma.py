import numpy as np 
import pandas as pd 

# Importing train and test datasets
train = pd.read_csv('train.csv')
test = pd.read_csv('test.csv')

# Adding .jpg file extension to 'image_name' column 
train['image_name'] = train['image_name'] + '.jpg'
test['image_name'] = test['image_name'] + '.jpg'

# Encoding target column
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer

# Creating train and test datasets of augmented .jpg images
from keras.preprocessing.image import ImageDataGenerator
train_datagen = ImageDataGenerator(rescale=1./255, shear_range=.2, zoom_range=.2, vertical_flip=True, horizontal_flip=True)
train_images = train_datagen.flow_from_dataframe(dataframe=train, directory='data/train', 
    x_col='image_name', y_col='benign_malignant', target_size=(64, 64), class_mode='binary', batch_size=32)

test_datagen = ImageDataGenerator(rescale=1./255)
test_images = train_datagen.flow_from_dataframe(dataframe=test, directory='data/test', 
    x_col='image_name', class_mode=None, target_size=(64, 64), batch_size=1)

# Initializing CNN
from keras.models import Sequential
from keras.layers import Dense, Conv2D, MaxPool2D, Flatten
cnn = Sequential()

# Adding 4 convolution and 3 pooling layers 
cnn.add(Conv2D(filters=32, kernel_size=3, activation='relu', input_shape=(64, 64, 3)))
cnn.add((MaxPool2D(pool_size=2)))
cnn.add(Conv2D(filters=64, kernel_size=3, activation='relu'))
cnn.add((MaxPool2D(pool_size=2)))
cnn.add(Conv2D(filters=64, kernel_size=3, activation='relu'))
cnn.add(Conv2D(filters=128, kernel_size=3, activation='relu'))
cnn.add(MaxPool2D(pool_size=2))
cnn.add(Flatten())

# Adding dense fully connected layers
cnn.add(Dense(units=64, activation='relu'))
cnn.add(Dense(units=128, activation='relu'))
cnn.add(Dense(units=128, activation='relu'))
cnn.add(Dense(units=1, activation='sigmoid'))

# Compiling and fitting CNN
cnn.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
cnn.fit_generator(train_images, epochs=100)

predictions = cnn.predict_generator(test_images)

predictions = np.array(predictions)
np.savetxt('predictions.csv', predictions, delimiter=',', fmt='%s')
