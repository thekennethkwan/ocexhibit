import easyocr

reader = easyocr.Reader(['en'])
result = reader.readtext('images/event1.jpg')

print(result)

for(bbox, text, prob) in result:
    print(text)   