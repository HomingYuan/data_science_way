#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: 10kindmethod_machine_learning.py
@time: 2017/5/23 22:00
"""
# 10种机器学习算法
'''
http://blog.jobbole.com/92021/

'''
# 1.线性回归
'''
# Import Library
# Import other necessary libraries like pandas, numpy...
from sklearn import linear_model

# Load Train and Test datasets
# Identify feature and response variable(s) and values must be numeric and numpy arrays
x_train = input_variables_values_training_datasets
y_train = target_variables_values_training_datasets
x_test = input_variables_values_test_datasets

# Create linear regression object
linear = linear_model.LinearRegression()

# Train the model using the training sets and check score
linear.fit(x_train, y_train)
linear.score(x_train, y_train)

# Equation coefficient and Intercept
print('Coefficient: n', linear.coef_)
print('Intercept: n', linear.intercept_)

# Predict Output
predicted = linear.predict(x_test)
'''
# 2逻辑回归
'''
#Import Library
from sklearn.linear_model import LogisticRegression
#Assumed you have, X (predictor) and Y (target) for training data set and x_test(predictor) of test_dataset
# Create logistic regression object
model = LogisticRegression()
 
# Train the model using the training sets and check score
model.fit(X, y)
model.score(X, y)
 
#Equation coefficient and Intercept
print('Coefficient: n', model.coef_)
print('Intercept: n', model.intercept_)
 
#Predict Output
predicted= model.predict(x_test)
'''

# 3决策树
'''
#Import Library
#Import other necessary libraries like pandas, numpy...
from sklearn import tree
 
#Assumed you have, X (predictor) and Y (target) for training data set and x_test(predictor) of test_dataset
# Create tree object 
model = tree.DecisionTreeClassifier(criterion='gini') # for classification, here you can change the algorithm as gini or entropy (information gain) by default it is gini  
 
# model = tree.DecisionTreeRegressor() for regression
# Train the model using the training sets and check score
model.fit(X, y)
model.score(X, y)
 
#Predict Output
predicted= model.predict(x_test)

'''
# 4.支持向量机

'''
#Import Library
from sklearn import svm
 
#Assumed you have, X (predic
tor) and Y (target) for training data set and x_test(predictor) of test_dataset
# Create SVM classification object 
model = svm.svc() # there is various option associated with it, this is simple for classification. You can refer link, for mo# re detail.
# Train the model using the training sets and check score
model.fit(X, y)
model.score(X, y)
 
#Predict Output
predicted= model.predict(x_test)
'''
# 5.朴素贝叶斯
'''
#Import Library
from sklearn.naive_bayes import GaussianNB
 
#Assumed you have, X (predictor) and Y (target) for training data set and x_test(predictor) of test_dataset
# Create SVM classification object model = GaussianNB() # there is other distribution for multinomial classes like Bernoulli Naive Bayes, Refer link
# Train the model using the training sets and check score
model.fit(X, y)
 
#Predict Output
predicted= model.predict(x_test)
'''

# 6、KNN（K – 最近邻算法）
'''
#Import Library
from sklearn.neighbors import KNeighborsClassifier
 
#Assumed you have, X (predictor) and Y (target) for training data set and x_test(predictor) of test_dataset
# Create KNeighbors classifier object model 
KNeighborsClassifier(n_neighbors=6) # default value for n_neighbors is 5
 
# Train the model using the training sets and check score
model.fit(X, y)
 
#Predict Output
predicted= model.predict(x_test)
'''

# 7、K 均值算法
'''
#Import Library
from sklearn.cluster import KMeans
 
#Assumed you have, X (attributes) for training data set and x_test(attributes) of test_dataset
# Create KNeighbors classifier object model 
k_means = KMeans(n_clusters=3, random_state=0)
 
# Train the model using the training sets and check score
model.fit(X)
 
#Predict Output
predicted= model.predict(x_test)
'''

# 8、随机森林
'''
#Import Library
from sklearn.ensemble import RandomForestClassifier
 
#Assumed you have, X (predictor) and Y (target) for training data set and x_test(predictor) of test_dataset
# Create Random Forest object
model= RandomForestClassifier()
 
# Train the model using the training sets and check score
model.fit(X, y)
 
#Predict Output
predicted= model.predict(x_test)
'''

# 9、降维算法
'''
#Import Library
from sklearn import decomposition
 
#Assumed you have training and test data set as train and test
# Create PCA obeject pca= decomposition.PCA(n_components=k) #default value of k =min(n_sample, n_features)
# For Factor analysis
#fa= decomposition.FactorAnalysis()
# Reduced the dimension of training dataset using PCA
train_reduced = pca.fit_transform(train)
 
#Reduced the dimension of test dataset
test_reduced = pca.transform(test)
 
'''
# 10、Gradient Boosting 和 AdaBoost 算法
'''
#Import Library
from sklearn.ensemble import GradientBoostingClassifier
 
#Assumed you have, X (predictor) and Y (target) for training data set and x_test(predictor) of test_dataset
# Create Gradient Boosting Classifier object
model= GradientBoostingClassifier(n_estimators=100, learning_rate=1.0, max_depth=1, random_state=0)
 
# Train the model using the training sets and check score
model.fit(X, y)
 
#Predict Output
predicted= model.predict(x_test)
'''