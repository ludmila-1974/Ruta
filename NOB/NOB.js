let teQueresMatar, vamosNOB;
let fondoInicio, vInicio, mInicio, fondoCombi, personajeV, personajeM, relleno, perderV, ganar, perder, envase, brazosV, brazosM, mGrande, vGrande;
let img = [];
let tRuta, movX, movY, sube;
let pasos, time, tFinal;
let posY, posX, dirX;
let glist = [];
let env;


function setup() {
  createCanvas(933, 700, P2D);
  colorMode(HSB, 100);
  frameRate(26);


  //--------------------------------------------
  //CARGA DE AUDIOS

  soundFormats('ogg', 'mp3');
  teQueresMatar = loadSound('TeQueresMatar.mp3');
  vamosNOB = loadSound('VamosNOB.mp3');


  //--------------------------------------------
  //CARGA DE IMAGENES
  //INICIO
  fondoInicio=loadImage("inicio_fondo_2.png");
  vInicio=loadImage("inicio_varon_2.png");
  mInicio=loadImage("inicio_mujer_2.png");
  vGrande=loadImage("inicio_varon_grande.png");
  mGrande=loadImage("inicio_mujer_grande.png");
  //PASO1
  fondoCombi = loadImage("fondo_2.png");
  personajeV = loadImage("personaje_hueco_3.png");
  personajeM = loadImage("personaje_hueca_3.png");
  brazosV = loadImage("brazosV.png");
  brazosM = loadImage("brazosM.png");
  relleno = loadImage("personaje_relleno_2.png");
  perderV = loadImage("perder_2.png");
  envase = loadImage("vino.png");
  //GANAR
  ganar = loadImage("ganar.png");
  //PERDER
  perder = loadImage("perder.png");
  //RUTA
  img[0]=loadImage("ruta0002_2.png");
  img[1]=loadImage("ruta0003_2.png");
  img[2]=loadImage("ruta0004_2.png");
  img[3]=loadImage("ruta0005_2.png");
  img[4]=loadImage("ruta0006_2.png");
  img[5]=loadImage("ruta0007_2.png");
  img[6]=loadImage("ruta0008_2.png");
  img[7]=loadImage("ruta0009_2.png");
  img[8]=loadImage("ruta0010_2.png");
  img[9]=loadImage("ruta0011_2.png");
  img[10]=loadImage("ruta0012_2.png");
  img[11]=loadImage("ruta0013_2.png");
  img[12]=loadImage("ruta0014_2.png");
  img[13]=loadImage("ruta0015_2.png");

  //----------------------------------------
  //INICIO DE VARIABLES
  pasos = 0;
  env = new jarra();
  time = 0;
  posY = 0;
  posX = 0;
  tFinal = 900;
  tRuta = 0;
  movX = 0;
  movY = 0;
  dirX = 0;
}


function draw() {

  imageMode(CENTER);

  if (pasos === 0) {
    Inicio();
  }
  if (pasos === 1) {
    vPaso1();
  }
  if (pasos === 2) {
    mPaso1();
  }
  if (pasos === 3) {
    Perdiste();
  }
  if (pasos === 4) {
    Ganar();
  }
}

function touchStarted() {
  env.gira = 1;
}


function mouseClicked() {
  if (pasos === 3 && mouseX > 2*width/3 && mouseY > 2*height/3) {
    pasos = 0;
  } else if (pasos === 0 &&(mouseX> width/2)) {
    pasos = 1;
    vamosNOB.loop();
  } else if (pasos === 0 && (mouseX< width/2)) { 
    pasos = 2;
    vamosNOB.loop();
  }
}


//---------------------------------------------------------------------------------------------------
//---------------------------------------------------JARRA------------------------------------------
//---------------------------------------------------------------------------------------------------
class jarra {
  constructor() {
    this.alpha = PI/9;
    this.gira = 0;
    this.vuelca = false;
  }

  torcer() {
    push();
    translate(mouseX, mouseY);
    rotate(this.alpha);
    translate(-mouseX, -mouseY);
    image(envase, mouseX, mouseY);
    pop();
  }

  alphaUpdate() {
    if (this.gira == 1) {
      if (mouseIsPressed == true) {
        this.alpha += 0.025;
      } else if (mouseIsPressed == false) {
        this.alpha -= 0.025;
      }
    } else {
      this.alpha = PI/9;
    }
  }

  giraUpdate() {
    if (this.alpha > PI/9) {
      this.gira = 1;
    } else if (this.alpha < PI/9) { 
      this.gira = 0;
    }
  }

  verSiVuelca() {
    if (this.alpha > PI/6) {
      this.vuelca = true;
    } else {
      this.vuelca = false;
    }
  }
}


//---------------------------------------------------------------------------------------------------
//-----------------------------------------INICIO-GANAR-PERDER---------------------------------------
//---------------------------------------------------------------------------------------------------

function Inicio() {
  time = 0;
  env.gira = 0;
  env.alpha = PI/9;
  env.vuelca = false;
  set(0, 0, fondoInicio);
  if (mouseX > width/2 && mouseY > height/4) {
    image(vGrande, width/2, height/2);
    image(mInicio, width/2, height/2);
  } else if (mouseX < width/2 && mouseY > height/4) {
    image(mGrande, width/2, height/2);
    image(vInicio, width/2, height/2);
  } else {
    image(vInicio, width/2, height/2);
    image(mInicio, width/2, height/2);
  }
}


function Ganar() {
  set(0, 0, ganar);
}


function Perdiste() {
  set(0, 0, perder);
  glist.splice(0, glist.length);
}

//---------------------------------------------------------------------------------------------------
//-----------------------------------------------LIQUIDO---------------------------------------------
//---------------------------------------------------------------------------------------------------

class gota {

  constructor (xPos, yPos) {
    this.x = createVector(xPos, yPos);//distancia al origen
    this.v = createVector(env.alpha*3, 0);// velocidad
    this.a = createVector(0, 0.98*6);// aceleracion
    this.llego = false;
  }

  update() {
    this.v = this.v.add(this.a);
    this.x = this.x.add(this.v);
  }

  mostrar() {
    noStroke();
    fill(280, 100, 80, 100);
    ellipse(this.x.x, this.x.y, 6, 12 + (this.x.y - mouseY)*0.25);
  }

  run() {
    update();
    mostrar();
  }

  verSiLlego() {
    if (this.x.y + 6 + (this.x.y - mouseY)*0.125 > height*0.8 - posY) {
      this.llego = true;
    } else {
      this.llego = false;
    }
  }
} 


//------------------------------------------------------------------
//--------------------------HOMBRE----------------------------------
//------------------------------------------------------------------

function vPaso1() {

  //---------------------------------
  //-------------RUTA---------------
  //---------------------------------

  if (tRuta <52) {
    set(0, -35-int(posY), img[int(tRuta/4)]);
    tRuta +=1;
  } else if (tRuta === 52) {
    set(0, -35-int(posY), img[int(tRuta/4)]);
    tRuta =0;
  }

  //---------------------------------
  //----------MOVIMIENTO-------------
  //---------------------------------

  if (movY === 0) {
    if (random(100)>96) {    
      posY -= 4;
      movY  = 1;
      sube  = 1;
      glist.splice(glist.length-1, 1);
    } else {  
      posY = random(1)*3;
      movY = 0;
    }
  } else if (movY === 1) {
    if ((posY > -43) && (sube === 1)) {
      posY -= 5;
      movY  = 1;
      sube  = 1;
    } else if ((posY < -43) && (sube === 1)) {
      posY += 3;
      movY  = 1;
      sube  = 0;
    } else if ((posY < -2) && (sube === 0)) {        
      posY += 3;
      movY  = 1;
      sube  = 0;
    } else if ((posY >= -2) && (sube === 0)) {        
      posY += 3;
      movY  = 0;
      sube  = 0;
    }
  } 


  if (movX === 0) {
    if (random(100)>96) {    
      posX  = random(-1, 1)*2;
      movX  = 1;
      dirX  = posX/abs(posX);
    } else {  
      movX  = 0;
    }
  } else if (movX === 1) {
    if ((abs(posX) < 70) && (abs(posX) > 1.2)) {
      posX += 2*dirX;
      movX  = 1;
    } else if (abs(posX) > 70) {
      dirX  = - dirX;
      movX  = 1;
      posX += 2*dirX;
    } else if (abs(posX) < 1.2) {        
      posX  = 0;
      movX  = 0;
      dirX  = 0;
    }
  } 

  //---------------------------------
  //----------MOSTRACION-------------
  //---------------------------------

  image(perderV, width/2 + posX, height/2 + posY);
  image(fondoCombi, width/2, height/2);
  image(relleno, width/2 + posX, height/2 + posY);


  //---------------------------------
  //------------CARGA----------------
  //---------------------------------


  if (env.vuelca === true) {
    time += 1;
  }

  push();
  translate(width/2, height*(1-0.042)); //mueve el sistema de coordenadas al fondo de la jarra (centrado)
  noStroke();
  fill(350, 100, 70, 100);
  if (time > 10) {
    rect(-35 + posX, posY, 90, -time/(0.005*tFinal) + posY);
  } else {
    rect(-35 + posX, posY, 90, -time/(0.005*tFinal));
  }
  translate(-width/2, height*(1-0.042));
  pop();

  image(personajeV, width/2 + posX, height/2 + 31 + posY);



  //---------------------------------
  //----------JARRA-----------------
  //---------------------------------

  env.giraUpdate();
  env.alphaUpdate();
  env.verSiVuelca();

  //---------------------------------
  //----------LIQUIDO----------------
  //---------------------------------

  if (env.vuelca === true) {
    glist.push(new gota(mouseX + 30*cos(env.alpha)+60*sin(env.alpha), mouseY  + 30*sin(env.alpha) - 60*cos(env.alpha) + random(0, 5)));
  }


  //---------------------------------
  //------------GANAR----------------
  //---------------------------------
  if (time === tFinal) {
    vamosNOB.pause();
    teQueresMatar.loop();
    pasos = 4;
  }


  //---------------------------------
  //------------PERDER---------------
  //---------------------------------

  for (let i = glist.length-1; i >= 0; i--) {
    g=glist[i];
    g.update();
    g.verSiLlego();
    g.mostrar();
    if (g.llego === true) {
      glist.splice(i, 1);
    } else if (perderV.get(int(g.x.x - posX), int(g.x.y - posY))[0] >100) {
      vamosNOB.pause();
      pasos=3;
    }
  }
  image(brazosV, width/2 + posX, height/2  + posY);
  env.torcer();
}


//------------------------------------------------------------------
//--------------------------MUJER----------------------------------
//------------------------------------------------------------------

function mPaso1() {

  //---------------------------------
  //-------------RUTA---------------
  //---------------------------------

  if (tRuta <52) {
    set(0, -35-int(posY), img[int(tRuta/4)]);
    tRuta +=1;
  } else if (tRuta === 52) {
    set(0, -35-int(posY), img[int(tRuta/4)]);
    tRuta =0;
  }

  //---------------------------------
  //----------MOVIMIENTO-------------
  //---------------------------------

  if (movY === 0) {
    if (random(100)>96) {    
      posY -= 4;
      movY  = 1;
      sube  = 1;
      glist.splice(glist.length-1, 1);
    } else {  
      posY = random(1)*3;
      movY = 0;
    }
  } else if (movY === 1) {
    if ((posY > -43) && (sube === 1)) {
      posY -= 5;
      movY  = 1;
      sube  = 1;
    } else if ((posY < -43) && (sube === 1)) {
      posY += 3;
      movY  = 1;
      sube  = 0;
    } else if ((posY < -2) && (sube === 0)) {        
      posY += 3;
      movY  = 1;
      sube  = 0;
    } else if ((posY >= -2) && (sube === 0)) {        
      posY += 3;
      movY  = 0;
      sube  = 0;
    }
  } 


  if (movX === 0) {
    if (random(100)>96) {    
      posX  = random(-1, 1)*2;
      movX  = 1;
      dirX  = posX/abs(posX);
    } else {  
      movX  = 0;
    }
  } else if (movX === 1) {
    if ((abs(posX) < 70) && (abs(posX) > 1.2)) {
      posX += 2*dirX;
      movX  = 1;
    } else if (abs(posX) > 70) {
      dirX  = - dirX;
      movX  = 1;
      posX += 2*dirX;
    } else if (abs(posX) < 1.2) {        
      posX  = 0;
      movX  = 0;
      dirX  = 0;
    }
  } 

  //---------------------------------
  //----------MOSTRACION-------------
  //---------------------------------

  image(perderV, width/2 + posX, height/2 + posY);
  image(fondoCombi, width/2, height/2);
  image(relleno, width/2 + posX, height/2 + posY);


  //---------------------------------
  //------------CARGA----------------
  //---------------------------------


  if (env.vuelca === true) {
    time += 1;
  }

  push();
  translate(width/2, height*(1-0.042)); //mueve el sistema de coordenadas al fondo de la jarra (centrado)
  noStroke();
  fill(350, 100, 70, 100);
  if (time > 10) {
    rect(-35 + posX, posY, 90, -time/(0.005*tFinal) + posY);
  } else {
    rect(-35 + posX, posY, 90, -time/(0.005*tFinal));
  }
  translate(-width/2, height*(1-0.042));
  pop();

  image(personajeM, width/2 + posX, height/2 + 31 + posY);



  //---------------------------------
  //----------JARRA-----------------
  //---------------------------------

  env.giraUpdate();
  env.alphaUpdate();
  env.verSiVuelca();

  //---------------------------------
  //----------LIQUIDO----------------
  //---------------------------------

  if (env.vuelca === true) {
    glist.push(new gota(mouseX + 30*cos(env.alpha)+60*sin(env.alpha), mouseY  + 30*sin(env.alpha) - 60*cos(env.alpha) + random(0, 5)));
  }


  //---------------------------------
  //------------GANAR----------------
  //---------------------------------
  if (time === tFinal) {
    //vamosNOB.pause();
    //teQueresMatar.loop();
    pasos = 4;
  }


  //---------------------------------
  //------------PERDER---------------
  //---------------------------------

  for (let i = glist.length-1; i >= 0; i--) {
    g=glist[i];
    g.update();
    g.verSiLlego();
    g.mostrar();
    if (g.llego === true) {
      glist.splice(i, 1);
    } else if (perderV.get(int(g.x.x - posX), int(g.x.y - posY))[0] >100) {
      vamosNOB.pause();
      pasos=3;
    }
  }
  image(brazosM, width/2 + posX, height/2  + posY);
  env.torcer();
}
