# Fantasy RPG Quest

## 🎮 Overview

A browser-based 2D RPG game built with vanilla JavaScript and HTML5 Canvas. Explore dungeons, battle enemies, level up, and loot treasures in this immersive fantasy adventure!

## ✨ Features

- **Dynamic Combat System**: Real-time combat with damage calculations and enemy AI
- **Character Progression**: Level up, gain experience, and improve stats
- **Dungeon Crawling**: 5 progressively difficult dungeon levels
- **Inventory Management**: Collect items and potions
- **Real-time Battle Log**: Track all game events and combat outcomes
- **Character Stats**: HP, Mana, Attack, Defense, Experience, Gold
- **Procedural Enemy Spawning**: Different enemies at each dungeon level
- **Responsive UI**: Green terminal-style interface with live stat updates

## 🎮 Game Controls

```
W / Arrow Up    - Move Up
S / Arrow Down  - Move Down
A / Arrow Left  - Move Left
D / Arrow Right - Move Right
SPACEBAR        - Attack nearest enemy
E               - Enter next dungeon level
I               - Open/Close inventory
```

## 📊 Game Mechanics

### Player Stats
- **HP**: Health points. Reduced when taking damage
- **Mana**: Magic points. Used for special abilities
- **Attack**: Base damage for attacks
- **Defense**: Reduces incoming damage
- **EXP**: Experience gained from defeating enemies
- **Gold**: Currency from defeating enemies

### Combat System
- Damage = Random(1-15) + Player Attack - Enemy Defense
- Gain 25 EXP per enemy defeat
- Gain 50 Gold per enemy defeat
- Level up when EXP reaches max

### Level Progression
- HP increases by 10 per level
- Attack increases by 3 per level
- Max EXP increases by 20% per level

## 🏰 Dungeon Levels

| Level | Enemies | Difficulty | Boss? |
|-------|---------|------------|-------|
| 1     | 3       | Easy       | No    |
| 2     | 5       | Normal     | No    |
| 3     | 8       | Hard       | No    |
| 4     | 10      | Very Hard  | No    |
| 5     | 15      | Nightmare  | Yes   |

## 🛠️ Technology Stack

- **HTML5**: Canvas API for rendering
- **CSS3**: Modern styling with gradients and animations
- **JavaScript (ES6+)**: Object-oriented game engine
- **No Dependencies**: Pure vanilla implementation

## 📁 Project Structure

```
fantasy-rpg-quest/
├── index.html      # Main game HTML
├── styles.css      # Game styling
├── game.js         # Game engine
└── README.md       # Documentation
```

## 🚀 Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/Gaganoctrl/fantasy-rpg-quest.git
   cd fantasy-rpg-quest
   ```

2. Open in a web browser
   ```bash
   open index.html
   # or
   double-click index.html
   ```

3. Start playing!
   - Move around the dungeon
   - Attack enemies (SPACEBAR)
   - Progress through levels (E key)
   - Check inventory (I key)

## 💻 Browser Compatibility

- Chrome/Chromium: ✅
- Firefox: ✅
- Safari: ✅
- Edge: ✅
- Mobile Browsers: ⚠️ (Partial support)

## 🎨 Visual Design

- **Color Scheme**: Dark cyberpunk theme with neon green accents
- **Player**: Green rectangle with glowing border
- **Enemies**: Red rectangles showing HP
- **UI**: Terminal-style panels with green text
- **Animations**: Smooth canvas rendering at 60 FPS

## 🔮 Future Features (Roadmap)

- [ ] Boss battles with special attacks
- [ ] Magic spells and abilities
- [ ] Item shop system
- [ ] Save/Load functionality
- [ ] Multiplayer support
- [ ] Sound effects and music
- [ ] Particle effects
- [ ] More enemy types
- [ ] Quests and missions
- [ ] Leaderboard system

## 📝 Game Balance

The game is balanced around:
- Difficulty increases by ~40% per dungeon level
- Player power increases by ~20% per level
- Average level 2-3 for progression

## 🐛 Known Issues

- Mobile touch controls not yet implemented
- Sound not available in current version
- No persistent save system

## 📄 License

MIT License - Feel free to use and modify

## 👨‍💻 Author

Gaganoctrl - Fantasy RPG Quest Developer

## 🎯 Tips for Playing

1. **Crowd Control**: Try to fight one enemy at a time
2. **Level Up**: Defeat enough enemies to level up before advancing
3. **Resource Management**: Watch your HP - healing is limited
4. **Positioning**: Move around to avoid clusters of enemies
5. **Progressive Difficulty**: Each dungeon level gets harder

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

**Play now!** Open `index.html` in your browser and embark on an epic quest!
