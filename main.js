import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDBvCtswsUcqMGKCacC7TY3Ts60OEqVrcQ",
    authDomain: "cumple-anita-c6610.firebaseapp.com",
    projectId: "cumple-anita-c6610",
    storageBucket: "cumple-anita-c6610.firebasestorage.app",
    messagingSenderId: "369515638943",
    appId: "1:369515638943:web:8903498f7d1215f9e732aa"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {

    // 1. INICIALIZAR LAS 10 VELAS EN EL DOM
    const contenedorVelas = document.getElementById('contenedor-velas');
    contenedorVelas.innerHTML = '';
    
    let deseosGuardados = {}; 

    for(let i=1; i<=10; i++) {
        const velaDiv = document.createElement('div');
        velaDiv.id = `vela-${i}`;
        velaDiv.className = 'vela'; 
        velaDiv.innerHTML = `<div class="llama"></div><span>${i}</span>`;
        
        velaDiv.addEventListener('click', () => {
            if(!velaDiv.classList.contains('apagada')) {
                alert(`Vela #${i}: ¡Pide tu deseo en tu mente y avísame!`);
            } else {
                alert(`Vela #${i} apagada. Deseo cumplido: ${deseosGuardados[i] || 'Es un secreto 🤫'}`);
            }
        });
        contenedorVelas.appendChild(velaDiv);
    }

    // 2. SINCRONIZAR CON FIREBASE EN TIEMPO REAL
    const velasRef = ref(db, 'velas');
    onValue(velasRef, (snapshot) => {
        const data = snapshot.val();
        if(data) {
            for(let i=1; i<=10; i++) {
                const velaData = data[i];
                if(velaData) {
                    deseosGuardados[i] = velaData.deseo; 
                    const velaDiv = document.getElementById(`vela-${i}`);
                    if(velaData.apagada) {
                        velaDiv.classList.add('apagada');
                    } else {
                        velaDiv.classList.remove('apagada');
                    }
                }
            }
        }
    });

    // 3. LÓGICA POLAROID
    const polaroids = document.querySelectorAll('.polaroid-card');
    polaroids.forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('is-flipped'));
    });

    // ==========================================
    // 4. NUEVA BROMA: BORRADO DE RECUERDOS
    // ==========================================
    const btnSorpresa = document.getElementById('btn-sorpresa');
    const contenedoresFotos = document.querySelectorAll('.polaroid-container');

    if (btnSorpresa) {
        btnSorpresa.addEventListener('click', async () => {
            
            // 1. La pregunta trampa
            const respuesta = confirm("Para desbloquear tu regalo especial, debes responder con sinceridad:\n\n¿Aceptas que soy el mejor amigo de todo el universo?");
            
            // 2. La reacción según lo que responda
            if (respuesta) {
                alert("Respuesta aceptada... Validando datos en el sistema...");
                alert("¡ERROR 404! 🚨 Se ha detectado un nivel de cursilería extremadamente alto en esta página.");
            } else {
                alert("¿Ah no? 💔 Respuesta incorrecta. Modificando sistema por ingratitud.");
            }

            // 3. El susto
            alert("SISTEMA CORROMPIÉNDOSE...\n\nIniciando protocolo de 'Borrado de Recuerdos' de forma permanente.");

            // Deshabilitar el botón para que no lo presione de nuevo
            btnSorpresa.disabled = true;
            btnSorpresa.style.backgroundColor = "#555";
            btnSorpresa.textContent = "Borrando datos...";

            // Hacemos que la pantalla suba al inicio para que vea cómo se caen las fotos
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // 4. La animación: Caída en dominó (cada 0.6 segundos cae una)
            for (let i = 0; i < contenedoresFotos.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 600)); 
                contenedoresFotos[i].classList.add('caida-libre');
            }

            // 5. El remate (1.5 segundos después de que cayó la última foto)
            setTimeout(() => {
                alert("JAJAJAJAJAJAJJ \n\n¡Feliz cumpleaños, Anita! 🎉 Jamás borraría esto, te quiero mucho.\n\nSimplemente recarga la página para recuperar todo.");
                btnSorpresa.textContent = "Recarga la página 🔄";
            }, 1500);
        });
    }

});