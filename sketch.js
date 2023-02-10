const PRETO = 0

//Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//Velocidade da Bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variáveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

//Chance de errar
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("songs/trilha.mp3");
  ponto = loadSound("songs/ponto.mp3");
  raquetada = loadSound("songs/raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  if (random() > 0.5){
    velocidadeXBolinha = 5
  }
  else {
    velocidadeXBolinha = -5
  }

  if (random() > 0.5){
    velocidadeYBolinha = 5
  }
  else {
    velocidadeYBolinha = -5
  }
}

function draw() {
  background(PRETO);
  mostraBolinha();
  movimentoBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaquete();
  verificaColisaoRaquete();
  verificaColisaoRaqueteOponente();
  movimentoRaqueteOponente();
  incluiPlacar();
  marcaPontos();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentoBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaqueteOponente(){  
  if (xBolinha + raio > xRaqueteOponente + raqueteComprimento && yBolinha + raio < yRaqueteOponente + raqueteAltura && yBolinha + raio > yRaqueteOponente){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos){
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40
    }
  }
  else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
    }
  }
}

function movimentoRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function incluiPlacar(){
  textSize(16);
  textAlign(CENTER);
  fill(color(255, 140, 0))
  rect(180, 10, 40, 20);
  fill(255);
  text(meusPontos, 200, 26);
  fill(color(255, 140, 0))
  rect(380, 10, 40, 20);
  fill(255);
  text(pontosOponente, 400, 26);
}

function marcaPontos(){
  if (xBolinha > 595){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}