#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: matplotlib_study.py
@time: 2017/5/10 23:07
"""
# example1
fig = plt.figure()
ax= fig.add_subplot(1,1,1)
ax.plot(randn(1000).cumsum())
'''

# plt.plot(randn(30).cumsum(),'ko--')
'''
# example2 add lable,tick,ticklable,title
fig = plt.figure()

ax = fig.add_subplot(1,1,1)
ax.plot(randn(1000).cumsum())
ticks=ax.set_xticks([0,250,500,750,1000]) #add tick
label = ax.set_xticklabels(['one','two','three','four','five'],rotation = 30,fontsize = 'small') # add tick label
ax.set_title('My first matplotlib plot') # add title
ax.set_xlabel('Stages') # add x axis label
'''
 # example3 add legend, text，save fig
'''
fig = plt.figure()
ax = fig.add_subplot(1,1,1)
ax.plot(randn(1000).cumsum(),'k',label='one')
ax.plot(randn(1000).cumsum(),'k',label='two')
ax.plot(randn(1000).cumsum(),'k',label='three')
ax.legend(loc='best') # add legend
ax.text(1,0.5,'hello world',family='monospace',fontsize=10) #add text on set point
plt.savefig('demo.png',dpi=400,bbox_inches = 'tight') #save fig
'''
# example4 pandas plot
'''
s = pd.Series(np.random.randn(10).cumsum(),index=np.arange(0,100,10))
s.plot()

df = pd.DataFrame(np.random.randn(10,4).cumsum(0),columns =['A','B','C','D'],index=np.arange(0,100,10))
df.plot()
'''
# example5 bar kind ='bar' horizantal kidn = 'barh' vertic
'''
fig,axes = plt.subplots(2,1)
data = pd.Series(np.random.randn(16),index = list('abcdefghijklmnop'))
data.plot(kind='bar',ax=axes[0],color = 'k',alpha =0.7)
data.plot(kind='barh',ax=axes[1],color = 'g',alpha =0.7)

df = pd.DataFrame(np.random.rand(6,4),index = ['one','two','three','four','five','six'],columns=pd.Index(['A','B','C','D'],name='Genus'))
df.plot(kind='bar')
df.plot(kind='barh',stacked = True,alpha =0.5)
plt.savefig('demo3.pdf',dpi=10000,bbox_inches ='tight',loc='best')
'''

'''
tips = pd.read_csv('out.csv')
pd1 = pd.crosstab(tips.Item,tips.size)

pd2 =pd.read_excel('score.xlsx',sheetname='score')
score = pd2['math']

pd3= pd.read_csv('score.csv')
'''
# example6 histogram
'''
ax = fig.add_subplot(1,1,1)
tips = pd.read_csv('out.csv')
pd1 = pd.crosstab(tips.Item,tips.size)
pd1.hist(bins=10)
plt.title('Histogram')
plt.xticks([1.0,2.0,3.0,4.0])
plt.ylabel('Score')
plt.xlabel('Bins')
'''
'''
plt.scatter(np.arange(10),np.arange(10)**2)
plt.title('power plot')
plt.yticks(np.arange(0,81,20))
plt.xlim(-1,10) # min.max
plt.ylim(-5,85) # min,max
'''
# example scatter and  read file 
'''
pd2 =pd.read_excel('score.xlsx',sheetname='score')
score = pd2['math']
plt.scatter(np.arange(900),score)

'''

# example group_by

fec= pd.read_csv('election_2012.csv')

# print(fec.ix[123456])

# unique_cands = fec.cand_nm.unique()
# print(unique_cands[3])
#t= fec.contbr_occupation.value_counts()[:10]
# print(t)

t = np.arange(0,5,0.2)

plt.plot(t,t,'r--',t,t**2,'bs',t,t**3,'g^')

# DOUBLE Y
x = np.arange(0., np.e, 0.01)
y1 = np.exp(-x)
y2 = np.log(x)

fig = plt.figure()

ax1 = fig.add_subplot(111)
ax1.plot(x, y1)
ax1.set_ylabel('Y values for exp(-x)')
ax1.set_title("Double Y axis")

ax2 = ax1.twinx()  # this is the important function
ax2.plot(x, y2, 'r')
ax2.set_xlim([0, np.e])
ax2.set_ylabel('Y values for ln(x)')
ax2.set_xlabel('Same X for both exp(-x) and ln(x)')

plt.show()

# 3D图

x,y=np.mgrid[-2:2:20j,-2:2:20j]
z=x*np.exp(-x**2-y**2)
ax=plt.subplot(111,projection='3d')
ax.plot_surface(x,y,z,rstride=2,cstride=1,cmap=plt.cm.coolwarm,alpha=0.8)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
plt.show()

# hist
t = np.arange(10)
fig = plt.figure()
ax = fig.add_subplot()
plt.hist(t,2*t+1)
plt.show()

# scarter
t = np.arange(10)
fig = plt.figure()
ax = fig.add_subplot()
plt.scatter(t,t*2+1)
plt.savefig("scatter.png")

# pie
t = np.arange(5)
fig = plt.figure()
ax = fig.add_subplot()
a=['A','B','C','D','F']
plt.pie(t,labels=a)
# plt.pie(t,labels=labels,autopct='%1.2f%%')

plt.show()

# inport image
img = mplimg.imread("stinkbug.png")

# print(img) read img information
lum_img =img[:,:,0]
imgplot =plt.imshow(lum_img)
imgplot.set_cmap('hot')
imgplot.set_cmap('spectral')
plt.colorbar()



















