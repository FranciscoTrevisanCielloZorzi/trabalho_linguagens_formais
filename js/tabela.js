function constroiLines() {
  for (var resultado = [], i = 0; i < estados1.length; i++) {
    var linha = [];
    linha.estado = i;
    for (var codeAZ = "a".charCodeAt(0); codeAZ <= "z".charCodeAt(0); codeAZ++) {
      var letra = String.fromCharCode(codeAZ);
      if (typeof estados1[i][letra] === 'undefined') {
        linha[letra] = "-";
      } else {
        linha[letra] = estados1[i][letra];
      }
    }
    if (typeof estados1[i].estado_final !== 'undefined') {
      linha.estado_final = true;
    }
    resultado.push(linha);
  }
  return resultado;
}

function insertTable() {
  for (var i = 0; i < grupo1.length; i++)
    for (
      var estadoAtual, proxEstado = 0, palavra = grupo1[i], j = 0;
      j < palavra.length;
      j++
    ) {
      if (typeof estados1[proxEstado][palavra[j]] === 'undefined') {
        estadoAtual = contador1 + 1;
        estados1[proxEstado][palavra[j]] = estadoAtual;
        estados1[estadoAtual] = [];
        contador1 = proxEstado = estadoAtual;
      } else {
        proxEstado = estados1[proxEstado][palavra[j]];
        if (j == palavra.length - 1) estados1[proxEstado].estado_final = true;
      }
    }
}

function constroiTable(a) {
  var tabela1 = $("#tabela1");
  tabela1.html("");

  var linhaHeader = $("<tr class=''>");
  var thInicial = $("<th>").html("-");
  linhaHeader.append(thInicial);

  for (var letraIni = "a", letraFim = "z", i = letraIni.charCodeAt(0); i <= letraFim.charCodeAt(0); i++) {
    var thLetra = $("<th>").html(String.fromCharCode(i));
    linhaHeader.append(thLetra);
  }

  tabela1.append(linhaHeader);

  for (var i = 0; i < a.length; i++) {
    var tr = $("<tr class='trestado'>");
    var tdEstado = $("<td>");

    if (a[i].estado_final) {
      tdEstado.html("q" + a[i].estado + "*");
    } else {
      tdEstado.html("q" + a[i].estado);
    }

    tr.append(tdEstado);
    tr.addClass("estado_" + a[i].estado);

    for (var j = "a".charCodeAt(0); j <= "z".charCodeAt(0); j++) {
      var letra = String.fromCharCode(j);
      var td = $("<td>").addClass("caracter_" + letra);
      if (a[i][letra] !== "-") {
        td.html("q" + a[i][letra]);
      }
      tr.append(td);
    }

    tabela1.append(tr);
  }
}

var estados1 = [[]];
var contador1 = 0;