class Text
{
set X(x)
{
this.x=x;
}
get X()
{
return this.x;
}

set Y(y)
{
this.y=y;
}
get Y()
{
return this.y;
}

set Text(text)
{
this.text=text;
}

get Text()
{
return this.text;
}

set FontSize(size)
{
this.size=Number(size);
}

get FontSize()
{
return this.size;
}

set FontType(type)
{
this.type=type;
}

get FontType()
{
return this.type;
}


TextWidth(context)
{
return context.measureText(this.text).width;
}


color='black';
set Color(color)
{
this.color=color;
}
get Color()
{
return this.color;
}

draw(context)
{
var f=this.size+"px "+this.type;
context.font=f;
context.fillStyle = this.color;
//context.textAlign = "center";
context.fillText(this.Text, this.X, this.Y);
}
}

