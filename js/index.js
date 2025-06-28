var grupo1 = [];
var estrutura1 = [];
var elemento1 = $(".palavra-digitada");
var entradaTexto1 = $(".campo1");
var campoValidacao1 = $("#campo2");

function acaoAdicionar1() {
  if ($(".campo1").val() > '') {
    grupo1.push(entradaTexto1.val());
    $('#container1').append('<div class="chip">' + $(".campo1").val() + '<i class="close material-icons">close</i></div> ');
    acaoTabela1();
    $(".campo1").val('');
  } else {
    Materialize.toast('O campo de palavra não pode estar em branco!', 3000, 'rounded')
  }
}

$('#campo2').keyup(function (e) {
  atualizaCores1();
});

function acaoTabela1() {
  insertTable();
  estrutura1 = constroiLines();
  constroiTable(estrutura1);

  $('#campo2').keyup(function (event) {
    if (estrutura1.length > 0) {
      atualizaCores1(event);
    }
  });
}

function atualizaCores1(event) {
  var campoTexto = $('#campo2').val();
  var linha = 0;

  atualizaEstiloInput1();

  for (var i = 0; i < campoTexto.length; i++) {
    if (campoTexto) {
      marcaTabela1(linha, campoTexto[i]);
      linha = estrutura1[linha][campoTexto[i]];
    }
  }
}

function atualizaEstiloInput1() {
  var campoTexto = $('#campo2').val();

  if (campoValidacao1.length == 1) {
    $('#tabela1 tr').removeClass('estado_selecionado');
    $('#tabela1 td').removeClass('letra_selecionada');
  }

  if (jQuery.inArray(campoTexto, grupo1) > -1) {
    campoValidacao1.addClass("estilo-ok");
    campoValidacao1.removeClass("estilo-erro");
  } else {
    campoValidacao1.addClass("estilo-erro");
    campoValidacao1.removeClass("estilo-ok");
  }
}

function marcaTabela1(linha, coluna) {
  $('#tabela1 tr').removeClass('linha-dest1');
  $('#tabela1 td').removeClass('celula-dest1');
  $('#tabela1 .estado_' + linha).addClass('linha-dest1');
  $('#tabela1 .caracter_' + coluna).addClass('celula-dest1');
}