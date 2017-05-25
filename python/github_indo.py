#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
@author: Homing
@software: PyCharm Community Edition
@file: github_indo.py
@time: 2017/5/25 21:19
"""
from github import  Github
import datetime


def repo_info(user, pwd):
    repo_list = []
    info = Github(user, pwd).get_user()
    for repo in info.get_repos():
        repo_list.append(repo)
    return info


def repo_commit_info(user, pwd, repo_name, delta_time=7):
    repo = repo_info(user, pwd).get_repo(repo_name)
    commits = repo.get_commits(sha='master', since =datetime.datetime.now()-datetime.timedelta(days=7), until=datetime.datetime.now())
    for cm in commits:
        print(cm)


def main():
    user = '470034235@qq.com'
    pwd = 'HomingYuan1987'
    repo = 'data_science_way'
    repo_commit_info(user, pwd, repo, 7)

if __name__ == '__main__':
    main()












