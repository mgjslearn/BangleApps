var Layout = require("Layout");
let drag;
var layout = new Layout( {
  type:"v", c: [
    {type:"txt", font:"6x8:1",pad:4, label:"View Parent Survey?", id:"label" },
    {type:"btn",font:"6x8:1", label:"View",pad:4, cb:()=> lunchReminder(),  cbl: l=>print("One long press")},
  {type:"btn",font:"6x8:1",label:"Ignore",pad:4, cb:()=> print("long press!"), cbl: l=>print("long press to return")},
  ]
});

function setLabel(x) {
  layout.label.label = x;
  layout.render();
}
g.clear();
layout.render();

function lunchReminder() {
  g.clear();
  var layout = new Layout( {
  type:"h", c: [
    {type:"txt", font:"6x8:1", label:"Did you eat your fruits?", id:"label2" }
  ]
}, {btns:[
  {label:"Yes!", cb: ()=> thankYouBye(),  cbl: l=>print("One long press")},
  {label:"No:(", cb: ()=> pleaseRemember()},
], lazy:true});
g.clear();
layout.render();
}

function thankYouBye() {
  Bangle.on("drag", e => {
    if (!drag) { // start dragging
      drag = {x: e.x, y: e.y};
    } else if (!e.b) { // released
      const dx = e.x-drag.x, dy = e.y-drag.y;
      drag = null;
        E.showMessage("YAY!","Good job, Im proud of you!!!");
      if (Math.abs(dy)>Math.abs(dx)+10) {
        // vertical
          E.showMessage("DONE!","End of Survey");
      } 
  }
});
 }

function pleaseRemember() {
  Bangle.on("drag", e => {

    if (!drag) { // start dragging
      drag = {x: e.x, y: e.y};
    } else if (!e.b) { // released
      const dx = e.x-drag.x, dy = e.y-drag.y;
      drag = null;
        E.showMessage(":(","Well please remember to eat them!");
      if (Math.abs(dy)>Math.abs(dx)+10) {
        // vertical
          E.showMessage("DONE!","End of Survey");
      }
    
  }
});
 }
