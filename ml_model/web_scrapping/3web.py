import requests
from bs4 import BeautifulSoup
import re
import json

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