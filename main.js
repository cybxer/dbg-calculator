/* ==================== */
/* MENU GENERATOR       */
/* ==================== */

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('home-view');
    
    // Only run this if we are on the home page (where #home-view exists)
    if (grid) {
        // CONFIG: Added 'pages/' to the file paths
        const tools = [
            { file: 'pages/tickets.html',    title: 'Tickets Needed',      desc: 'Calculate tickets for each rarity' },
            { file: 'pages/timestones.html', title: 'Timestones to Days',  desc: 'Convert Timestones to Days' },
            { file: 'pages/labyrinth.html',  title: 'Labyrinth Day',       desc: 'Check days needed for Lab floor' },
            { file: 'pages/damage.html',     title: 'Damage x to Days',    desc: 'Convert damage multiplier to Days' },
            { file: 'pages/weapon.html',     title: 'Weapon Dmg to Days',  desc: 'Convert Weapon Damage to Days' },
            { file: 'pages/summons.html',    title: 'Free Summons',        desc: 'Estimate daily free summons' },
            { file: 'pages/tot.html',        title: 'Total Tickets (ToT)', desc: 'Estimate Max Tickets from Daily TOT' },
            { file: 'pages/apples.html',     title: 'Apples Calculator',   desc: 'Convert Day ↔ Apple Count' },
            { file: 'pages/void.html',       title: 'Void Calculator',     desc: 'Convert Day ↔ Void Level' },
            { file: 'pages/cyber.html',      title: 'Cyber Calculator',    desc: 'Convert Day ↔ Cyber Level' },
            { file: 'pages/changelog.html',  title: 'Changelog',           desc: 'View latest updates and fixes' }
        ];

        // Loop through the list and create the HTML automatically
        tools.forEach(tool => {
            const card = document.createElement('a');
            card.href = tool.file;
            card.className = 'card nav-card';
            card.innerHTML = `
                <h3>${tool.title}</h3>
                <p>${tool.desc}</p>
            `;
            grid.appendChild(card);
        });
    }
});
/* ==================== */
/* CALCULATOR LOGIC     */
/* ==================== */

// --- 1. TICKET LOGIC ---
function calculateTickets() {
    const rarity = document.getElementById('ticket-rarity').value;
    const copies = parseFloat(document.getElementById('ticket-copies').value);
    const resultBox = document.getElementById('ticket-result');

    if (!copies || copies <= 0) {
        resultBox.innerText = "Please enter a valid number.";
        return;
    }

    let probability = 0;
    if (rarity === 'common') probability = 0.66 / 6;
    else if (rarity === 'rare') probability = 0.26 / 6;
    else if (rarity === 'epic') probability = 0.06 / 6;
    else if (rarity === 'legendary') probability = 0.02 / 1;

    const ticketsNeeded = Math.ceil(copies / probability);
    resultBox.innerHTML = `Estimated Tickets: <span style="color: #fff">${ticketsNeeded.toLocaleString()}</span>`;
}

// --- 2. TIMESTONES LOGIC ---
function calculateTimestones() {
    const timestones = parseFloat(document.getElementById('ts-amount').value);
    const resultBox = document.getElementById('ts-result');

    if (!timestones || timestones < 0) {
        resultBox.innerText = "Please enter a valid number.";
        return;
    }
    const days = timestones / 1.152;
    const wavesReduced = Math.floor(timestones / 64);
    resultBox.innerHTML = `
        <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:5px;">Max Day for Min Waves:</div>
        <span style="color: #fff; font-size:1.4rem;">Day ${Math.floor(days).toLocaleString()}</span>
        <br><br>
        <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:5px;">Waves Reduced:</div>
        <span style="color: var(--accent); font-size:1.2rem;">-${wavesReduced.toLocaleString()} Waves</span>
    `;
}

// --- 3. LABYRINTH LOGIC ---
function calculateLabyrinth() {
    const floor = parseInt(document.getElementById('lab-floor').value);
    const room = parseInt(document.getElementById('lab-room').value);
    const resultBox = document.getElementById('lab-result');

    if (!floor || floor < 1) {
        resultBox.innerText = "Please enter a valid Floor number.";
        return;
    }
    const baseDay = 3000;
    const floorAdd = (floor - 1) * 1000;
    const roomAdd = (room - 1) * 100;
    const requiredDay = baseDay + floorAdd + roomAdd;

    resultBox.innerHTML = `
        <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:5px;">Required Day Damage:</div>
        <span style="color: #fff; font-size:1.4rem;">Day ${requiredDay.toLocaleString()}</span>
    `;
}

// --- 4. DAMAGE TO DAYS LOGIC ---
function calculateDamage() {
    const damage = parseFloat(document.getElementById('dmg-amount').value);
    const resultBox = document.getElementById('dmg-result');

    if (!damage || damage <= 1) {
        resultBox.innerText = "Enter a multiplier greater than 1x";
        return;
    }

    const daysGained = Math.log(damage) / Math.log(1.066);
    const exact = daysGained.toFixed(2);
    const down = Math.floor(daysGained);
    const up = Math.ceil(daysGained);

    resultBox.innerHTML = `
        <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:5px;">Days Gained:</div>
        <span style="color: #fff; font-size:1.6rem;">+${exact}</span><br>
        <span style="color: var(--text-muted); font-size:0.9rem;">(${down} ▼ &nbsp;|&nbsp; ${up} ▲)</span>
    `;
}

// --- 5. WEAPON LOGIC ---
function calculateWeapon() {
    const oldDay = parseFloat(document.getElementById('wpn-old').value);
    const newDay = parseFloat(document.getElementById('wpn-new').value);
    const resultBox = document.getElementById('wpn-result');

    if (!oldDay || !newDay) {
        resultBox.innerText = "Please enter both Weapon Days.";
        return;
    }

    // Formula: (New - Old) / 78.3 * 11
    const diff = newDay - oldDay;
    const daysGained = (diff / 78.3) * 11;
    
    const exact = daysGained.toFixed(2);
    const down = Math.floor(daysGained);
    const up = Math.ceil(daysGained);

    resultBox.innerHTML = `
        <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:5px;">Progress Gained:</div>
        <span style="color: #fff; font-size:1.6rem;">${daysGained > 0 ? '+' : ''}${exact} Days</span><br>
         <span style="color: var(--text-muted); font-size:0.9rem;">(${down} ▼ &nbsp;|&nbsp; ${up} ▲)</span>
    `;
}

// --- 6. FREE SUMMONS LOGIC ---
function calculateSummons() {
    const day = parseFloat(document.getElementById('summons-day').value);
    const resultBox = document.getElementById('summons-result');

    if (!day || day < 0) {
        resultBox.innerText = "Please enter a valid Day.";
        return;
    }

    const totalTickets = Math.floor(day / 200);

    resultBox.innerHTML = `
        <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:5px;">Daily Free Summons:</div>
        <span style="color: #fff; font-size:1.6rem;">${totalTickets.toLocaleString()}</span>
    `;
}

// --- 7. ToT TICKETS LOGIC ---
function calculateToT() {
    const day = parseFloat(document.getElementById('tot-day').value);
    const tomeLevel = parseFloat(document.getElementById('tot-tome').value) || 0;
    let darkLevel = parseFloat(document.getElementById('tot-dark').value) || 0;
    const resultBox = document.getElementById('tot-result');

    if (!day || day < 0) {
        resultBox.innerText = "Please enter a valid Day.";
        return;
    }

    // Safety Cap for Dark Level
    if (darkLevel > 3) darkLevel = 3;
    if (darkLevel < 0) darkLevel = 0;

    // 1. Calculate Base Tickets
    let baseTickets = 0;
    if (day < 5000) {
        baseTickets = Math.floor(day / 5);
    } else {
        const baseConst = 64.7273575878291;
        const powerConst = 0.32151570515729;
        baseTickets = baseConst * Math.pow(day, powerConst);
    }

    // 2. Calculate Bonus: Base + (Base * Tome% * DarkMultiplier)
    const tomePercent = tomeLevel * 0.01;
    const darkMult = Math.pow(1.1, darkLevel);
    const effectiveBonus = baseTickets * tomePercent * darkMult;

    // 3. Final Calculation
    const finalTickets = Math.round(baseTickets + effectiveBonus);

    resultBox.innerHTML = `
        <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:5px;">Total Tickets:</div>
        <span style="color: #fff; font-size:1.6rem;">${finalTickets.toLocaleString()}</span><br>
    `;
}

// --- 8. APPLES LOGIC (2-WAY) ---
function calculateApples(mode) {
    const resultBox = document.getElementById('apple-result');
    const startDay = 10220;
    const cycle = 365;

    if (mode === 'day') {
        const day = parseFloat(document.getElementById('apple-day').value);
        if (!day || day < 0) { resultBox.innerText = "Enter a valid Day."; return; }

        let count = 0;
        let nextAppleDay = startDay;
        let daysLeft = 0;

        if (day >= startDay) {
            const diff = day - startDay;
            const earned = Math.floor(diff / cycle);
            count = 1 + earned;
            nextAppleDay = startDay + (count * cycle);
            daysLeft = nextAppleDay - day;
        } else {
            daysLeft = startDay - day;
        }

        resultBox.innerHTML = `
            <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:5px;">Total Apples:</div>
            <span style="color: #fff; font-size:1.6rem;">${count.toLocaleString()}</span><br>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:5px;">Next at Day ${nextAppleDay.toLocaleString()} (+${daysLeft.toLocaleString()} Days)</div>
        `;
    } 
    else if (mode === 'target') {
        const target = parseFloat(document.getElementById('apple-target').value);
        if (!target || target < 1) { resultBox.innerText = "Enter at least 1 Apple."; return; }

        const requiredDay = startDay + ((target - 1) * cycle);

        resultBox.innerHTML = `
            <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:5px;">Day Needed for ${target} Apples:</div>
            <span style="color: #fff; font-size:1.6rem;">Day ${requiredDay.toLocaleString()}</span>
        `;
    }
}

// --- 9. VOID LEVEL LOGIC (2-WAY) ---
function calculateVoid(mode) {
    const resultBox = document.getElementById('void-result');
    const startDay = 18250;
    const cycle = 50;

    if (mode === 'day') {
        const day = parseFloat(document.getElementById('void-day').value);
        if (!day || day < 0) { resultBox.innerText = "Enter a valid Day."; return; }

        let level = 0;
        let nextLevelDay = startDay;
        let daysLeft = 0;

        if (day >= startDay) {
            const diff = day - startDay;
            const earned = Math.floor(diff / cycle);
            level = 1 + earned; 
            nextLevelDay = startDay + (level * cycle);
            daysLeft = nextLevelDay - day;
        } else {
            daysLeft = startDay - day;
        }

        resultBox.innerHTML = `
            <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:5px;">Void Level:</div>
            <span style="color: #fff; font-size:1.6rem;">${level.toLocaleString()}</span><br>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:5px;">Next at Day ${nextLevelDay.toLocaleString()} (+${daysLeft.toLocaleString()} Days)</div>
        `;
    }
    else if (mode === 'target') {
        const target = parseFloat(document.getElementById('void-target').value);
        if (!target || target < 1) { resultBox.innerText = "Enter Level 1 or higher."; return; }

        const requiredDay = startDay + ((target - 1) * cycle);

        resultBox.innerHTML = `
            <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:5px;">Day Needed for Level ${target}:</div>
            <span style="color: #fff; font-size:1.6rem;">Day ${requiredDay.toLocaleString()}</span>
        `;
    }
}

// --- 10. CYBER CALCULATOR (2-WAY) ---
function calculateCyber(mode) {
    const resultBox = document.getElementById('cyber-result');
    const startDay = 5000;
    const cycle = 100;

    if (mode === 'day') {
        const day = parseFloat(document.getElementById('cyber-day').value);
        if (!day || day < 0) { resultBox.innerText = "Enter a valid Day."; return; }

        let level = 0;
        let nextLevelDay = startDay;
        let daysLeft = 0;

        if (day >= startDay) {
            const diff = day - startDay;
            const earned = Math.floor(diff / cycle);
            level = earned;
            nextLevelDay = startDay + ((level + 1) * cycle);
            daysLeft = nextLevelDay - day;
        } else {
            daysLeft = startDay - day;
        }

        resultBox.innerHTML = `
            <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:5px;">Cyber Level:</div>
            <span style="color: #fff; font-size:1.6rem;">${level.toLocaleString()}</span><br>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:5px;">Next at Day ${nextLevelDay.toLocaleString()} (+${daysLeft.toLocaleString()} Days)</div>
        `;
    }
    else if (mode === 'target') {
        const target = parseFloat(document.getElementById('cyber-target').value);
        if (!target || target < 0) { resultBox.innerText = "Enter valid Level."; return; }

        const requiredDay = startDay + (target * cycle);

        resultBox.innerHTML = `
            <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:5px;">Day Needed for Level ${target}:</div>
            <span style="color: #fff; font-size:1.6rem;">Day ${requiredDay.toLocaleString()}</span>
        `;
    }
}