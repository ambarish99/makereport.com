var list = [], list2 = [];
var selectedShape = 'undefined', selectedShapeName;
var myCanvas, c;
var ctx;
var h;
var w;
var newWidth;
var newHeight;
var image;
var reportFile;


$(document).ready(function () {
    /* $('#newVariable').click(function() {
         alert("chal");
         $('#createVariableModal').show();
     });*/
    myCanvas = document.getElementById("myCanvas");
    c = myCanvas;
    ctx = myCanvas.getContext("2d");
    h = 500;
    w = 1000;
    ctx.canvas.width = w;
    ctx.canvas.height = h;


    //ctx.globalCompositeOperation = 'destination-over'
    // Now draw!
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.fill();
    document.getElementById("createNewVariable").addEventListener("click", createNewVariable);

    myCanvas.addEventListener("mousemove", function (event) { mouseMove(event); });
    myCanvas.addEventListener("mousedown", function (event) { mouseDown(event); });
    myCanvas.addEventListener("mouseup", function (event) { mouseUp(event); });

    /*
    image = new Image();
    image.src = 'receipt.png';
    var iw = image.innerWidth;
    var ih = image.innerHeight;
    image.onload = function () {
        ctx.drawImage(image, 10, 10, newWidth, newHeight);
    }
    */

});




function validateReportEntry(event) {
    var name = document.getElementById("reportName").value;
    if (name.length == 0) {
        //name.focus();
        document.getElementById("reportNameError").innerHTML = "please enter report file name";
        return false;
    }
    reportFile = document.getElementById("reportUpload").files[0];
    if (reportFile.length == 0) {
        //event.reportUpload.focus();
        document.getElementById("fileUploadError").innerHTML = "please select a file to upload";
        return false;
    }
    document.getElementById("fileUploadError").innerHTML = "";
    document.getElementById("reportNameError").innerHTML = "";

    //code to remove variables
    for (var i = 0; i < list.length; i++) {
        var elementId = list[i].Text;
        var element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    }
    list = [];

    image = new Image();
    image.src = URL.createObjectURL(reportFile);

    /*var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var h=window.innerWidth;
    var w=window.innerHeight;
    ctx.canvas.width=w;
    ctx.canvas.height=h;*/


    image.onload = function () {
        ctx.clearRect(0, 0, w, h);
        /*
        ctx.fillStyle = "gray";
        ctx.beginPath();
        ctx.rect(0, 0, w, h);
        ctx.fill();*/
        var iw = image.width;
        var ih = image.height;
        ctx.canvas.width=iw;
        w=iw;
        ctx.canvas.height=ih;
        h=ih;
        /*
        CODE TO FIT IMAGE TO CANVAS
        var wrh = iw / ih;
        newWidth = myCanvas.width;
        newHeight = newWidth / wrh;
        if (newHeight > myCanvas.height) {
            newHeight = myCanvas.height;
            newWidth = newHeight * wrh;
        }
        
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
        */
       ctx.drawImage(image, 0, 0, iw, ih);
        
    }


    $("#newReportModal").modal("hide");
    //$("#newReportModal").removeData();
    return true;
}




function createNewVariable() {
    var name = document.getElementById("name").value;
    var e = document.getElementById("fontType");
    var fontType = e.options[e.selectedIndex].text;
    var fontSize = document.getElementById("fontSize").value;
    var color = document.getElementById("color").value;

    text = new Text();
    text.Text = name;
    text.X = 0;
    text.Y = 70;
    text.FontSize = fontSize;
    text.FontType = fontType;
    text.Color = color;
    text.draw(ctx);
    list.push(text);
    console.log("length of list after push==" + list.length);
    console.log("text object="+JSON.stringify(text));
    console.log("list=="+JSON.stringify(list));
    
    //code to create element
    var parent = document.getElementById("listOfTasks");
    var anchorElem = document.createElement('a');
    anchorElem.setAttribute('id', name);
    anchorElem.setAttribute("class", "nav-link");
    anchorElem.setAttribute('onclick', 'showVariable(event)');
    anchorElem.setAttribute("data-toggle", "modal");
    anchorElem.setAttribute("data-target", "#variableModal");
    anchorElem.setAttribute("href", "#");
    anchorElem.innerHTML = "<div class='sb-nav-link-icon'><i class='fa fa-check-square'></i></div>" + name + "<div class='sb-sidenav-collapse-arrow'><div id='" + name + "DeleteIcon' onclick='deleteVariable(event)'><i class='fa fa-trash'></i></div></div>";
    /*
    var divElem=document.createElement('div');
    divElem.setAttribute("class","sb-nav-link-icon");
    
    var iconElem=document.createElement('i');
    iconElem.setAttribute("class","fa fa-check-square");
    
    anchorElem.appendChild(divElem);
    divElem.appendChild(iconElem);*/

    parent.appendChild(anchorElem);

    //code to create element ends----

    $("#createVariableModal").modal("hide");
    $("#createVariableModal").removeData()
}

var selectedVariable;
function showVariable(event) {
    var id = event.target.id;
    console.log("id=" + id);
    for (var i = 0; i < list.length; i++) {
        if (list[i].Text == id) {
            selectedVariable = list[i];
            break;
        }
    }
    var fontList = document.getElementById('vFontType').options;
    var len = fontList.length;
    for (var i = 0; i < len; i++) {
        if (fontList[i].text == selectedVariable.FontType) {
            break;
        }
    }
    document.getElementById('vName').value = selectedVariable.Text;
    document.getElementById('vFontType').selectedIndex = i;
    document.getElementById('vFontSize').value = selectedVariable.FontSize
    document.getElementById('vColor').value = selectedVariable.Color;
}


function saveChanges(event) {
    var oldName = selectedVariable.Text;
    var name = document.getElementById('vName').value;
    var element = document.getElementById('vFontType');
    var fontType = element.options[element.selectedIndex].text;
    var fontSize = document.getElementById('vFontSize').value;
    var color = document.getElementById('vColor').value;
    selectedVariable.Text = name;
    selectedVariable.FontType = fontType;
    selectedVariable.FontSize = fontSize;
    selectedVariable.Color = color;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.fill(); 
    if (image != null) ctx.drawImage(image, 0, 0, w, h);
    for (var i = 0; i < list.length; i++) {
        list[i].draw(ctx);
    }
    var anchorElem = document.getElementById(oldName);
    anchorElem.innerHTML = "<div class='sb-nav-link-icon'><i class='fa fa-check-square'></i></div>" + name + "<div class='sb-sidenav-collapse-arrow'><div id='" + name + "DeleteIcon' onclick='deleteVariable(event)'><i class='fa fa-trash'></i></div></div>";
    anchorElem.id = name;
    $("#variableModal").modal("hide");
}



function deleteVariable(event) {
    event.stopPropagation();
    var iconId = event.target.parentNode.parentNode.id;
    var tg = event.target.parentNode.parentNode.tagName;
    console.log("ICON ID=" + iconId);
    console.log("tag=" + tg);
    var index = iconId.indexOf("DeleteIcon");
    var elemId = iconId.substring(0, index);
    console.log("elemId=" + elemId);
    var element = document.getElementById(elemId);
    element.parentNode.removeChild(element);
    list2 = [];
    var temp;
    while(list.length!=0){
        temp = list.pop();
        console.log("times run="+i);
        if (temp.Text != elemId) {
            console.log("PUSH TEXT=="+temp.Text);
            list2.push(temp);
        }
        
        
    }
    list = list2;
    list2 = [];
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.fill(); 
    if (image != null) ctx.drawImage(image, 0, 0, w, h);
    console.log("length="+list.length);
    for (var i = 0; i < list.length; i++) {
        console.log("text="+list[i].Text);
        list[i].draw(ctx);
    }

}



function mouseDown(e) {
    var rect = c.getBoundingClientRect();
    var cx = rect.left;
    var cy = rect.top;
    var x = e.clientX - cx;
    var y = e.clientY - cy;
    console.log("cX==" + cx + "   cY==" + cy);
    console.log("clientx==" + e.clientX + "  clienty==" + e.clientY);
    console.log("x==" + x + "  y==" + y);
    selectedShape = 'undefined';
    var done = 0;
    while (list.length != 0) {
        var found = 0;
        var isShape = 0;
        shape = list.pop();

        if (typeof shape.Text != 'undefined') {
            isShape = 1;
            if (x >= shape.X && y <= shape.Y && x <= (+shape.X + +shape.TextWidth(ctx)) && y >= (+shape.Y - shape.FontSize) && done == 0) {
                found = 1;
                done = 1;
                selectedShape = shape;
                selectedShapeName = 'text';
            }  //to be implemented-----------------
        }
        if (found == 0 && isShape == 1) {
            list2.push(shape);
        }
    }

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.rect(0, 0, w, h);
    ctx.fill(); 
    if(image != null) ctx.drawImage(image, 0, 0, w, h);
    for (var i = 0; i < list2.length; i++) {
        list2[i].draw(ctx);
    }

    console.log("selected shape=" + selectedShape);
    if (selectedShape != 'undefined') {
        selectedShape.draw(ctx);
    }
    //list2.push(selectedShape);
    list = list2;
    list2 = [];

}//mouseDown ends





function mouseMove(e) {
    var rect = c.getBoundingClientRect();
    var cx = rect.left;
    var cy = rect.top;
    var x = e.clientX - cx;
    var y = e.clientY - cy;
    if (selectedShape != 'undefined') {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "gray";
        ctx.beginPath();
        ctx.rect(0, 0, w, h);
        ctx.fill(); 
        if (image != null) ctx.drawImage(image, 0, 0, w, h);
        for (var i = 0; i < list.length; i++) {
            list[i].draw(ctx);
        }
        if (selectedShapeName === 'text') {
            /*
            text=new Text();
            text.Text=selectedShape.Text;
            text.X=x;
            text.Y=y;
            selectedShape=text;
            */
            selectedShape.X = x;
            selectedShape.Y = y;
            selectedShape.draw(ctx);
        }


    }//if condition
}//mouseMove ends





function mouseUp(e) {
    if (selectedShape != 'undefined') {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "gray";
        ctx.beginPath();
        ctx.rect(0, 0, w, h);
        ctx.fill();
        if (image != null) ctx.drawImage(image, 0, 0, w, h);
        selectedShape.draw(ctx);
        for (var i = 0; i < list.length; i++) {
            list[i].draw(ctx);
        }
        list[list.length] = selectedShape;
    }
    selectedShape = 'undefined';
}


function sendDataToServer(event)
{
    //waitingDialog.show();

    var reportName=document.getElementById("reportName").value;
    console.log("Report Name=="+reportName);
    var jsonObj={reportName: reportName,variables:list};
    var data=JSON.stringify(jsonObj);

    $.ajax({
        url:'makeNewReport' ,
        type: "POST",
        dataType: 'text',
        data: data,
        contentType: 'application/json;charset=UTF-8',
        xhrFields: {responseType:'blob'},
        cache: false,
        beforeSend: function(x) {
          if (x && x.overrideMimeType) {
            x.overrideMimeType("application/json;charset=UTF-8");
          }
        },
        success: function() {
        //Write your code here
        //waitingDialog.hide();
            var a=document.createElement('a');            
            a.href='/makereport.com/downloadReport?name='+reportName;
            document.body.append(a);
            a.click();
            a.remove();
            console.log("SUCCESS YESSS");
        },
        error: function(jqXHR, exception)
        {
            console.log("ERROR AA GAI");
            var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        console.log(msg);
        }    
        
    });
   
}
