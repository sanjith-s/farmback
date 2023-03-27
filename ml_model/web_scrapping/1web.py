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
result1=[]
for i in range(0,len(vegName),1):
    result1.append([vegPrice[i],vegName[i]])
v = {}
for elem in result:
        v[elem[1]] = (elem[0])
json_result1=json.dumps(v, indent = 4) 
print(json_result1)

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

url3 = "https://www.livechennai.com/spinach_greens_price_chennai.asp"
r3 = requests.get(url3)
htmlContent3 = r3.content
soup3 = BeautifulSoup(htmlContent3, 'html.parser')
title3 = soup3.title
tds3 = soup3.find_all('td')
greenName = []
for green in tds3:
  x = re.search("[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \( 1 Kg\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(1 Bundle\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(1 Bunch\)", str(green))
  if x!=None:
    greenName.append(x.group())
greenPrice = []
for green in tds3:
  x = re.search("[0-9]+[0–9]*\.[0-9]+", str(green))
  if x!=None:
    greenPrice.append(x.group())
result3=[]
for i in range(0,len(greenName),1):
    result3.append([greenPrice[i],greenName[i]])
gre = {}
for elem in result3:
        gre[elem[1]] = (elem[0])
json_result3=json.dumps(gre, indent = 4) 
print(json_result3)

url4 = "https://www.livechennai.com/Rice_dal_price_chennai.asp"
r4 = requests.get(url4)
htmlContent4 = r4.content
soup4 = BeautifulSoup(htmlContent4, 'html.parser')
title4 = soup4.title
tds4 = soup4.find_all('td')
grainsName = []
for grain in tds4:
  x = re.search("[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(1 Kg\)|[A-Za-z0–9_]+ *[A-Za-z0–9_]* \( 1kg \)|[A-Za-z0–9_]+ *[A-Za-z0–9_]* *[A-Za-z0–9_]*  \( 1kg \)|[A-Za-z0–9_]+ *[A-Za-z0–9_]* *[A-Za-z0–9_]* \(1 Kg\)|[A-Za-z0–9_]+ [A-Za-z0–9_]* *\-* *[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]*\(1 Kg\)|[A-Za-z0–9_]+ [A-Za-z0–9_]* *\-* *[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(1 Kg\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* *[A-Za-z0–9_]* *[A-Za-z0–9_]* *[A-Za-z0–9_]* \(5 Kg\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* *[A-Za-z0–9_]* *[A-Za-z0–9_]* \(1 Kg\)|[A-Za-z0–9_]+ *\-* *[A-Za-z0–9_]* \(1 kg\)", str(grain))
  if x!=None:
    grainsName.append(x.group())
grainsPrice = []
for grain in tds4:
  x = re.search("[0-9]+[0–9]*\.[0-9]+", str(grain))
  if x!=None:
    grainsPrice.append(x.group())
result4=[]
for i in range(0,len(grainsName),1):
    result4.append([grainsPrice[i],grainsName[i]])
gra = {}
for elem in result4:
        gra[elem[1]] = (elem[0])
json_result4=json.dumps(gra, indent = 4) 
print(json_result4)