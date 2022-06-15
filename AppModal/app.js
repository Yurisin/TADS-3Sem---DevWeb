var Produtos = null;
var Produto = null;

function NewProduto() {
	return {
		Codigo: null,
		Descricao: ''		
	};
}

function validarProduto(){
	if ($("#ovTXT_Codigo").val() === "") {
		$("#ovTXT_Codigo").focus();
		return false;
	}   
	
	if ($("#ovTXT_Descricao").val() === "") {
		$("#ovTXT_Descricao").focus();
		return false;
	}
	
	return true;
}

function salvar(){
	if (!validarProduto())
		return;
	
	Produto.Codigo = $("#ovTXT_Codigo").val();
	Produto.Descricao = $("#ovTXT_Descricao").val();	
	
	var produtoExiste = Produtos.filter(function (prod){
		return prod.Codigo == Produto.Codigo;
	}).length > 0;
	
	if (produtoExiste)
		Produtos.map(function(index, prod){
			if (prod.Codigo == Produto.Codigo)
				prod.Descricao = Produto.Descricao;
		});
	else 	
		Produtos.push(Produto);
	
	$("#modal-cadastro").modal("hide");
	carregarProdutos();
}

function carregarProdutos(){
	$("#ovTR_Dados tbody").html("");
	Produtos.map(function (prod, index){
		let buttons = "<button type='button'" +
		              "        class='btn btn-editar btn-xs btn-secondary'" +
                      "        data-codigoproduto='" + prod.Codigo + "'" +
					  "><i class=\"fa fa-edit\"></i> Editar</button>" + 
					  "<button type='button'" +
		              "        class='btn btn-remover btn-xs btn-danger'" +
					  "        data-codigoproduto='" + prod.Codigo + "'" +
					  "><i class=\"fa fa-trash\"></i> Remover</button>";
		let line = "<tr>" +
						"<td>" + prod.Codigo + "</td>" +
						"<td>" + prod.Descricao + "</td>" +
						"<td class=\"pull-right\">" + buttons + "</td>" +
				   "</tr>";
		$("#ovTR_Dados tbody").append(line);
	});
    addEventEditar();
	addEventRemover();
}

function remover(codigoProduto){
   var ProdEncontrado = Produtos.filter(function (prod, index) {
		return prod.Codigo == codigoProduto;
	})[0];

	if (!confirm("Deseja remover o produto " 
                  + ProdEncontrado.Descricao +"?"))
		return;

	Produtos = Produtos.filter(function(prod, index){
		return prod.Codigo != codigoProduto;
	});
	carregarProdutos();
}

function addProduto(){	
	Produto = NewProduto();	
	$("#ovTXT_Codigo").val(Produto.Codigo);
	$("#ovTXT_Descricao").val(Produto.Descricao);	
	$("#modal-cadastro").modal("show");
}

$(document).ready(function() {
	Produtos = [];
	
	$(document).on("click", "#ovBTN_Adicionar", addProduto);
	$(document).on("click", "#ovBTN_Salvar", salvar);

	addEventEditar();
	addEventRemover();
});

function editar(codigoProduto) {
    Produto = Produtos.filter(function(prod, index){
		return prod.Codigo == codigoProduto;
    })[0];

    $("#ovTXT_Codigo").val(Produto.Codigo);
    $("#ovTXT_Descricao").val(Produto.Descricao);
    $("#modal-cadastro").modal("show");
}

function addEventEditar() {
	$(".btn-editar").each(function (indice, btn) {
		$(btn).on("click", function () {
			var codigoProduto = $(this).data("codigoproduto");
			editar(codigoProduto);
        });
    });
}

function addEventRemover() {
	$(".btn-remover").each(function (indice, btn) {
		$(btn).on("click", function () {
			var codigoProduto = $(this).data("codigoproduto");
			remover(codigoProduto);
		});
	});
}