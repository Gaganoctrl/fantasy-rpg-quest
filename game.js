class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 960;
        this.canvas.height = 720;
        this.player = new Player(480, 360);
        this.enemies = [];
        this.items = [];
        this.quests = [];
        this.battleLog = [];
        this.currentRoom = 0;
        this.gameState = 'exploration';
        this.dungeonLevels = this.generateDungeon();
        this.setupControls();
        this.gameLoop();
    }

    generateDungeon() {
        return [
            { enemies: 3, items: 2, difficulty: 1 },
            { enemies: 5, items: 3, difficulty: 2 },
            { enemies: 8, items: 4, difficulty: 3 },
            { enemies: 10, items: 5, difficulty: 4 },
            { enemies: 15, items: 6, difficulty: 5 }
        ];
    }

    setupControls() {
        document.addEventListener('keydown', (e) => this.handleInput(e));
    }

    handleInput(e) {
        const key = e.key.toLowerCase();
        const speed = 5;
        if (key === 'w' || key === 'arrowup') this.player.move(0, -speed);
        if (key === 's' || key === 'arrowdown') this.player.move(0, speed);
        if (key === 'a' || key === 'arrowleft') this.player.move(-speed, 0);
        if (key === 'd' || key === 'arrowright') this.player.move(speed, 0);
        if (key === ' ') this.player.attack(this.enemies);
        if (key === 'e') this.nextRoom();
        if (key === 'i') this.showInventory();
    }

    attack() {
        if (this.enemies.length > 0) {
            const target = this.enemies[0];
            const damage = Math.floor(Math.random() * 15) + this.player.attack;
            target.takeDamage(damage);
            this.addLog(`Player attacked for ${damage} damage!`, 'combat');
            if (target.hp <= 0) {
                this.enemies.shift();
                this.player.gold += 50;
                this.player.exp += 25;
                this.addLog('Enemy defeated!', 'success');
                if (this.player.exp >= this.player.maxExp) {
                    this.levelUp();
                }
            }
        }
    }

    levelUp() {
        this.player.level++;
        this.player.exp = 0;
        this.player.maxExp = Math.floor(this.player.maxExp * 1.2);
        this.player.maxHp += 10;
        this.player.hp = this.player.maxHp;
        this.player.attack += 3;
        this.addLog(`Level up! Now level ${this.player.level}`, 'success');
    }

    nextRoom() {
        if (this.currentRoom < this.dungeonLevels.length - 1) {
            this.currentRoom++;
            this.spawnEnemies();
            this.addLog(`Entered dungeon level ${this.currentRoom + 1}!`, 'info');
        }
    }

    spawnEnemies() {
        this.enemies = [];
        const level = this.dungeonLevels[this.currentRoom];
        for (let i = 0; i < level.enemies; i++) {
            const enemy = new Enemy(
                Math.random() * 800 + 80,
                Math.random() * 600 + 60,
                level.difficulty
            );
            this.enemies.push(enemy);
        }
    }

    addLog(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        this.battleLog.unshift({ message, type, timestamp });
        if (this.battleLog.length > 20) this.battleLog.pop();
        this.updateUI();
    }

    updateUI() {
        document.getElementById('playerName').textContent = this.player.name;
        document.getElementById('playerLevel').textContent = this.player.level;
        document.getElementById('playerHP').textContent = this.player.hp;
        document.getElementById('playerMaxHP').textContent = this.player.maxHp;
        document.getElementById('playerMana').textContent = this.player.mana;
        document.getElementById('playerMaxMana').textContent = this.player.maxMana;
        document.getElementById('playerEXP').textContent = this.player.exp;
        document.getElementById('playerMaxEXP').textContent = this.player.maxExp;
        document.getElementById('playerGold').textContent = this.player.gold;
        const logEl = document.getElementById('battleLog');
        logEl.innerHTML = this.battleLog.map(log => 
            `<div class="log-content-item ${log.type}">[${log.timestamp}] ${log.message}</div>`
        ).join('');
    }

    showInventory() {
        const inv = document.getElementById('inventoryList');
        inv.innerHTML = this.player.inventory.map((item, i) => 
            `<div class="inventory-item">${item.name} x${item.count}</div>`
        ).join('') || '<div style="color:#666;">Empty</div>';
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'linear-gradient(180deg, #0f3460, #533483)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        this.updateUI();
        requestAnimationFrame(() => this.gameLoop());
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 40;
        this.name = 'Hero';
        this.level = 1;
        this.hp = 100;
        this.maxHp = 100;
        this.mana = 50;
        this.maxMana = 50;
        this.attack = 10;
        this.defense = 5;
        this.exp = 0;
        this.maxExp = 100;
        this.gold = 0;
        this.inventory = [{ name: 'Health Potion', count: 3 }, { name: 'Mana Potion', count: 2 }];
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
        this.x = Math.max(0, Math.min(this.x, 960 - this.width));
        this.y = Math.max(0, Math.min(this.y, 720 - this.height));
    }

    draw(ctx) {
        ctx.fillStyle = '#00ff88';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

class Enemy {
    constructor(x, y, difficulty) {
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 35;
        this.hp = 20 + (difficulty * 10);
        this.maxHp = this.hp;
        this.attack = 5 + (difficulty * 2);
        this.difficulty = difficulty;
    }

    takeDamage(damage) {
        this.hp = Math.max(0, this.hp - damage);
    }

    draw(ctx) {
        ctx.fillStyle = '#ff6b6b';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Arial';
        ctx.fillText(`HP:${this.hp}`, this.x, this.y - 5);
    }
}

const game = new Game();
