# Days Bygone Calculator Suite

![Version](https://img.shields.io/badge/version-1.1-blue?style=flat-square)
![Status](https://img.shields.io/badge/status-active-success?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

**Website with various built-in calculators for Days Bygone**
---

## Formula References

The folowing formulas are used:

### 1. Hero Tickets
Calculates the estimated tickets required to obtain a specific number of hero copies based on probability.
> **Formula:** `Copies Needed / (Drop Rate / Pool Size)`

| Rarity | Drop Rate | Pool Size |
| :--- | :--- | :--- |
| **Common** | 0.66 | 6 |
| **Rare** | 0.26 | 6 |
| **Epic** | 0.06 | 6 |
| **Legendary** | 0.02 | 1 (Rate Up) |

### 2. Timestone Conversion
Converts total Timestones into the maximum Day count achievable with minimum waves.
> **Day Formula:** `Timestones / 1.152`
>
> **Waves Reduced:** `Timestones / 64`

### 3. Labyrinth Unlock
Determines the Day requirement to beat a specific Floor and Room in the Labyrinth.
> **Formula:** `3000 + 1000 × (Floor - 1) + 100 × (Room - 1)`

### 4. Damage Progression
Calculates the number of Days a player can push based on a raw damage multiplier.
> **Formula:** `log(Damage Multiplier) / log(1.066)`

### 5. Weapon Comparison
Compares two weapons by their Day stat to calculate the damage gain in days.
> **Formula:** `((New Weapon Day - Old Weapon Day) / 78.3) * 11`

### 6. Time of Time (ToT) Tickets
Estimates the maximum tickets earnable via the maxing out daily Temple of Time amount, accounting for Tome and Dark Book modifiers.
> **Base Calculation:**
> * If Day < 5000: `floor(Day / 5)`
> * If Day ≥ 5000: `64.727 × Day^0.3215`
>
> **Final Calculation:** `Base + (Base × Tome% × 1.1^Dark_Book_Level)`

### 7. Apples Calculator
Tracks apple amount, which begins at Day 10,220 and follows a 365-day cycle.
> **Formula:** `1 + floor((Current Day - 10220) / 365)`

### 8. Void Level
Tracks Void levels, which begin at Day 18,250 and follow a 50-day cycle.
> **Formula:** `1 + floor((Current Day - 18250) / 50)`

### 9. Cybernetic Level
Tracks Cyber levels, which begin at Day 5,000 and follow a 100-day cycle.
> **Formula:** `floor((Current Day - 5000) / 100)`

### 10. Free Summons
Estimates daily ticket income based on maximum Day progression.
> **Formula:** `floor(Max Day / 200)`

---

## Contributing

Contributions to improve accuracy, add new calculators, or refine the UI are welcome.

### How to Contribute
1.  **Fork** the repository.
2.  Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3.  **Commit** your changes (`git commit -m 'Add some AmazingFeature'`).
4.  **Push** to the branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

### Feedback
For bug reports or feature requests, please open an issue on this repository or contact me directly via Discord.

* **Discord Username:** `@cyberlith`
* **Community:** [discord.gg/daysbygone](https://discord.gg/daysbygone)
