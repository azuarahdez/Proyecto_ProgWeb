let queue = [];
let ticketCounter = 1;
let currentTurn = null;

const form = document.getElementById("registerForm");
const ticketNumber = document.getElementById("ticketNumber");
const queueList = document.getElementById("queue");
const currentTurnDisplay = document.getElementById("currentTurn");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const idSeguro = document.getElementById("idSeguro").value;

    const ticket = "A-" + String(ticketCounter).padStart(3,"0");

    const user = {
        nombre,
        idSeguro,
        ticket
    };

    queue.push(user);

    ticketNumber.innerText = ticket;
    ticketCounter++;

    updateQueue();

    form.reset();

    if(queue.length === 1){
        nextTurn();
    }
});

function updateQueue(){
    queueList.innerHTML = "";
    queue.forEach((user,index)=>{
        if(index !== 0){
            const li = document.createElement("li");
            li.innerHTML = `<span>${user.ticket}</span><span>${user.nombre}</span>`;
            queueList.appendChild(li);
        }
    });
}

function nextTurn(){
    if(queue.length > 0){
        currentTurn = queue[0];
        currentTurnDisplay.innerText = currentTurn.ticket;
    }else{
        currentTurnDisplay.innerText = "---";
    }
}

/* Simula avance automático de fila */
setInterval(()=>{
    if(queue.length > 0){
        queue.shift();
        nextTurn();
        updateQueue();
    }
},15000); // cada 15s avanza turno (simulación)
