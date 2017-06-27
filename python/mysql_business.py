#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: mysql_business.py
@time: 2017/4/22 14:30
"""
import pymysql
connection = pymysql.connect(host='127.0.0.1',
                             port=3306,
                             user='root',
                             password='password',
                             db='y1',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
curson = connection.cursor()
sql_insert ="insert into user (username,sex,sex1) values ('John','nan','boy'),('Homing','nan','boy')"
sql_update = "update user set username='name' where id =28"
sql_delete = "delete from user where id<19 "
try:
    curson.execute(sql_insert)
    curson.execute(sql_update)
    curson.execute(sql_delete)
    connection.commit()
except Exception as e:
    print(e)
    connection.rollback()

curson.close()
connection.close()









