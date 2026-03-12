import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getDatabase, ref, onValue, get } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

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
    
    // Almacenamos los deseos localmente para mostrarlos en el alert
    let deseosGuardados = {}; 

    for(let i=1; i<=10; i++) {
        const velaDiv = document.createElement('div');
        velaDiv.id = `vela-${i}`;
        velaDiv.className = 'vela'; // Inicia encendida visualmente
        velaDiv.innerHTML = `<div class="llama"></div><span>${i}</span>`;
        
        velaDiv.addEventListener('click', () => {
            if(!velaDiv.classList.contains('apagada')) {
                alert(`Vela #${i}: ¡Pide tu deseo y avísame!`);
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
                    deseosGuardados[i] = velaData.deseo; // Guardamos el texto
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
    // 3. LÓGICA DEL TROLLEO HACKER (METASPLOIT REALISTA)
    // ==========================================
    const btnSorpresa = document.getElementById('btn-sorpresa');
    const terminal = document.getElementById('terminal-hacker');
    const textoTerminal = document.getElementById('texto-terminal');

    const lineasHackeo = [
        { text: "Linux kali-pwn 6.1.0-kali3-amd64 #1 SMP PREEMPT_RT Debian", type: "out", delay: 100 },
        { text: "Last login: Wed Mar 11 03:45:12 2026 from 192.168.1.104", type: "out", delay: 500 },
        { text: "root@kali:~# msfconsole -q", type: "cmd", delay: 800 },
        { text: "msf6 > use exploit/multi/handler", type: "cmd", delay: 500 },
        { text: "msf6 exploit(multi/handler) > set payload android/meterpreter/reverse_tcp", type: "cmd", delay: 300 },
        { text: "payload => android/meterpreter/reverse_tcp", type: "out", delay: 100 },
        { text: "msf6 exploit(multi/handler) > exploit -j", type: "cmd", delay: 500 },
        { text: "[*] Started reverse TCP handler on 10.0.0.5:4444", type: "out", delay: 200 },
        { text: "[*] Meterpreter session 1 opened (10.0.0.5:4444 -> 181.189.23.45:49153)", type: "out", delay: 600 },
        { text: "meterpreter > sysinfo", type: "cmd", delay: 500 },
        { text: "Computer        : ANITA-DEVICE", type: "out", delay: 50 },
        { text: "OS              : Android 14 / Windows NT", type: "out", delay: 50 },
        { text: "Logged On Users : 1", type: "out", delay: 300 },
        { text: "meterpreter > cd /storage/emulated/0/WhatsApp/Databases", type: "cmd", delay: 800 },
        { text: "meterpreter > ls", type: "cmd", delay: 400 },
        { text: "100666/rw-rw-rw-  14096000  fil   msgstore.db.crypt14", type: "out", delay: 50 },
        { text: "100666/rw-rw-rw-  4096      fil   wa.db", type: "out", delay: 500 },
        { text: "meterpreter > download msgstore.db.crypt14", type: "cmd", delay: 800 },
        { text: "[*] Downloading WhatsApp Database...", type: "out", delay: 800 },
        { text: "[!] INICIANDO VOLCADO DE MEMORIA EN CRUDO...", type: "out", delay: 1000 }
    ];

    const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const generarHex = () => {
        let hex = '';
        for(let i=0; i<8; i++) {
            hex += Math.random().toString(16).substr(2, 8).toUpperCase() + " ";
        }
        return hex;
    };

    if (btnSorpresa) {
        btnSorpresa.addEventListener('click', async () => {
            terminal.classList.remove('oculto');
            textoTerminal.innerHTML = ""; 
            const cursor = document.createElement('span');
            cursor.classList.add('cursor-parpadeante');
            
            for (let i = 0; i < lineasHackeo.length; i++) {
                const linea = lineasHackeo[i];
                const p = document.createElement('p');
                p.classList.add('linea-codigo');
                textoTerminal.appendChild(p);

                if (linea.type === 'cmd') {
                    for(let c = 0; c < linea.text.length; c++) {
                        p.textContent += linea.text[c];
                        textoTerminal.appendChild(cursor);
                        await esperar(20 + Math.random() * 30); 
                    }
                } else {
                    p.textContent = linea.text;
                    if(linea.text.includes("[!]")) p.style.color = "#ff3333"; 
                    textoTerminal.appendChild(cursor);
                }
                terminal.scrollTop = terminal.scrollHeight;
                await esperar(linea.delay);
            }

            for(let i = 0; i < 300; i++) {
                const p = document.createElement('p');
                p.classList.add('linea-codigo');
                p.style.opacity = "0.8"; 
                p.textContent = `[0x${Math.floor(Math.random()*99999).toString(16).toUpperCase().padStart(5, '0')}] ${generarHex()}`;
                textoTerminal.appendChild(p);
                terminal.scrollTop = terminal.scrollHeight;
                await esperar(Math.random() * 10 + 5); 
            }

            const mensajesFinales = [
                { text: "[*] Database downloaded successfully (14.09 MB)", delay: 800 },
                { text: "[*] Decrypting keys... [OK]", delay: 400 },
                { text: "meterpreter > webcam_snap -i 1 -v false", delay: 800 }, 
                { text: "[*] Starting webcam...", delay: 1000 },
                { text: "[*] Uploading snapshot to external server [192.168.1.77]...", delay: 1500 }
            ];

            for (let msg of mensajesFinales) {
                const p = document.createElement('p');
                p.classList.add('linea-codigo');
                p.textContent = msg.text;
                textoTerminal.appendChild(p);
                terminal.scrollTop = terminal.scrollHeight;
                await esperar(msg.delay);
            }

            const alertaFinal = document.createElement('p');
            alertaFinal.classList.add('linea-codigo');
            alertaFinal.style.color = '#ff0000';
            alertaFinal.style.fontWeight = 'bold';
            alertaFinal.style.fontSize = '1.5rem';
            alertaFinal.textContent = "¡ACCESO TOTAL CONCEDIDO! BLOQUEANDO DISPOSITIVO...";
            textoTerminal.appendChild(alertaFinal);
            
            setTimeout(finalizarBroma, 3000);
        });
    }

    function finalizarBroma() {
        terminal.classList.add('oculto');
        alert("JAJAJA No que muy hacker mrd No te hackeé nada... esta vez.");
    }
});