#!/usr/bin/env python3
# Anchor extraction from HTML document
from bs4 import BeautifulSoup
from urllib.request import urlopen
import time

# response = urlopen('https://en.wikipedia.org/wiki/Main_Page')
# soup = BeautifulSoup(response, 'html.parser')

# # spup 중에 a태그를 찾아서 모두 anchor에 집어넣어라
# for anchor in soup.find_all('a'):
#     print(anchor.get('href', '/'))

response = urlopen('https://www.naver.com/')
soup = BeautifulSoup(response, 'html.parser')
# print(soup.text.find('event_item'))
time.sleep(2)
# select(body a) = <body>의 모든 자손 중 a 태그를 선택해라
for anchor in soup.select(".title"):
    print(anchor)