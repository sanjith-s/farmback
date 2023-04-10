import requests
from bs4 import BeautifulSoup
import re
import json
url1 = "https://www.livechennai.com/spinach_greens_price_chennai.asp"
r1 = requests.get(url1)
htmlContent1 = r1.content
soup1 = BeautifulSoup(htmlContent1, 'html.parser')
title1 = soup1.title
tds1 = soup1.find_all('td')
greenName = []
for green in tds1:
  x = re.search("[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \( 1 Kg\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(1 Bundle\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(1 Bunch\)", str(green))
  if x!=None:
    greenName.append(x.group())
greenPrice = []
for green in tds1:
  x = re.search("[0-9]+[0–9]*\.[0-9]+", str(green))
  if x!=None:
    greenPrice.append(x.group())
result=[]
for i in range(0,len(greenName),1):
    result.append([greenPrice[i],greenName[i]])
d = {}
for elem in result:
        d[elem[1]] = (elem[0])
json_result=json.dumps(d, indent = 4) 
print(json_result)