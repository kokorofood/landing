$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
    $("div#tipoCachorro").hide();
    $("div#tipoAdulto").hide();
    $("div#tipoGato").hide();
    $("div#tipoAyuda").hide();

    $("#selCachorro").click(function () {
        $("#selCachorro").addClass("active");
        $("#selAdulto").removeClass("active");
        $("#selGato").removeClass("active");
        $("div#tipoCachorro").show();
        $("div#tipoAdulto").hide();
        $("div#tipoGato").hide();
        $("div#tipoAyuda").hide();

        $("#infoCajaPerro").show();
        $("#infoCajaGato").hide();
    });

    $("#selAdulto").click(function () {
        $("#selAdulto").addClass("active");
        $("#selCachorro").removeClass("active");
        $("#selGato").removeClass("active");
        $("div#tipoAdulto").show();
        $("div#tipoCachorro").hide();
        $("div#tipoGato").hide();
        $("div#tipoAyuda").hide();

        $("#infoCajaPerro").show();
        $("#infoCajaGato").hide();
    }).click();

    $("#selGato").click(function () {
        $("#selGato").addClass("active");
        $("#selAdulto").removeClass("active");
        $("#selCachorro").removeClass("active");
        $("div#tipoAdulto").hide();
        $("div#tipoCachorro").hide();
        $("div#tipoGato").show();
        $("div#tipoAyuda").hide();

        $("#infoCajaPerro").hide();
        $("#infoCajaGato").show();
    });

    $('#formCachorro').on('submit', function (e) {
        e.preventDefault();
        var pesoCachorro = $("#pesoCachorro").val() * 1000; // Convierto Kilos a gramos
        var mesesVida = $("#mesesCachorro").val();
        switch (mesesVida) {
            case "2":
                var porcion = (pesoCachorro / 100) * 10;
                break;
            case "4":
                var porcion = (pesoCachorro / 100) * 8;
                break;
            case "6":
                var porcion = (pesoCachorro / 100) * 6;
                break;
            case "8":
                var porcion = (pesoCachorro / 100) * 4;
                break;
            case "10":
                var porcion = (pesoCachorro / 100) * 3;
                break;
        }

        var resultadoCachorro = (porcion > 15) ? porcion : 15;
        $("#resultadoCachorro").html(Math.ceil(resultadoCachorro) + " Gramos");

        var resultadoCantidadSemana = resultadoCachorro * 7;
        $("#resultadoCantidadSemana").html(separadorMiles(Math.round(resultadoCantidadSemana)) + " Gramos (" + (resultadoCantidadSemana / 1000).toFixed(1) + " Kilos)");

        var resultadoCajasSemana = resultadoCantidadSemana / 3500;
        $("#resultadoCajasSemana").html(Math.ceil(resultadoCajasSemana) + " Cajas");

        var resultadoValorSemana = Math.ceil(resultadoCajasSemana) * 17000;
        $("#resultadoValorSemana").html("$" + resultadoValorSemana + " Semanales");

        var resultadoCantidadMes = resultadoCachorro * 30;
        $("#resultadoCantidadMes").html(Math.round(resultadoCantidadMes) + " Gramos (" + (resultadoCantidadMes / 1000).toFixed(1) + " Kilos)");

        var resultadoCajasMes = Math.ceil(resultadoCantidadMes / 3500);
        var costoCajasMes = resultadoCajasMes*17000;
        $("#resultadoCajasMes").html(resultadoCajasMes + " Cajas");

        var descuento=0;
        if (resultadoCajasMes==3) descuento = 0.05;
        else if (resultadoCajasMes>=4 && resultadoCajasMes<=5) descuento = 0.1;
        else if (resultadoCajasMes>=6) descuento = 0.15;

        $("#descuento").html("$" +  separadorMiles(costoCajasMes*descuento) +" ("+descuento*100+"%)");

        $("#resultadoValorMes").html("$" + separadorMiles(costoCajasMes*(1-descuento)));

        var resultadoCaja = 3500 / resultadoCachorro;
        $("#duracionCaja").html(Math.ceil(resultadoCaja) + " días");

        var resultadoTotal = (resultadoCajasMes * 3500) / resultadoCachorro;
        $("#duracionTotal").html(Math.ceil(resultadoTotal) + " días");

        $("#alertCachorro").effect("highlight");
        $("div#tipoAyuda").show();
    });

    $('#formAdulto').on('submit', function (e) {
        e.preventDefault();
        var pesoAdulto = $("#pesoAdulto").val() * 1000,
            fisicoPerro = $("#ddlAdultoFisica").val(),
            factorAlto = 0.03,
            factorMedio = 0.025;

        if (pesoAdulto < 5000){
            factorAlto = 0.04;
            factorMedio = 0.035;
        }
        else if (pesoAdulto > 25000){
            factorAlto = 0.025;
            factorMedio = 0.02;
        }
        switch (fisicoPerro) {
            case "2":
                var fisicoPerro = pesoAdulto * factorMedio;
                break;
            case "3":
                var fisicoPerro = pesoAdulto  * factorAlto;
                break;
        }
        //50 gramos extra
        var resultadoAdulto = (fisicoPerro > 15) ? (fisicoPerro+50) : 15;
        $("#resultadoAdulto").html(separadorMiles(Math.ceil(resultadoAdulto)) + " Gramos");

        var resultadoCantidadMes = resultadoAdulto * 30;
        $("#resultadoCantidadMes").html(separadorMiles(Math.round(resultadoCantidadMes)) + " Gramos (" + (resultadoCantidadMes / 1000).toFixed(1) + " Kilos)");

        var resultadoCajasMes = Math.ceil(resultadoCantidadMes / 3500);
        var costoCajasMes = resultadoCajasMes*17000;
        $("#resultadoCajasMes").html(resultadoCajasMes + " Cajas");

        var descuento=0;
        if (resultadoCajasMes==3) descuento = 0.05;
        else if (resultadoCajasMes>=4 && resultadoCajasMes<=5) descuento = 0.1;
        else if (resultadoCajasMes>=6) descuento = 0.15;

        $("#descuento").html("$" +  separadorMiles(costoCajasMes*descuento) +" ("+descuento*100+"%)");

        $("#resultadoValorMes").html("$" +  separadorMiles(costoCajasMes*(1-descuento)));

        var resultadoCaja = 3500 / resultadoAdulto;
        $("#duracionCaja").html(Math.ceil(resultadoCaja) + " días");

        var resultadoTotal = (resultadoCajasMes * 3500) / resultadoAdulto;
        $("#duracionTotal").html(Math.ceil(resultadoTotal) + " días");

        $("#alertAdulto").effect("highlight");
        $("div#tipoAyuda").show();
    });


    $('#formGato').on('submit', function (e) {
        e.preventDefault();
        var peso = $("#pesoGato").val() * 1000;
        var actividad = $("#actividadGato").val();
        var cantidadDiariaGramos = 0;
        switch (actividad) {
            case "indoor":
                var cantidadDiariaGramos = peso * 0.03;
                break;
            case "outdoor":
                var cantidadDiariaGramos = peso * 0.04;
                break;
        }

        var cantidadDiariaGramos = (cantidadDiariaGramos > 15) ? cantidadDiariaGramos : 15;
        $("#resultadoGato").html(Math.ceil(cantidadDiariaGramos) + " Gramos");

        var resultadoCantidadMes = cantidadDiariaGramos * 30;
        $("#resultadoCantidadMes").html(Math.round(resultadoCantidadMes) + " Gramos (" + (resultadoCantidadMes / 1000).toFixed(1) + " Kilos)");

        var resultadoCajasMes = Math.ceil(resultadoCantidadMes / 3600);
        var costoCajasMes = resultadoCajasMes*23000;
        $("#resultadoCajasMes").html(resultadoCajasMes + " Cajas");

        var descuento=0;
        if (resultadoCajasMes>=2) descuento = 0.05;

        $("#descuento").html("$" +  separadorMiles(costoCajasMes*descuento) +" ("+descuento*100+"%)");

        $("#resultadoValorMes").html("$" + separadorMiles(costoCajasMes*(1-descuento)) );

        var duracionUnaCaja = Math.ceil(3600 / cantidadDiariaGramos);
        $("#duracionCaja").html(duracionUnaCaja + " días");

        var resultadoTotal = Math.ceil(resultadoCajasMes * 3600 / cantidadDiariaGramos);
        $("#duracionTotal").html(resultadoTotal + " días");

        $("#alertGato").effect("highlight");
        $("div#tipoAyuda").show();
    });

    function calculaValorCachorro(porcion) {
        var respuesta = "-1";
        if (porcion < 50) {
            respuesta = 50;
        } else {
            respuesta = porcion;
        }

        return respuesta;
    }

    function separadorMiles(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(".");
    }

});
