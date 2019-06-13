from flask import Flask, render_template, url_for, request

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.externals import joblib
import io

import numpy as np # Import Numpy for data statistical analysis 
import matplotlib.pyplot as plt # Import matplotlib for data visualisation
import pandas as pd

import seaborn as sns
from sklearn.model_selection import KFold
import pickle


# Machine Learning model
model = pickle.load( open('model.pkl','rb'))


app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict', methods=["GET", "POST"])
def predict():
    # Features and Labels
    # df['label'] = df['class'].map({'ham': 0, 'spam': 1})
    # X = df['message']
    # y = df['label']

    print(model.predict([[11.8,3,4,4,4,4,4,4,4,4,4]]))

    return render_template("predict.html")