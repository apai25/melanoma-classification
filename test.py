import tensorflow as tf

# detect and init the TPU
tpu = tf.distribute.cluster_resolver.TPUClusterResolver()
tf.config.experimental_connect_to_cluster(tpu)
tf.tpu.experimental.initialize_tpu_system(tpu)

# instantiate a distribution strategy
tpu_strategy = tf.distribute.experimental.TPUStrategy(tpu)

import numpy as np 
import pandas as pd 

# Importing train and test datasets
train = pd.read_csv('../input/siim-isic-melanoma-classification/train.csv')
test = pd.read_csv('../input/siim-isic-melanoma-classification/test.csv')

# Adding .jpg file extension to 'image_name' column 
train['image_name'] = train['image_name'] + '.jpg'
test['image_name'] = test['image_name'] + '.jpg'

# Encoding target column
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer

# Creating train and test datasets of augmented .jpg images
from keras.preprocessing.image import ImageDataGenerator
train_datagen = ImageDataGenerator(rescale=1./255, shear_range=.2, zoom_range=.2, vertical_flip=True, horizontal_flip=True)
train_images = train_datagen.flow_from_dataframe(dataframe=train, directory='../input/siim-isic-melanoma-classification/jpeg/train', 
    x_col='image_name', y_col='benign_malignant', target_size=(64, 64), class_mode='binary', batch_size=32)

images, labels = next(train_datagen.flow_from_dataframe(dataframe=train, directory='../input/siim-isic-melanoma-classification/jpeg/train', 
    x_col='image_name', y_col='benign_malignant', target_size=(64, 64), class_mode='binary', batch_size=32))

print(images.shape, labels.shape)
print(images.dtype, labels.dtype)

train_pipeline = tf.data.Dataset.from_generator(
    lambda: train_images,
    output_types=(tf.float32, tf.float32), 
    output_shapes=([32, 64, 64, 3], [32,])
)

test_datagen = ImageDataGenerator(rescale=1./255)
test_images = train_datagen.flow_from_dataframe(dataframe=test, directory='../input/siim-isic-melanoma-classification/jpeg/test', 
    x_col='image_name', y_col='benign_malignant', target_size=(64, 64), class_mode=None, batch_size=1)

test_pipeline = tf.data.Dataset.from_generator(
    lambda: test_images, 
    output_types=(tf.float32, tf.float32), 
    output_shapes=([32, 64, 64, 3], [32,])
)

with tpu_strategy.scope():
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
cnn.fit(x=train_pipeline, epochs=1)

predictions = cnn.predict(test_pipeline)

predictions = np.array(predictions)
np.savetxt('predictions.csv', predictions, delimiter=',', fmt='%d')