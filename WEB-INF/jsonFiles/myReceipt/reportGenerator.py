import json
import os
import sys
from PIL import Image,ImageDraw,ImageFont,ImageColor

imageFileName=sys.argv[1]
jsonFileName=sys.argv[2]
reportName=sys.argv[3]
jsonDS=sys.argv[4]

jsonDS=eval(jsonDS);

jsonFile=open(jsonFileName)
data=json.load(jsonFile)
jsonFile.close()

variables=data['variables']


image=Image.open(imageFileName)
draw=ImageDraw.Draw(image)


for (key,value) in jsonDS.items():
	for v in variables:
		if(v['text']==key):
			(x,y)=(int(v['x']),int(v['y']-v['size']))
			content=value
			rgbColor=ImageColor.getrgb(v['color'])
			myFont=(v['type'].split(" ")[0]).lower()+".ttf"
			font=ImageFont.truetype(font=myFont,size=v['size']);
			draw.text((x,y),content,fill=rgbColor,font=font)

image.save(reportName+".jpg")
			
			
			
			
			
				
  

