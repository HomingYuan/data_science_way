#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: wechat_autoreply.py
@time: 2017/6/18 9:38
"""

# login in wechart
from wxpy import *
bot = Bot()
# find friend
my_friend = bot.friends().search('袁红明', sex=MALE)[0]

# send message

f = open('scraping.txt','r',encoding='utf-8')
for line in f.readlines():
    line = line.strip()
    my_friend.send(line)


# 打印来自其他好友、群聊和公众号的消息
@bot.register()
def print_others(msg):
    print(msg)

# 回复 my_friend 的消息 (优先匹配后注册的函数!)
@bot.register(my_friend)
def reply_my_friend(msg):
    return 'received: {} ({})'.format(msg.text, msg.type)

# 自动接受新的好友请求
@bot.register(msg_types=FRIENDS)
def auto_accept_friends(msg):
    # 接受好友请求
    new_friend = msg.card.accept()
    # 向新的好友发送消息
    new_friend.send('哈哈，我自动接受了你的好友请求')

# 保持运行
embed()



