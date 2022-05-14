var LARGURA_ANO = 120;//deve ser múltiplo de 12
var BACKGROUND_COLOR = "white";
var TEXT_COLOR = "black";
var TEXT_FONT = "12px Arial";


function gerarTimelineCanvas(idCanvas, anoInicial, anoFinal, itens){
	var canvas = document.getElementById(idCanvas);
	var qtdAnos = (anoFinal - anoInicial) + 1;
	var largura = qtdAnos * LARGURA_ANO;
	var altura = 50 + (itens.length * 60);
	
	canvas.width = largura;
	canvas.height = altura;
	var ctx = canvas.getContext("2d");
	
	ctx.fillStyle = BACKGROUND_COLOR;
	ctx.fillRect(0, 0, largura, altura);
	
	criarDivisaoDeAnos(ctx, qtdAnos, anoInicial, altura);
	
	inserirItens(ctx, anoInicial, itens);
	
}

function criarDivisaoDeAnos(ctx, qtdAnos, anoInicial, alturaCanvas){
	
	var px = 0;
	
	ctx.fillStyle = TEXT_COLOR;
	ctx.strokeStyle = "rgba(0,0,0,0.04)";
	
	for(i = 0; i < qtdAnos; i++){
		var px = px + LARGURA_ANO;

		ctx.moveTo(px, 0);
		ctx.lineTo(px, alturaCanvas);
		ctx.stroke();	

		ctx.textAlign = "center";
		ctx.font = TEXT_FONT;
		ctx.fillText((anoInicial + i), ((i * LARGURA_ANO) + 60), 20);
	}	
}


function inserirItens(ctx, anoInicioTimeline, itens){
	
	var contadorPy = 50;
	
	for(i = 0; i < itens.length; i++){
			ctx.fillStyle = itens[i][4];
			
			var mesInicial = itens[i][0].split("/")[0];
			var anoInicial = itens[i][0].split("/")[1];
			
			var mesFinal = itens[i][1] === "" ? mesInicial : itens[i][1].split("/")[0];
			var anoFinal = itens[i][1] === "" ? anoInicial : itens[i][1].split("/")[1];
			
			var px = ((anoInicial - anoInicioTimeline) * LARGURA_ANO) + ( (mesInicial - 1) * (LARGURA_ANO/12));
			var largura = (((anoFinal - anoInicioTimeline) * LARGURA_ANO) + (mesFinal * (LARGURA_ANO/12))) - px;
			
			var altura = 40;
			
			ctx.fillRect(px, contadorPy, largura, altura);
			
			ctx.fillStyle = TEXT_COLOR;		
			ctx.textAlign = "left";
			ctx.font = TEXT_FONT;
			ctx.fillText(itens[i][2], (px + 2 + (LARGURA_ANO/12)), (contadorPy + 18));
			ctx.fillText(itens[i][3].toUpperCase(), (px + 2 + (LARGURA_ANO/12)), (contadorPy + 33));

			contadorPy = contadorPy + altura + 20;
	}
}