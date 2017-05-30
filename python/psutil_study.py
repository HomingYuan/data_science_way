#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: psutil_study.py
@time: 2017/5/30 21:44
"""

import psutil
'''
print(psutil.cpu_count())  # cpu 个数
print(psutil.cpu_percent())  # cpu 占有率
print(psutil.cpu_times())  # cpu 花费时间
print(psutil.cpu_stats())  # 以命名元组的形式返回cpu的统计信息，包括上下文切换、中断、软中断和系统调用的次数
print(psutil.disk_partitions())  # 返回所有已经挂载的磁盘，以命名元组的形式返回。命名元组包含磁盘名称、挂载点、文件系统类型等信息

print(psutil.disk_usage('.'))
print('disk_to_counter:', psutil.disk_io_counters())

print('net_connections:', psutil.net_connections())  # 以列表的形式返回每个网络连接的详细信息，可以使用该函数查看网络连接状态，统计连接个数以及处于特定状态的网络连接个数

print(psutil.net_io_counters())   # 返回当前系统中网络io统计信息

print(psutil.users())  # 以命名元组的方式返回当前登陆用户的信息，包括用户名，登陆时间，终端与主机信息

print(psutil.boot_time())  # 以时间戳的形式返回系统的启动时间



print(psutil.Process())  # 对进程的封装。可以使用该类的方法，获取进程的详细信息，或者给进程发送信号


print(psutil.pids())  # 当前运行的进行列表
'''

for pro in psutil.process_iter():  # 迭代当前正在运行的进程
    print(pro)




