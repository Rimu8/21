import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getDatabase, ref, onValue, update, set, get } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

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
    
    const adminRows = document.getElementById('admin-rows');
    const velasRef = ref(db, 'velas');

    // 1. Asegurarnos de que existan los 10 datos en Firebase
    get(velasRef).then((snapshot) => {
        if (!snapshot.exists()) {
            const estadoInicial = {};
            for(let i=1; i<=10; i++) {
                estadoInicial[i] = { apagada: false, deseo: "" };
            }
            set(velasRef, estadoInicial);
        }
    });

    // 2. Crear las filas de control
    for(let i=1; i<=10; i++) {
        const row = document.createElement('div');
        row.className = 'admin-vela-row';
        row.innerHTML = `
            <span>Vela ${i}</span>
            <input type="text" id="input-deseo-${i}" placeholder="Escribe el deseo cumplido">
            <button id="btn-vela-${i}" class="btn-apagar">Apagar</button>
        `;
        adminRows.appendChild(row);

        // Actualizar Firebase al hacer clic
        document.getElementById(`btn-vela-${i}`).addEventListener('click', () => {
            const btn = document.getElementById(`btn-vela-${i}`);
            const estaApagada = btn.textContent === 'Encender'; // Si dice "Encender" es porque actualmente está apagada
            const textoDeseo = document.getElementById(`input-deseo-${i}`).value;
            
            update(ref(db, `velas/${i}`), {
                apagada: !estaApagada,
                deseo: textoDeseo
            });
        });
    }

    // 3. Escuchar Firebase para actualizar los botones visualmente en tu panel
    onValue(velasRef, (snapshot) => {
        const data = snapshot.val();
        if(data) {
            for(let i=1; i<=10; i++) {
                const velaData = data[i];
                if(velaData) {
                    const btn = document.getElementById(`btn-vela-${i}`);
                    const input = document.getElementById(`input-deseo-${i}`);
                    
                    if(btn) {
                        btn.textContent = velaData.apagada ? 'Encender' : 'Apagar';
                        btn.className = velaData.apagada ? 'btn-encender' : 'btn-apagar';
                    }
                    if(input && document.activeElement !== input) {
                        input.value = velaData.deseo || '';
                    }
                }
            }
        }
    });
});