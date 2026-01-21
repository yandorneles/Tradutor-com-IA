let inputTexto = document.querySelector(".inputTexto");
let traducaoTexto = document.querySelector(".traducao");
let selectIdiomaOrigem = document.querySelector(".idioma-origem");
let selectIdiomaDestino = document.querySelector(".idioma-destino");

async function traduzirTexto() {
    if (inputTexto.value.trim() === "") {
        traducaoTexto.innerText = "Por favor, digite algo para traduzir...";
        return;
    }

    let endereco = `https://api.mymemory.translated.net/get?q=` + inputTexto.value + "&langpair=" 
    + selectIdiomaOrigem.value + "|" + selectIdiomaDestino.value;

    let resposta = await fetch(endereco);
    let dados = await resposta.json();

    traducaoTexto.textContent = dados.responseData.translatedText;
    
}

function ouvirVoz() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert("Seu navegador não suporta reconhecimento de voz");
        return;
    }
    
    let reconhecimentoVoz = new SpeechRecognition();
    
    reconhecimentoVoz.lang = selectIdiomaOrigem.value;
    reconhecimentoVoz.continuous = false;
    reconhecimentoVoz.interimResults = false;
    
    reconhecimentoVoz.onresult = (evento) => {
        let textoTranscricao = "";

        for (let i = evento.resultIndex; i < evento.results.length; i++) {
            textoTranscricao += evento.results[i][0].transcript;
        }
        
        inputTexto.value = textoTranscricao;
        traduzirTexto();
    };
    
    reconhecimentoVoz.onerror = (evento) => {
        console.error("Erro no reconhecimento de voz:", evento.error);
        alert("Erro ao reconhecer a voz: " + evento.error);
    };
    
    reconhecimentoVoz.start();
}
