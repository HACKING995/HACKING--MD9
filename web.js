const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

// Fonction pour s'auto-ping
function autoPing(server) {
  setInterval(async () => {
    try {
      const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'https'; //It's not an error i'm just a bad coder :XD
      const selfUrl = `${protocol}://${server}`;
      
      const response = await axios.get(selfUrl);
      console.log(`Auto-ping réussi: ${new Date().toLocaleString()}`);
      console.log(`Statut: ${response.status}`);
    } catch (error) {
      console.error('Échec de l\'auto-ping:', error.message);
    }
  }, 60000); // Toutes les minutes (60000 millisecondes)
}

app.get('/', (req, res) => {
  // Récupération dynamique de l'host
  const host = req.get('host');
  
  // Lance l'auto-ping si ce n'est pas déjà fait
  if (!global.autoPingStarted) {
    autoPing(host);
    global.autoPingStarted = true;
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hacking-MD Status</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                font-family: 'JetBrains Mono', monospace;
                background-color: #0a0a0a;
                color: #00ff00;
            }
            
            .terminal {
                background-color: #1a1a1a;
                border: 1px solid #00ff00;
                border-radius: 8px;
                padding: 2rem;
                width: 90%;
                max-width: 600px;
                box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
                animation: bootup 1s ease-out;
            }
            
            @keyframes bootup {
                0% {
                    opacity: 0;
                    transform: scale(0.95);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .status-header {
                text-align: center;
                margin-bottom: 2rem;
                border-bottom: 1px solid #00ff00;
                padding-bottom: 1rem;
            }
            
            .status-header h1 {
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
            }
            
            .status-content {
                margin-bottom: 2rem;
            }
            
            .status-line {
                margin: 0.5rem 0;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .status-indicator {
                display: inline-block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #00ff00;
                animation: blink 1s infinite;
            }
            
            @keyframes blink {
                50% { opacity: 0.5; }
            }
            
            .timestamp {
                color: #888;
                font-size: 0.8rem;
            }
            
            .info {
                color: #888;
                font-size: 0.8rem;
                text-align: center;
                margin-top: 1.5rem;
            }
            
            @media (max-width: 480px) {
                .terminal {
                    padding: 1rem;
                }
                
                .status-header h1 {
                    font-size: 1.2rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="terminal">
            <div class="status-header">
                <h1>HACKING-MD</h1>
                <div class="timestamp" id="uptime"></div>
            </div>
            <div class="status-content">
                <div class="status-line">
                    <span class="status-indicator"></span>
                    <span>Serveur en ligne</span>
                </div>
                <div class="status-line">
                    <span class="status-indicator"></span>
                    <span>Bot WhatsApp actif</span>
                </div>
            </div>
            <div class="info">
                Cette page maintient le serveur actif sur Render
                <br>
                <a href="https://github.com/HACKING995/HACKING--MD9" 
                   style="color: #00ff00; text-decoration: none; margin-top: 0.5rem; display: inline-block;">
                    GitHub: HACKING995/HACKING--MD9
                </a>
            </div>
        </div>
        
        <script>
            function updateTimestamp() {
                const uptimeElement = document.getElementById('uptime');
                const now = new Date();
                uptimeElement.textContent = now.toLocaleString();
            }
            
            updateTimestamp();
            setInterval(updateTimestamp, 1000);
        </script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
