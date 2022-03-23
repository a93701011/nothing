

let colors = "211d2c,4b949c,47efbd,6b9897,e5276e,fc0a0c,fe3b56,641b79,7877fb,eeb9d4,7b32fa,895a51,422526,443636,ff531e,ff7449,e2dac9,163ed0,b2647e,05a4c0,87766e,e4f8e4,ca52eb,5c1fc1,5d4a78,f17b7b,0d0a22,ffe271,ffe21d,fc68af,fe46a2".split(",").map(a => `#${a}`);
let strokew = ["3","6","12","24","48"];
let alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
let current;
let svg = document.querySelector("svg")
let svgNS = svg.namespaceURI;

window.onload = function(){
  init();
}

function init() {

  let colorbg = parseInt(fxrand()*100)%31;
  let colortg = parseInt(fxrand()*100)%31;
  colortg += (colorbg===colortg) ? 1 : 0;
  let tou = getpath(320,320,parseInt(fxrand()*150)+160); 
  let facesize = parseInt(fxrand()*300)+150
  let headsize = facesize+(fxrand()-0.5)*fxrand()*20;
  let face = getpath(320,320,facesize);
  let head = getpath(320,320,headsize);
  //svg.style.background = colors[colorbg];
  addbg(colorbg);
  addpath('face',face,1);
  addpath('head',head,1);
  addpath('tongue',tou,colortg);
  addcircle();
  addcircle();
  //addcontainer();
  // console.log(svg)
  // downloadsvg()

}

const downloadsvg = () => {

  const svg4dl = svg.cloneNode(true);
  
  let blob = new Blob([svg4dl.outerHTML], { type: 'image/svg+xml'});
  let url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = `nothing.svg`;
  document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
        }, 100);
      

}

function addpath(type,path,colorrand){

  if(type==='face'){
    renderd(type,path);
    current.setAttribute('fill', colors[parseInt(fxrand()*100)%31]);
    current.setAttribute('filter',"url(#squiggly1)");
    current.setAttribute('fill-opacity',(fxrand()*0.45)+0.5);
    //console.log(current)
  }else if(type ==='tongue'){
    renderd(type,path);
    current.setAttribute('fill', colors[colorrand]);
    current.setAttribute('filter',"url(#squiggly2)")
    current.setAttribute('fill-opacity',"0.75")
    //console.log(current)
  }else if(type ==='head'){
    renderd(type,path);
    current.setAttribute('fill','none');
    current.setAttribute('stroke',colors[parseInt(fxrand()*100)%31]);
    current.setAttribute('stroke-width',strokew[parseInt(fxrand()*100)%5]);
    current.setAttribute('filter',"url(#squiggly4)");
    //current.setAttribute('stroke-opacity',"0.5");
    //console.log(current)
  }
}

function getpath(cx,cy,angr){
  let path = [];
  cpxpoint = [];
  cpypoint = [];
  for (var i = 0; i < 4 ; i ++) {
    let angh = (fxrand()*Math.PI/2) + Math.PI/2*i;
    let cpx = cx + parseInt(Math.cos(angh)*angr);
    let cpy = cy + parseInt(Math.sin(angh)*angr);
    cpxpoint.push(cpx);
    cpypoint.push(cpy);
  }
  let start = parseInt(fxrand()*4);
  for (var i = start; i < start+4 ; i ++) {
    let pathx = (cpxpoint[i%4]+cpxpoint[(i+1)%4])/2;
    let pathy = (cpypoint[i%4]+cpypoint[(i+1)%4])/2;
    path.push(pathx);
    path.push(pathy);
    if(i%4===start){
      path.push(cpxpoint[(i+1)%4]);
      path.push(cpypoint[(i+1)%4]);
    }
  }
  return path;
}

function renderd(type,path) {
  var newLine = document.createElementNS(svgNS, 'path');
	newLine.setAttribute('fill', 'none');
  newLine.setAttribute('stroke','none');
  current = svg.appendChild(newLine);
  if(type ==='tongue'){
  
    var d = 'M' + path[0]+','+ path[1] + '';
    for (var i = 2; i < 6 ; i += 2) {
      d += (i===2) ? 'Q' : (i>4 && i%2==0) ? 'T' : ',';
      d += '' + path[i] + ',' + path[i + 1]
    }
    d += 'Z';
  }else 
    if(type ==='face'){
      var d = 'M' + path[0] + ',' + path[1]
      for (var i = 2; i < 10 ; i += 2) {
        d += (i===2) ? 'Q' : (i>4 && i%2==0) ? 'T' : ',';
        d += path[i] + ',' + path[i + 1]
      }
      d += 'T'+path[0] + ',' + path[1]+'Z';
  }else 
    if(type ==='head'){
      var d = 'M' + path[0] + ',' + path[1]
      for (var i = 2; i < 10 ; i += 2) {
        d += (i===2) ? 'Q' : (i>4 && i%2==0) ? 'T' : ',';
        d += path[i] + ',' + path[i + 1]
      }
      d += 'T'+path[0] + ',' + path[1]+'Z';
    }
  current.setAttribute('d', d);
}

//add eyes
function addcircle() {
  //let angh = (fxrand()*Math.PI/4) + Math.PI/4*i;
	let newiris = document.createElementNS(svgNS, 'circle');
  let newpupil = document.createElementNS(svgNS, 'circle');
  let g = document.createElementNS(svgNS, 'g');
  let eyex = parseInt(fxrand()*500)+60;
  let eyey = parseInt(fxrand()*500)+60;
  let irissize = parseInt(fxrand()*35)+25;
  let pupiilsize = parseInt(fxrand()*(irissize-10))+5;
  let centerset =  parseInt(fxrand()*4);
	newiris.setAttribute('fill', '#ffffff');
  newiris.setAttribute('r',`${irissize}`);
  newiris.setAttribute('transform',`matrix(1 0 0 1 ${eyex} ${eyey})`);
  newpupil.setAttribute('fill', '#000000');
  newpupil.setAttribute('r',`${pupiilsize}`);
  newpupil.setAttribute('transform',`matrix(1 0 0 1 ${eyex-(Math.cos(Math.PI*centerset)*centerset*irissize)/4} ${eyey-(Math.sin(Math.PI*centerset+Math.PI/2)*centerset*irissize)/4})`);
  g.setAttribute('filter',"url(#squiggly5)");
  g.setAttribute('opacity', '0.75');
  g.appendChild(newiris);
  g.appendChild(newpupil);
  svg.appendChild(g);
}

//add background
function addbg(colorbg){
  let rect = document.createElementNS(svgNS, 'rect');
  rect.setAttribute('x', '0');
  rect.setAttribute('y', '0');
  rect.setAttribute('width', '640');
  rect.setAttribute('height', '640');
  rect.setAttribute('fill', colors[colorbg]);
  rect.setAttribute('fill-opacity', (fxrand()*0.5)+0.5);
  svg.appendChild(rect);
  console.log(rect);
}

function addcontainer(){
  //<ellipse cx="100" cy="60" rx="80" ry="50" />
  let ellipseside = []
  let ellipse = document.createElementNS(svgNS, 'ellipse');
  let g = document.createElementNS(svgNS, 'g');
  ellipse.setAttribute('fill', '#000000');
  ellipse.setAttribute('stroke','#000000');
  ellipse.setAttribute('stroke-width','6');
  ellipse.setAttribute('cx', '640');
  ellipse.setAttribute('cy', '140');
  let rx = parseInt(fxrand()*200)+150;
  ellipse.setAttribute('rx', rx);
  ellipse.setAttribute('ry',  parseInt(fxrand()*25)+15);
  
  g.appendChild(ellipse);

  let newLine = document.createElementNS(svgNS, 'path');
	newLine.setAttribute('fill', 'none');
  newLine.setAttribute('stroke','#000000');
  newLine.setAttribute('stroke-width','6');
  let bodypath = getbodypath(640,640,parseInt(fxrand()*90)+550,rx);
  console.log(bodypath);
  let d = 'M' + bodypath[0]+','+ bodypath[1] + '';
  for (var i = 2; i < 10 ; i += 2) {
    d += (i===2) ? 'Q' : (i>4 && i%2==0) ? 'T' : ',';
    d += '' + bodypath[i] + ',' + bodypath[i + 1]
  }
  d += 'Z';
  newLine.setAttribute('d',d);
  g.appendChild(newLine);
  
  g.setAttribute('filter',"url(#squiggly2)");
  svg.appendChild(g);
}

function getbodypath(cx,cy,angr,rx){
  let path = [];
  cpxpoint = [];
  cpypoint = [];
  for (var i = 0; i < 4 ; i ++) {
    let angh =  Math.PI/2*i;
    let cpx = cx + parseInt(Math.cos(angh)*angr);
    let cpy = cy + parseInt(Math.sin(angh)*angr);
    cpxpoint.push(cpx);
    cpypoint.push(cpy);
  }
  let start = 1;
 
  console.log(cpxpoint);
  console.log(cpypoint);
  for (var i = 0; i < 4 ; i ++) {
    if (i===0){
      path.push(cx+rx);
      path.push(140);
      path.push(cpxpoint[(i)%4]);
      path.push(cpypoint[(i)%4]);
      let pathx = (cpxpoint[i%4]+cpxpoint[(i+1)%4])/2;
      let pathy = (cpypoint[i%4]+cpypoint[(i+1)%4])/2;
      path.push(pathx);
      path.push(pathy);
    }
    if(i===1){
      let pathx = (cpxpoint[i%4]+cpxpoint[(i+1)%4])/2;
      let pathy = (cpypoint[i%4]+cpypoint[(i+1)%4])/2;
      path.push(pathx);
      path.push(pathy);
    }
    if(i===2){
      path.push(cx-rx);
      path.push(140);
    }
    if(i===3){

    }
  }

  return path;
}