#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: scrap_try.py
@time: 2017/6/10 12:19
"""
# http://cuiqingcai.com/1319.html


import re
from bs4 import BeautifulSoup

with open('51job.htm',encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'lxml')


fo = open('python_sal.csv', 'w', encoding='gbk') # 打开文件，并准备写入

# 1.tag 标签
# fo.write(soup.prettify()) #写入文件
'''
print(soup.title)  # 带标签
print(soup.title.string)  # 不带标签
print(soup.a)
print(soup.a.string)
print(soup.p)
print(type(soup.a))
print(soup.name)
print(soup.head.name)
print(soup.p.attrs)
'''
# 2.NavigableString
'''

print(soup.p.string)
print(type(soup.p))
'''

# 3.BeautifulSoup
'''
print(soup.name)
print(soup.attrs)
'''

# 4.Comment
'''
print(soup.a)
print(type(soup.a))
'''


# 2.遍历文档树

# 2.1 直接子节点
# contents
'''print(soup.head.contents)
# print(soup.head.contents[1])

'''
# children
'''
print(soup.head.children)  # 可迭代对象
for child in soup.head.children:
    print(child)

'''
# 2.2 所以子孙节点
# descendants
'''
for child in soup.descendants:
    print(child)
    print(child.string)  # 不带标签
'''
# 2.3节点内容
'''
for child in soup.descendants:
    print(child.string)
'''

# 2.4多个内容

# string
'''
for string in soup.strings:
    print(repr(string))  # 会打印空格和空行
'''
# stripped.strings
'''
for string in soup.stripped_strings:
    print(repr(string))  # 不会打印空格和空行
    print(string)
'''
# 2.5父节点
'''
p = soup.p
print(p.parent.name)

content = soup.head.title.string
print(content.parent.name)
'''
# 2.6全部父节点

# parents
'''
content = soup.head.title.string
for parent in content.parents:
    print(parent.name)
'''

# 2.7 兄弟节点
# next_sibling, previous_slblibg
'''
print(soup.p.next_sibling)
print(soup.p.prev_sibling)
print(soup.p.next_sibling.next_sibling)
'''
# 2.8全部兄弟节点
'''
for sibling in soup.p.next_siblings:
    print(repr(sibling))
    
'''
# 2.9 前后节点
'''
print(soup.head.next_element)
'''

# 2.10 所有前后节点
'''
for element in soup.last_a_tag.next_elements:
    print(repr(element)) # 执行不了
'''

# 3 搜索文档数
'''
for i in soup.find_all('a'):
    print(i.string)
    print(i)
'''
# 正则表达式
'''
for tag in soup.find_all(re.compile("^a")):
    print(tag)
    '''
# 传列表
'''
print(soup.find_all(['a','b']))
'''

# 传true
'''
for tag in soup.find_all(True):
    print(tag)
'''
# 传方法
'''
def has_class_but_no_id(tag):
    return tag.has_attr('class') and not tag.has_attr('id')
soup.find_all(has_class_but_no_id)  # 返回空值
'''
# keyword
'''
allText = soup.find_all(id='area_channel_layer_all')
print(allText[0].get_text())  # 获取标签内信息
# print(soup.find_all(id='area_channel_layer_all'))

for i in soup.find_all(id='area_channel_layer_all'):
    print(i)
    print(i.string)  # 返回None

for i in soup.find_all(href=re.compile(r''), id='area_channel_layer_all') :
    print(i)

print(soup.find_all('a', class_='e'))
print(soup.find_all(class_='e'))
'''
# text 参数
'''
soup.find_all(text='python')
for link in soup.find_all('a'):
    if 'href' in link.attrs:
        print(link.attrs['href'],":",link.get_text())  # 获取所有链接和标签内信息

for link in soup.find_all('span'):
    print(link.attrs)
'''
# print(soup.find_all('span', class_='t2'))
'''
for com in soup.find_all('span', class_='t2'):
    print(com.get_text())

for loc in soup.find_all('span', class_='t3'):
    print(loc.get_text())

for sal in soup.find_all('span', class_='t4'):
    print(sal.get_text())
'''
l = []
for pos in soup.find_all('span', class_=['t2','t3','t4']):
    text = pos.get_text().strip()
    print(text)
    # fo.write(text)
    l.append(text)
    #fo.write('\n')
# print(l)
for i in range(len(l)):
    if i%3 == 0:
        fo.write(l[i])
        fo.write('   ')
    if i%3 == 1:
        fo.write(l[i])
        fo.write('   ')
    if i%3 ==2:
        fo.write(l[i])
        fo.write('\n')
