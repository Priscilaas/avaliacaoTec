
    //validação do CPF
    function validarCPF(cpf){
        console.log(cpf);
        var filtro = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/;
        
        if(!filtro.test(cpf)){
            window.alert("CPF inválido. Por favor corrija.");
            return false;
        }
        
        cpf = remove(cpf, ".");
        cpf = remove(cpf, "-");
        
        if(cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" ||
        cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" ||
        cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
        cpf == "88888888888" || cpf == "99999999999"){
            window.alert("CPF inválido. Por favor corrija.");
            return false;
        }
        
        soma = 0;
        for(i = 0; i < 9; i++){
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        
        resto = 11 - (soma % 11);
        if(resto == 10 || resto == 11){
            resto = 0;
        }
        if(resto != parseInt(cpf.charAt(9))){
            window.alert("CPF inválido. Por favor corrija.");
            return false;
        }
        
        soma = 0;
        for(i = 0; i < 10; i ++){
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        if(resto == 10 || resto == 11){
            resto = 0;
        }
        
        if(resto != parseInt(cpf.charAt(10))){
            window.alert("CPF inválido. Por favor corrija.");
            this.value = ""
            return false;
        }
            return true;
        }
        
        function remove(str, sub) {
            i = str.indexOf(sub);
            r = "";
        if (i == -1) return str;{
            r += str.substring(0,i) + remove(str.substring(i + sub.length), sub);
        }
            return r;
        }
        
        function mascara(o,f){
            v_obj=o
            v_fun=f
            setTimeout("execmascara()",1)
        }
        
        function execmascara(){
            v_obj.value=v_fun(v_obj.value)
        }
        
        function cpf_mask(v){
            v=v.replace(/\D/g,"") //Remove tudo o que não é dígito
            v=v.replace(/(\d)(\d)/,"$1.$2") //Coloca ponto entre o terceiro e o quarto dígitos
            v=v.replace(/(\d)(\d)/,"$1.$2") //Coloca ponto entre o setimo e o oitava dígitos
            v=v.replace(/(\d)(\d)/,"$1-$2") //Coloca ponto entre o decimoprimeiro e o decimosegundo dígitos
            return v
        }

    //Máscara Telefone
    function mascara(o,f){
        v_obj=o
        v_fun=f
        setTimeout("execmascara()",1)
    }
    function execmascara(){
        v_obj.value=v_fun(v_obj.value)
    }
    function mtel(v){
        v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
        v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
        return v;
    }
    function id( el ){
        return document.getElementById( el );
    }
    window.onload = function(){
        id('telefone').onkeyup = function(){
            mascara( this, mtel );
        }
    }

    //Validação do cep
    function limpa_formulário_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('ilogr').value=("");
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('ilogr').value=(conteudo.logradouro);
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }
        
    function pesquisacep(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('ilogr').value="...";
               
                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    };

    //Estados - cidades
    function montaCidade(estado, pais){
        $.ajax({
            type:'GET',
            url:'http://api.londrinaweb.com.br/PUC/Cidades/'+estado+'/'+pais+'/0/10000',
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            async:false
        }).done(function(response){
            cidades='';
    
            $.each(response, function(c, cidade){
    
                cidades+='<option value="'+cidade+'">'+cidade+'</option>';
    
            });
    
            // PREENCHE AS CIDADES DE ACORDO COM O ESTADO
            $('#cidade').html(cidades);
    
        });
    }
    
    function montaUF(pais){
        $.ajax({
            type:'GET',
            url:'http://api.londrinaweb.com.br/PUC/Estados/'+pais+'/0/10000',
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",
            async:false
        }).done(function(response){
            estados='';
            $.each(response, function(e, estado){
    
                estados+='<option value="'+estado.UF+'">'+estado.Estado+'</option>';
    
            });
    
            // PREENCHE OS ESTADOS BRASILEIROS
            $('#estado').html(estados);
    
            // CHAMA A FUNÇÃO QUE PREENCHE AS CIDADES DE ACORDO COM O ESTADO
            montaCidade($('#estado').val(), pais);
    
            // VERIFICA A MUDANÇA NO VALOR DO CAMPO ESTADO E ATUALIZA AS CIDADES
            $('#estado').change(function(){
                montaCidade($(this).val(), pais);
            });
    
        });
    }
    
    montaUF('BR');
    
    // Máscara Monetária
    function converteDinheiro(a, e, r, t) {

        if(a.value.replace(/[^\d]/g, '').length > a.getAttribute("maxlength")-1)
         return
     
        let n = ""
          , h = j = 0
          , u = tamanho2 = 0
          , l = ajd2 = ""
          , o = window.Event ? t.which : t.keyCode;
        if (13 == o || 8 == o)
            return !0;
        if (n = String.fromCharCode(o),
        -1 == "0123456789".indexOf(n))
            return !1;
        for (u = a.value.length,
        h = 0; h < u && ("0" == a.value.charAt(h) || a.value.charAt(h) == r); h++)
            ;
        for (l = ""; h < u; h++)
            -1 != "0123456789".indexOf(a.value.charAt(h)) && (l += a.value.charAt(h));
        if (l += n,
        0 == (u = l.length) && (a.value = ""),
        1 == u && (a.value = "0" + r + "0" + l),
        2 == u && (a.value = "0" + r + l),
        u > 2) {
            for (ajd2 = "",
            j = 0,
            h = u - 3; h >= 0; h--)
                3 == j && (ajd2 += e,
                j = 0),
                ajd2 += l.charAt(h),
                j++;
            for (a.value = "",
            tamanho2 = ajd2.length,
            h = tamanho2 - 1; h >= 0; h--)
                a.value += ajd2.charAt(h);
            a.value += r + l.substr(u - 2, u)
            
        }
        return !1
     }
    

    // Mostrar Categoria da Habilitação
    function mostraCategoria(){
        if (document.getElementById('ihabsim').checked) {
            document.getElementById('categoria').style.display = 'block';
        } else {
            document.getElementById('categoria').style.display = 'none';
        }
    }


    //Somatório semanal de horas
    function calcularChTotal(){
        let seg = parseInt(document.getElementById('isegCh').value);
        let ter = parseInt(document.getElementById('iterCh').value);
        let qua = parseInt(document.getElementById('iquaCh').value);
        let qui = parseInt(document.getElementById('iquiCh').value);
        let sex = parseInt(document.getElementById('isexCh').value);

        let sum = (seg + ter + qua + qui + sex);
        

        document.getElementById('itotal').value = sum;
        if(sum<20){
            alert('A carga horária está inferior a 20h');
        }else if(sum>40){
            alert('A carga horária está superior a 40h');
        }
    }

    //Somatório de Carga Horária

    $(document).ready(function(){
   
        var totalGlob = 0
        var descGlob = 0

        $('.calc').on('keyup change', function() {
            var total = 0;
            $(this).parents('tr').find('input.calc').each(function(){
                var val = parseInt($(this).val());
                
                if(!isNaN(val)) {
                    total = Math.abs(total - parseInt(val));
                }
            });
            $(this).parents('tr').find('input.total').val(total);
            totalGlob = total;
            if(descGlob > 0){
                $(this).parents('tr').find('input.total').val(total - descGlob);
            }
        });

        $('.desc').on('keyup change', function() {
            var desc = 0;
            $(this).parents('tr').find('input.desc').each(function(){
                var val = parseInt($(this).val());
                if(!isNaN(val)) {
                    desc += parseInt(val);
                }
            });
            var bum = totalGlob - desc;
            descGlob = desc
            $(this).parents('tr').find('input.total').val(bum);
        });
        
    });
    
    