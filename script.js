const ENCRYPTION_KEY = {
    'A':"0000",'B':"1200",'C':"4100",'Ç':"1400",'D':"9200",'E':"8100",
    'F':"5200",'G':"4400",'Ğ':"5400",'H':"1500",'I':"2000",'İ':"2100",
    'J':"5000",'K':"3100",'L':"0400",'M':"4300",'N':"7200",'O':"7000",
    'Ö':"7100",'P':"6900",'R':"6300",'S':"8000",'Ş':"8200",'T':"1100",
    'U':"1000",'Ü':"1600",'V':"0100",'Y':"0500",'Z':"0800",'X':"9400",
    'W':"9900",'Q':"5500",
    'a':"0900",'b':"0200",'c':"1300",'ç':"4600",'d':"8900",'e':"0600",
    'f':"4800",'g':"3300",'ğ':"2500",'h':"7400",'ı':"8800",'i':"9600",
    'j':"6200",'k':"4000",'l':"1800",'m':"0700",'n':"8400",'o':"3700",
    'ö':"4200",'p':"6700",'r':"2900",'s':"3400",'ş':"7700",'t':"8600",
    'u':"1900",'ü':"3000",'v':"9100",'y':"2700",'z':"5800",'x':"2400",
    'w':"1700",'q':"9300",
    '0':"0300",'1':"0301",'2':"0302",'3':"0303",'4':"0304",'5':"0305",
    '6':"0306",'7':"0307",'8':"0308",'9':"0309",
    '.':"2200", ',':"2300", '!':"2600", '?':"2800", ':':"3200", ';':"9700",
    '\'':"3500",'"':"3600",'(':"3800",')':"3900",'-':"4500",'_':"4700",
    '*':"4900",'/':"5600",'@':"5700",'#':"5900",'$':"6000",'%':"6100",
    '&':"9500",'=':"6400",'+':"6500",'<':"6600",'>':"6800",'[':"7300",
    ']':"9000",'{':"7500",'}':"7600",
    '|':"0311",'~':"0310",'^':"0312",'\\':"0313",'`':"0314",
    ' ':"9800",'\n':"8700",'\r':"8500",'\t':"5100"
};

const DECRYPTION_KEY = Object.fromEntries(
    Object.entries(ENCRYPTION_KEY).map(([char, code]) => [code, char])
);


function setStatus(message, isError) {
    const statusDiv = document.getElementById('statusMessage');
    if (!statusDiv) return;
    statusDiv.textContent = message;
    statusDiv.className = `alert mt-3 ${isError ? 'alert-danger' : 'alert-success'}`;
    statusDiv.classList.remove('d-none');
}

function Encrypt(plaintext) {
    let result = '';
    for (const char of plaintext) {
        const code = ENCRYPTION_KEY[char];
        if (code !== undefined) {
            result += code;
        }
    }
    return result;
}

function Decrypt(ciphertext) {
    ciphertext = ciphertext.replace(/\s/g, "");

    if (!ciphertext || ciphertext.length % 4 !== 0) {
        return "ERROR: The encryption code must consist of a multiple of four digits.";
    }

    let result = '';
    for (let i = 0; i < ciphertext.length; i += 4) {
        const code = ciphertext.substring(i, i + 4);
        const character = DECRYPTION_KEY[code];
        if (character !== undefined) {
            result += character;
        } else {
            result += '?';
        }
    }
    return result;
}


function encryptText() {
    setStatus('', false);
    const plainText = document.getElementById('plainText').value;
    if (!plainText) {
        return;
    }

    const cipherCode = Encrypt(plainText);
    document.getElementById('cipherCode').value = cipherCode;
}

function decryptText() {
    setStatus('', false);
    const cipherText = document.getElementById('cipherToDecode').value;

    const decodedText = Decrypt(cipherText);

    if (decodedText.startsWith("ERROR:")) {
        setStatus(decodedText, true);
        document.getElementById('decodedText').value = '';
    } else {
        document.getElementById('decodedText').value = decodedText;
        if (decodedText.includes('?')) {
            setStatus("The code has been decrypted, but some characters (‘?’) could not be found in the dictionary. Please check the code.", false);
        } else {
        }
    }
}


function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e.target.error);
        reader.readAsText(file, 'UTF-8');
    });
}

function triggerDownload(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

async function encryptFileWrapper() {
    setStatus('', false);
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        return;
    }
    
    try {
        const plaintext = await readFileContent(file);
        const ciphertext = Encrypt(plaintext);
        
        const newFileName = file.name + ".KAYA";
        triggerDownload(newFileName, ciphertext);
        
    } catch (e) {
    }
}

async function decryptFileWrapper() {
    setStatus('', false);
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        return;
    }
    
    if (!file.name.toUpperCase().endsWith(".KAYA")) {
        return;
    }
    
    try {
        const ciphertext = await readFileContent(file);
        const plaintext = Decrypt(ciphertext);
        
        if (plaintext.startsWith("ERROR:")) {
            setStatus(plaintext, true);
            return;
        }

        const originalFileName = file.name.substring(0, file.name.length - 5);
        triggerDownload(originalFileName, plaintext);
        
    } catch (e) {
    }
}


const LYRICS_TIMELINE = [
    { time: 0,     text: "KAYA SLXS x Katyusha"                },
    { time: 1.8,   text: "Rastsvetali yabloni i grushi"        },
    { time: 5.5,   text: "Poplyli tumany nad rekoy"            },
    { time: 8.9,   text: "Vykhodila na bereg Katyusha"         },
    { time: 13.3,  text: "Na vysokiy bereg na krutoy"          },
    { time: 16.8,  text: "Vykhodila na bereg Katyusha"         },
    { time: 20.8,  text: "Na vysokiy bereg na krutoy"          },
    { time: 24.6,  text: "Vykhodila, pesnyu zavodila"          },
    { time: 28.4,  text: "Pro stepnogo sizogo orla"            },
    { time: 32,    text: "Pro togo, kotorogo lyubila"          },
    { time: 36,    text: "Pro togo, ch'i pis'ma beregla"       },
    { time: 39.8,  text: "Pro togo, kotorogo lyubila"          },
    { time: 43.9,  text: "Pro togo, ch'i pis'ma beregla"       },
    { time: 47,    text: "Oy, ty, pesnya, pesenka devich'ya"   },
    { time: 51,    text: "Ty leti za yasnym solntsem vsled"    },
    { time: 55,    text: "I boytsu na dal'nem pogranich'ye"    },
    { time: 59,    text: "Ot Katyushi pereday privet"          },
    { time: 63,    text: "I boytsu na dal'nem pogranich'ye"    },
    { time: 67,    text: "Ot Katyushi pereday privet"          },
    { time: 70,    text: "♫♪♫"                                 },
    { time: 80.8,  text: "Pust' on vspomnit devushku prostuyu" },
    { time: 84.6,  text: "Pust' uslyshit, kak ona poyet"       },
    { time: 88.5,  text: "Pust' on zemlyu berezhet rodnuyu"    },
    { time: 92.4,  text: "A lyubov' Katyusha sberezhet"        },
    { time: 96.1,  text: "Pust' on zemlyu berezhet rodnuyu"    },
    { time: 99.8,  text: "A lyubov' Katyusha sberezhet"        },
    { time: 103.8, text: "Rastsvetali yabloni i grushi"        },
    { time: 106.9, text: "Poplyli tumany nad rekoy"            },
    { time: 111,   text: "Vykhodila na bereg Katyusha"         },
    { time: 115,   text: "Na vysokiy bereg na krutoy"          },
    { time: 119,   text: "Vykhodila na bereg Katyusha"         },
    { time: 123,   text: "Na vysokiy bereg na krutoy"          },
    { time: 126.9, text: "♫♪♫" },
];

let musicPlayer, aboutModal, lyricsDisplay;
let currentLyricIndex = 0;
let updateInterval = null; 

function updateLyrics() {
    if (!musicPlayer || !lyricsDisplay) return;

    const currentTime = musicPlayer.currentTime;
    let nextIndex = currentLyricIndex;

    for (let i = 0; i < LYRICS_TIMELINE.length; i++) {
        const lyricTime = LYRICS_TIMELINE[i].time;
        if (currentTime >= lyricTime) {
            nextIndex = i;
        } else if (lyricTime > currentTime) {
            break;
        }
    }
    
    if (nextIndex !== currentLyricIndex) {
        currentLyricIndex = nextIndex;
        
        lyricsDisplay.style.opacity = 0; 
        
        setTimeout(() => {
            lyricsDisplay.textContent = LYRICS_TIMELINE[currentLyricIndex].text;
            lyricsDisplay.style.opacity = 1; 
        }, 300);
    }
}

function toggleMusic() {
    if (!musicPlayer) return;
    
    if (musicPlayer.paused) {
        musicPlayer.play()
            .then(() => {
            })
            .catch(error => {
                console.error("Autoplay error:", error);
            });
    } else {
        musicPlayer.pause();
    }
}

function stopMusic() {
    if (updateInterval) clearInterval(updateInterval); 
    if (musicPlayer) {
        musicPlayer.pause();
        musicPlayer.currentTime = 0; 
    }
    if (lyricsDisplay) {
        currentLyricIndex = 0; 
        lyricsDisplay.textContent = LYRICS_TIMELINE[0].text;
    }
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode');
}


document.addEventListener('DOMContentLoaded', () => {
    musicPlayer = document.getElementById('backgroundMusic');
    aboutModal = document.getElementById('aboutModal');
    lyricsDisplay = document.getElementById('lyricsDisplay');
    
    // 2. Tema yükle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme === 'dark-mode') {
        document.body.classList.add('dark-mode');
    }

    if (aboutModal && musicPlayer) {
        aboutModal.addEventListener('shown.bs.modal', function () {
            musicPlayer.currentTime = 0;
            currentLyricIndex = -1; 
            updateLyrics();
            
            if (musicPlayer.paused) {
                toggleMusic(); 
            }
            
            updateInterval = setInterval(updateLyrics, 250); 
        });
        
        aboutModal.addEventListener('hidden.bs.modal', function () {
            stopMusic();
        });

        musicPlayer.addEventListener('error', (e) => {
            console.error("Song file not found:", e);
            setStatus("HATA: 'sarki.mp3' not found.", true);
        });
    }
});