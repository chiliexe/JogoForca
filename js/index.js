
const palavras = [
    {
        "palavra": "ergonomia",
        "dica": "norma que tem por objetivo a segurança e a prevenção de acidentes",
    },
    {
        "palavra": "flow rack",
        "dica": "estrutura que evita rupturas",
    },
    {
        "palavra": "porta palet",
        "dica": "estrutura muito comum em almoxarifados",
    },
    {
        "palavra": "patinha",
        "dica": "equipamento usado para transportar palets manualmente",
    },
    {
        "palavra": "empilhadeira manual",
        "dica": "carregam cargas unitizadas sobre eles",
    },
    {
        "palavra": "empilhadeira motorizada",
        "dica": "é utilizado em galpôes, pátios e portos, para elevar cargas",
    },
    {
        "palavra": "drive-in",
        "dica": "é utilizado para depositar ou depositar mercadoria",
    },
    {
        "palavra": "escada",
        "dica": "é utilizado para alcançar objetos",
    },
    {
        "palavra": "carrinho armazém",
        "dica": "é utilizado para movimentar cargas e embalagens médias",
    }
]

let jogando = true;
let ganhou = false;
let palavra = "";

const btns = document.querySelector(".opcoes");
palavras.forEach((v, i) => {
    let btnOpcoes = document.createElement('button');
    btnOpcoes.innerHTML=`Palavra ${i +1}`;
    btnOpcoes.className = `btn btn-primary ml-3 my-2`;
    btnOpcoes.setAttribute("value", `${i + 1}`);

    btns.appendChild(btnOpcoes);

});

const bts = document.querySelectorAll(".btn");
bts.forEach((v, i) => {
    v.addEventListener('click', (e) => {
        fillWords(e.target.value);
    })
})
const reset = () => {
    document.querySelector(".letras").innerHTML = "";
    document.querySelector(".dica").innerHTML = "";
    document.querySelector(".informacao").innerHTML = "";
    document.querySelector(".hidden").value = "";
    document.querySelector("span").innerHTML = "";
    document.querySelector('img').src = "images/imagem1.png";
}
const fillWords = (n) => {

    const nLetras = palavras[n - 1].palavra.split('');
    const letrasDiv = document.querySelector(".letras");

    reset();

    document.querySelector(".dica").innerHTML = palavras[n - 1].dica;
    document.querySelector(".informacao").innerHTML = palavras[n - 1].palavra.length + " LETRAS";

    nLetras.forEach((v, i) => {
        let letrasEl = document.createElement("input");
        letrasEl.type = "text";
        letrasEl.className = `text-uppercase inpt inpt${i + 1}`;
        document.querySelector(".hidden").value += v;
        letrasDiv.appendChild(letrasEl);
    });
}


var interval = setInterval(function() {
    let comparar = "";
    const palavraEscolhida = document.querySelector(".hidden").value;
    document.querySelectorAll(".inpt").forEach((v,i) => {
        comparar += v.value;
    })
    if(comparar == palavraEscolhida){
        alert("PARABÉNS!!!!!! VOCÊ É O VENCEDOR");
        clearInterval(interval);
    }
}, 1000);

const form = document.querySelector(".formulario");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkWord();
    

    document.querySelector("#letra").value = "";
});
var index = 0;

const ifDigitadoCompleto = (palavra) => {
    const palavraEscolhida = document.querySelector(".hidden").value;

    if(palavra == palavraEscolhida){
        var array = palavra.split('');
        array.forEach((letra, index) => {
            document.querySelector(`.inpt${index + 1}`).value = letra;
        })
    }else {
        alert("VOCÊ PERDEU!!!");
    }
}
const checkWord = () => {
    if(index == 6){
        alert("VOCÊ PERDEU!!! DESCULPA");
        return;
    }
    let qtdErros1 = 0;
    const palavraEscolhida = document.querySelector(".hidden").value;
    const digitado = document.querySelector("#letra").value;

    if(digitado.length > 1){
        ifDigitadoCompleto(digitado);
        return;
    }

    document.querySelector("span").innerHTML += " " + digitado + " ";
    palavraEscolhida.split('').forEach((v, i) => {
        if(v == digitado){
            document.querySelector(`.inpt${i + 1}`).value = v;
        }
        else{
            qtdErros1 += 1;
        }
        if(qtdErros1 == palavraEscolhida.length){
            index += 1;
            document.querySelector('img').src = `images/imagem${index + 1}.png`;
        }
    });
}
fillWords(1);
