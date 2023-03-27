import requests
from bs4 import BeautifulSoup
import re
import json

url2 = "https://www.livechennai.com/Fruits_price_chennai.asp"
r2 = requests.get(url2)
htmlContent2 = r2.content
soup2 = BeautifulSoup(htmlContent2, 'html.parser')
title2 = soup2.title
tds2 = soup2.find_all('td')
fruitName = []
for fruit in tds2:
  x = re.search("[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(1 Kg\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]*\([A-Za-z0-9]*\) \(1 Kg\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \/ [A-Za-z0–9_]* \(1 Kg\)|[A-Za-z0–9_]+ *[A-Za-z0–9_]* *\-* *[A-Za-z0–9_]* \([A-Za-z0–9_]*\)\(1 Kg\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(1 Piece\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(~ 4 Kg\)", str(fruit))
  if x!=None:
    fruitName.append(x.group())
fruitPrice = []
for fruit in tds2:
  x = re.search("[0-9]+[0–9]*\.[0-9]+", str(fruit))
  if x!=None:
    fruitPrice.append(x.group())
result2=[]
for i in range(0,len(fruitName),1):
    result2.append([fruitPrice[i],fruitName[i]])
f = {}
for elem in result2:
        f[elem[1]] = (elem[0])
json_result2=json.dumps(f, indent = 4) 
print(json_result2)