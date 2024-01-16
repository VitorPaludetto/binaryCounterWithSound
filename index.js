// Tempo base dos intervals definidos para incremento da contagem e sequência de áudio
const BASETIME = 250;

// Definição da sequência de notas que serão tocadas
const notes = [
  null,
  'e3',
  'b3',
  'd4',
  'e4',
  'b4',
  'd5',
  'e5',
  'b5',
  'd6',
  'e6',
  'b6',
  'd7',
  'e7',
  'b7',
  'd8',
];

// Cria um synth e conecta á saída de áudio
const synth = new Tone.AMSynth(Tone.Synth).toDestination();
// Cria uma sequência de notas
const synthSeq = new Tone.Sequence(
  function (time, note) {
    synth.triggerAttackRelease(note, 0.1, time);
  },
  notes,
  BASETIME / 1000
);
synthSeq.start();

const counter = document.querySelector('.counter');
const button = document.querySelector('.btn');

// Valor inicial do contador convertido para number
let counterNumber = Number(counter.textContent);

let intervalID;

// Função que pause e "resume" o counter, além de mudar o nome do botão
function playPause() {
  if (button.innerHTML == 'Play') {
    intervalID = setInterval(() => {
      updateCounterBinary();
    }, BASETIME);
    button.innerHTML = 'Reset';
    // Inicia áudio
    Tone.Transport.start();
  } else {
    // Reseta o timer, limpa o número na tela e para o áudio imediatamente
    clearInterval(intervalID);
    button.innerHTML = 'Play';
    counterNumber = 0;
    updateView();
    Tone.Transport.stop();
  }
}

// Listener de click do botão
button.addEventListener('click', playPause);

// Atualiza textContent do counter com a conversão do número atual em binário
function updateView() {
  counter.textContent = counterNumber.toString(2).padStart(4, '0');
}

// Incrementa o contador principal
function updateCounterBinary() {
  if (counterNumber == 15) {
    counterNumber = 0;
  } else {
    counterNumber += 1;
  }

  updateView();
}
