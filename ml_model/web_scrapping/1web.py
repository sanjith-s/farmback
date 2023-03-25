import requests
from bs4 import BeautifulSoup
import re
import json
url1 = "https://www.livechennai.com/Vegetable_price_chennai.asp"
r1 = requests.get(url1)
htmlContent1 = r1.content
soup1 = BeautifulSoup(htmlContent1, 'html.parser')
title1 = soup1.title
tds1 = soup1.find_all('td')
vegName = []
for veg in tds1:
  x = re.search("[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(1 Kg\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(1 Piece\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(Small\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(Big\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(Hills\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(Country\)", str(veg))
  if x!=None:
    vegName.append(x.group())
vegPrice = []
for veg in tds1:
  x = re.search("[0-9]+[0–9]*\.[0-9]+", str(veg))
  if x!=None:
    vegPrice.append(x.group())
result=[]
for i in range(0,len(vegName),1):
    result.append([vegPrice[i],vegName[i]])
d = {}
for elem in result:
        d[elem[1]] = (elem[0])
json_result=json.dumps(d, indent = 4) 
print(json_result)