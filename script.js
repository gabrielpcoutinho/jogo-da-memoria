// Array que armazena os dois últimos botões clicados
// Aqui guardamos o botão completo (elemento HTML), não apenas o valor
let board = [];
let mistakes = 0;
let lockBoard = false;

// Seleciona todos os botões do jogo
const cards = document.querySelectorAll('.btnBoard');

//chama a função que mostra os cards por 3 segundos
document.addEventListener('DOMContentLoaded', showCards)

//função para analisar todos os botões e checar se ele conseguiu descobrir todos os pares
function checkWinner() {
    const venceu = [...cards].every(btn => btn.classList.contains('revealed'));

    if (venceu) {
        setTimeout(() => {
            alert('Parabéns! Você ganhou!');
            reset();
        }, 300); // espera um pouco para o último clique aparecer
    }
}

//função para resetar os botões caso ele perca ou ganhe
function reset(){
    cards.forEach(btn =>{
        mistakes = 0
        location.reload(true) //refresh na página
    })
}

// Função que verifica se os dois botões clicados formam um par
function checkPair() {
    if (board.length === 2) {
        // Desestrutura os dois botões clicados
        const [card1, card2] = board;

        // Compara os valores dos data-value de cada botão
        const val1 = card1.dataset.value;
        const val2 = card2.dataset.value;

        if (val1 === val2) {
            setTimeout(()=>{
                // Espera 600ms para a animação de virar terminar
                card1.classList.add('pulse');
                card2.classList.add('pulse');

                //  Remove a classe pulse após a animação
                setTimeout(()=>{
                    card1.classList.remove('pulse');
                    card2.classList.remove('pulse');
                }, 500);
            }, 600);
            board = [];
            checkWinner();
        } else {
            lockBoard = true;
            // Não é par: espera 1 segundo e esconde os textos novamente
            setTimeout(() => {
                card1.classList.remove('revealed');
                card2.classList.remove('revealed');
                board = []; // Limpa o array para novos cliques
                lockBoard = false;
                alert("Tente outra vez!")
                mistakes += 1
                document.getElementById('mistakes').innerText = 'Erros: ' + mistakes
                if(mistakes === 10){
                    reset();
                }
            }, 1000);
        }
    }
}

// Adiciona o evento de clique a cada botão
cards.forEach(card => {
    card.addEventListener('click', () => {

        // Impede clicar em um botão já visível ou se já houver dois selecionados
        if (lockBoard || card.classList.contains('revealed') || board.length === 2) return;

        // Mostra o texto do botão removendo a classe que deixa invisível
        card.classList.add('revealed')

        // Adiciona o botão completo ao array (não apenas o valor)
        // Assim conseguimos acessá-lo depois para esconder novamente
        board.push(card);

        // Verifica se houve um par ou não
        checkPair();
    });
});


//função que mostra os cards por 3 segundos
function showCards(){
    setTimeout(() => {
        cards.forEach(card =>{
            card.classList.add('revealed')
        })
        // Depois de mais 3 segundos, desvira
        setTimeout(() => {
            cards.forEach(card => {
                card.classList.remove('revealed');
            });
        }, 3000);
    }, 1000)
}