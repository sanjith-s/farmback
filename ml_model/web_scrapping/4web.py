import requests
from bs4 import BeautifulSoup
import re
import json

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