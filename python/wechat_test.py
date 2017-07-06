# -*- coding: utf-8 -*-
"""
Created on Thu Jul  6 14:39:08 2017

@author: user
"""

from wxpy import *
bot = Bot()
# 向文件传输助手发送消息
bot.file_helper.send('Hello from wxpy!')

my_friend = bot.friends().search('问好', sex=MALE)[0] # 朋友
my_friend.send_image('my_picture.jpg') # 发送照片
my_friend.send('my_picture.jpg') # 发送信息
my_friend.send_video('my_video.mov')
# 发送文件
my_friend.send_file('my_file.zip')
# 以动态的方式发送图片
my_friend.send('@img@my_picture.png')
# 发送消息给自己
f = open('threebody.txt',encoding='utf-8')
for line in f.readlines():
    line = str(line.strip())
    bot.self.send(line)