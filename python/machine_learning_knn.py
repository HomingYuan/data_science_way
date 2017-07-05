# -*- coding: utf-8 -*-
"""
Created on Wed Jul  5 14:21:29 2017

@author: user
"""
from numpy import *
import operator
import matplotlib
import matplotlib.pyplot as plt

def createDataSet():
    group = array([[1.0,1.1],[1.0,1.0],[0,0],[0,0.1]])
    labels = ['A','A','B','B']
    return group, labels

group,labels = createDataSet()

# k-Nearest Neighbors algorithm

def classify0(inX, dataSet, labels, k):
    dataSetSize = dataSet.shape[0]
    diffMat = tile(inX, (dataSetSize, 1)) - dataSet  # create new array,tile expanding array
    sqDiffMat = diffMat**2
    sqDistances = sqDiffMat.sum(axis=1) # min(0)对行汇总,min(1)对列汇总
    distances = sqDistances**0.5
    sortedDistIndicies = distances.argsort() # get indicies
    classCount={}
    for i in range(k):
        voteIlabel = labels[sortedDistIndicies[i]]  # get label
        classCount[voteIlabel] = classCount.get(voteIlabel,0) + 1 # 通过字典汇总相同label
    sortedClassCount = sorted(classCount.items(),
    key=operator.itemgetter(1), reverse=True) 
    return sortedClassCount[0][0]

# print(classify0([0,0], group, labels, 3))

# get the data
def file2matrix(filename):
    fr = open(filename)
    numberOfLines = len(fr.readlines())
    returnMat = zeros((numberOfLines,3))  # create array 
    fr = open(filename)
    index = 0
    classLabelVector =[]
    for line in fr.readlines():
        line = line.strip()
        listFromLine = line.split('\t')
        returnMat[index,:] = listFromLine[0:3]
        classLabelVector.append(int(listFromLine[-1]))
        index += 1
    return returnMat,classLabelVector
"""
datingDataMat,datingLabels = file2matrix('datingTestSet2.txt')
print(datingDataMat)
print(datingLabels[0:20])

fig = plt.figure()
ax = fig.add_subplot(111)
ax.scatter(datingDataMat[:,1], datingDataMat[:,2])

ax.scatter(datingDataMat[:,1], datingDataMat[:,2],
15.0*array(datingLabels), 15.0*array(datingLabels)) # 颜色与大小
plt.show()
"""

# normalizing numeric values

def autoNorm(dataSet):
    minVals = dataSet.min(0) # min(0)对行汇总,min(1)对列汇总
    maxVals = dataSet.max(0)
    ranges = maxVals - minVals
    normDataSet = zeros(shape(dataSet))
    m = dataSet.shape[0]
    normDataSet = dataSet - tile(minVals, (m,1))
    normDataSet = normDataSet/tile(ranges, (m,1))
    return normDataSet, ranges, minVals

datingDataMat,datingLabels = file2matrix('datingTestSet2.txt')
normMat, ranges, minVals = autoNorm(datingDataMat)
print(normMat)

def datingClassTest():
    hoRatio = 0.10
    datingDataMat,datingLabels = file2matrix('datingTestSet2.txt')
    normMat, ranges, minVals = autoNorm(datingDataMat)
    m = normMat.shape[0]
    numTestVecs = int(m*hoRatio)
    errorCount = 0.0
    for i in range(numTestVecs):
        classifierResult = classify0(normMat[i,:],normMat[numTestVecs:m,:],\
        datingLabels[numTestVecs:m],3)
        print ("the classifier came back with: %d, the real answer is: %d"\
        % (classifierResult, datingLabels[i]))
        if (classifierResult != datingLabels[i]): errorCount += 1.0
    print ("the total error rate is: %f" % (errorCount/float(numTestVecs)))

datingClassTest()