    var selectedElement = 0;
    var currentX = 0;
    var currentY = 0;
    var currentTranslate = 0;

    function selectElement(evt) {
      selectedElement = evt.target;
      while("vvvv-node" !== selectedElement.getAttributeNS(null, "class"))
        selectedElement = selectedElement.parentNode

      currentX = evt.clientX;
      currentY = evt.clientY;
      currentTranslate = selectedElement.getAttributeNS(null, "transform").slice(10,-1).split(',');
        console.log(currentTranslate)

      for(var i=0; i<currentTranslate.length; i++) {
        currentTranslate[i] = parseFloat(currentTranslate[i]);
        console.log(currentTranslate[i])
      }

      selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
      selectedElement.setAttributeNS(null, "onmouseout", "deselectElement(evt)");
      selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
    }

    function moveElement(evt) {
      var dx = evt.clientX - currentX;
      var dy = evt.clientY - currentY;
      currentTranslate[0] += dx;
      currentTranslate[1] += dy;

      selectedElement.setAttributeNS(null, "transform", "translate(" + currentTranslate.join(',') + ")");
      currentX = evt.clientX;
      currentY = evt.clientY;
    }

    function deselectElement(evt) {
      if(selectedElement != 0){
          selectedElement.removeAttributeNS(null, "onmousemove");
          selectedElement.removeAttributeNS(null, "onmouseout");
          selectedElement.removeAttributeNS(null, "onmouseup");
          selectedElement = 0;
          }
        }
