const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",    // 0 normal
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",  // 1 confused
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",             // 2 pleading
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",             // 3 sad
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",       // 4 sadder
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",             // 5 devastated
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",               // 6 very devastated
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"  // 7 crying runaway
]

const photoStages = [
    "images/photo10.png",
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg",
    "images/photo7.jpg",
    "images/photo8.jpg"
]

photoStages.forEach(src => {
    const img = new Image()
    img.src = src
})

const noMessages = [
    "No",
    "Sharma Ji, soch lo 😌",
    "Itna attitude theek ni h 🥺",
    "Sach m NOOOOOOO? 😐",
    "Monty se influence ho kya 😒",
    "Tmhare pass meri gandi wali photos h 😶",
    "Last chance Madam 😤",
    "Please Preeeeeeetoooooooo 🥺",
    "<s>YES</s> YASH hi destiny h 💍"
]

const yesTeasePokes = [
    "Areeeee waaahh, Turant itni aasani se maan rhi ho??? 😏",
    "Lagta h mere pyaar m kuch zyada hi pagal h koi 👀",
    "Bhai Sahab Game hi ni samjh re tum 😑😑😑",
    "NO daba bhai NOOOOOOOOOOOO (Meri mehnat waste naa kar) 😣"
]

let yesTeasedCount = 0

let noClickCount = 0
let runawayEnabled = false
let musicPlaying = true

const catGif = document.getElementById('cat-gif')
const lovePhoto = document.getElementById('love-photo')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

// Autoplay: audio starts muted (bypasses browser policy), unmute immediately
music.muted = true
music.volume = 0.3
music.play().then(() => {
    music.muted = false
}).catch(() => {
    // Fallback: unmute on first interaction
    document.addEventListener('click', () => {
        music.muted = false
        music.play().catch(() => {})
    }, { once: true })
})

function toggleMusic() {
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.muted = false
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

function handleYesClick() {
    if (!runawayEnabled) {
        // Tease her to try No first
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    window.location.href = 'yes.html'
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    // Cycle through guilt-trip messages
    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.innerHTML = noMessages[msgIndex]

    // Mobile-friendly YES button growth till final click
const scaleValue = Math.min(1 + (noClickCount * 0.08), 1.45)

yesBtn.style.transform = `scale(${scaleValue})`
yesBtn.style.maxWidth = "260px"
yesBtn.style.width = "auto"
yesBtn.style.whiteSpace = "normal"
yesBtn.style.wordBreak = "break-word"
yesBtn.style.flexShrink = "0"

    // Shrink No button to contrast
    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    // Swap cat GIF through stages
    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    // Pictures changes
    const photoIndex = Math.min(noClickCount, photoStages.length - 1)
    swapPhoto(photoStages[photoIndex])

    // Runaway starts at click 5
    if (noClickCount >= 8 && !runawayEnabled) {
    enableRunaway()
    runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function swapPhoto(src) {
    if (lovePhoto.src.includes(src)) return

    const nextImage = new Image()
    nextImage.src = src

    nextImage.onload = () => {
        lovePhoto.style.opacity = "0"
        lovePhoto.style.transform = "scale(0.96)"

        setTimeout(() => {
            lovePhoto.src = src + "?v=" + new Date().getTime()
            lovePhoto.style.opacity = "1"
            lovePhoto.style.transform = "scale(1)"
        }, 180)
    }
}

function enableRunaway() {
    noBtn.style.transition = "all 0.18s ease"
    noBtn.style.position = "fixed"
    noBtn.style.zIndex = "999"

    noBtn.addEventListener("mouseenter", runAway)

    noBtn.addEventListener("touchstart", function (e) {
        e.preventDefault()
        runAway()
    }, { passive: false })

    noBtn.addEventListener("click", function (e) {
        e.preventDefault()
        runAway()
    })

    // dramatic first escape
    runAway()
}

function runAway() {
    const safeMargin = 30

    const btnWidth = noBtn.offsetWidth
    const btnHeight = noBtn.offsetHeight

    const maxX = window.innerWidth - btnWidth - safeMargin
    const maxY = window.innerHeight - btnHeight - safeMargin

    const randomX = Math.max(
        safeMargin,
        Math.random() * maxX
    )

    const randomY = Math.max(
        safeMargin,
        Math.random() * maxY
    )

    noBtn.style.position = "fixed"
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = "999"
}
