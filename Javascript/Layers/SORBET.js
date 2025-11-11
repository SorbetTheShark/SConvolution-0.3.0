addLayer("sorbet", {
    startData() {return {
        unlocked() {return player.universe.points.gte(15)},
        points: new Decimal(0),
        total: new Decimal(0),
        best: new Decimal(0),
        resetTime: 0,

        upgradeEffect: ``

    }},
    color: "#CCC",
    image: "Images/Icons/Sorbet.png",
    layerShown() {return player.sorbet.unlocked()},
    row: 2,
    resource() {
        return "[REDACTED] Globs"
    },
    hotkeys: [
        {
            key: "s",
            description: "S: Assimilate all Funds into Globs",
            onPress() {if (player.sorbet.unlocked) doReset("sorbet")},
            unlocked() {return player.sorbet.unlocked}
        }
    ],
    type: "normal",
    baseResource: "Money",
    baseAmount() {return player.money.points},
    requires: new Decimal("e30"),
    exponent: 0.255,
    roundUpCost: true,
    resetDescription: "Assimilate all Funds for ",
    tooltip: "Sorbet's Layer",
    nodeStyle() {return {"background-size":"75%", "background-repeat":"no-repeat", "background-position":"center", "transform":`translate(${player.cX * Math.sin(Math.random()) * 15}px, ${player.cY * -Math.cos(Math.random()) * 15}px)`}},
    microtabs: {
        index: {
            Upgrades: {
                content: ["blank", ["display-text", () => player.sorbet.upgradeEffect], "blank", ["upgrades", 1], "blank", ["upgrades", [2,3,4]]],
            },

            Milestones: {
                content: ["blank", ["display-text", () => `Total ${temp.sorbet.resource}: <big>${format(player.sorbet.total)}</big>`], "blank", "milestones"]
            }
        }
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        ["microtabs", "index"]
    ],
    componentStyles: {
        "microtabs"() {return {"border-color":"transparent"}},
        "milestone"() {return {"width":"600px"}}
    },
    onPrestige() {
        soundPlay(0)
    },
    update() {
        let uEDisplay = ``

        if (hasUpgrade("sorbet", 11)) {
            if (hasUpgrade("sorbet", 23)) {
                uEDisplay += `<small>Total Effect from <crimson>Upgrade S(1-1)</crimson>: x${format(upgradeEffect("sorbet", 11))} <crimson>Upgrade 1-1 Effect & ${temp.sorbet.resource} gain</crimson></small><br>`
            } else {
                uEDisplay += `Total Effect from <crimson>Upgrade S(1-1)</crimson>: x${format(upgradeEffect("sorbet", 11))} <crimson>Upgrade 1-1 Effect</crimson><br>`
            }
        }

        if (hasUpgrade("sorbet", 12)) {
            uEDisplay += `Total Effect from <crimson>Upgrade S(1-2)</crimson>: x${format(upgradeEffect("sorbet", 12))} <crimson>Upgrade S(1-1) Power</crimson><br>`
        }

        if (hasUpgrade("sorbet", 32)) {
            uEDisplay += `Total Effect from <crimson>Upgrade S(3-2)</crimson>: /${format(upgradeEffect("sorbet", 32))} <crimson>Booster Cost</crimson><br>`
        }

        player.sorbet.upgradeEffect = uEDisplay
    },
    milestones: {
        11: {
            requirementDescription() {return `1.00e25 Total ${temp.sorbet.resource}`},
            done() {return player.sorbet.total.gte("e25") || player.permaMilestoneUnlocks[0] == true},
            effectDescription: "Unlock Sorbet's Permastones (Permanent Milestones) and 3 Permanent Sorbet Milestones.",
            unlocked() {return player.sorbet.unlocked() && !player.permaMilestoneUnlocks[0] == true},
            onComplete() {player.permaMilestoneUnlocks[0] = true}
        }
    },

    upgrades: {
        11: {
            title: "<nocturnalNavy/>S(1-1)",
            description() {return `Upgrade 1-1's effect is ${format(this.power().times(100), 1)}% stronger for every upgrade bought on this layer. (Including this) Each upgrade adds effect based on the id of it. (The first upgrade, this one, would count as 1. The next one counts as 2 and so on...)`},
            style() {return {"width":"250px", "height":"150px"}},
            cost: new Decimal(25),
            power() {
                let base = new Decimal(0.05)
                if (hasUpgrade("sorbet", 34)) base = base.times(1.15)
                if (hasMilestone("universe", 18)) base = base.times(0.9)
                return base
            },
            effect() {
                let amt = new Decimal(0)
                if (hasUpgrade("sorbet", 11)) amt = amt.add(1)
                if (hasUpgrade("sorbet", 21)) amt = amt.add(2)
                if (hasUpgrade("sorbet", 22)) amt = amt.add(3)
                if (hasUpgrade("sorbet", 23)) amt = amt.add(4)
                if (hasUpgrade("sorbet", 24)) amt = amt.add(5)
                if (hasUpgrade("sorbet", 25)) amt = amt.add(6)
                if (hasUpgrade("sorbet", 31)) amt = amt.add(7)
                if (hasUpgrade("sorbet", 32)) amt = amt.add(8)
                if (hasUpgrade("sorbet", 33)) amt = amt.add(9)
                if (hasUpgrade("sorbet", 34)) amt = amt.add(10)
                if (hasUpgrade("sorbet", 35)) amt = amt.add(11)
                if (hasUpgrade("sorbet", 41)) amt = amt.add(12)
                if (hasUpgrade("sorbet", 42)) amt = amt.add(13)
                if (hasUpgrade("sorbet", 43)) amt = amt.add(14)
                if (hasUpgrade("sorbet", 44)) amt = amt.add(15)
                if (hasUpgrade("sorbet", 45)) amt = amt.add(16)
                let base = new Decimal(1).add(this.power()).pow(amt)
                if (hasUpgrade("sorbet", 12)) base = base.times(upgradeEffect("sorbet", 12))
                if (hasUpgrade("sorbet", 35)) base = base.pow(2.25)
                return base
            }
        },

        12: {
            title: "<nocturnalNavy/>S(1-2)",
            description() {return `The previous upgrade's power increases by ${format(this.power().times(100), 1)}% compounding for every upgrade bought, using the same system of counting them as S(1-1). Also multiplies point gain by 5 and funding gain by 1.5. This upgrade does not count towards the counting system.`},
            cost: new Decimal(225),
            style() {return {"width":"250px", "height":"150px"}},
            power() {
                let base = new Decimal(0.05)
                if (hasUpgrade("sorbet", 34)) base = base.times(1.15)
                if (hasMilestone("universe", 18)) base = base.times(0.9)
                return base
            },
            effect() {
                let amt = new Decimal(0)
                if (hasUpgrade("sorbet", 11)) amt = amt.add(1)
                if (hasUpgrade("sorbet", 21)) amt = amt.add(2)
                if (hasUpgrade("sorbet", 22)) amt = amt.add(3)
                if (hasUpgrade("sorbet", 23)) amt = amt.add(4)
                if (hasUpgrade("sorbet", 24)) amt = amt.add(5)
                if (hasUpgrade("sorbet", 25)) amt = amt.add(6)
                if (hasUpgrade("sorbet", 31)) amt = amt.add(7)
                if (hasUpgrade("sorbet", 32)) amt = amt.add(8)
                if (hasUpgrade("sorbet", 33)) amt = amt.add(9)
                if (hasUpgrade("sorbet", 34)) amt = amt.add(10)
                if (hasUpgrade("sorbet", 35)) amt = amt.add(11)
                if (hasUpgrade("sorbet", 41)) amt = amt.add(12)
                if (hasUpgrade("sorbet", 42)) amt = amt.add(13)
                if (hasUpgrade("sorbet", 43)) amt = amt.add(14)
                if (hasUpgrade("sorbet", 44)) amt = amt.add(15)
                if (hasUpgrade("sorbet", 45)) amt = amt.add(16)
                let base = new Decimal(1).add(this.power()).pow(amt)
                if (hasUpgrade("sorbet", 45)) base = base.pow(1.25)
                return base
            },
            unlocked() {return hasMilestone("universe", 16)}
        },

        21: {
            title: "<nocturnalNavy/>S(2-1)",
            description: "The third booster effect softcaps start 1.85 OoM later.",
            cost: new Decimal(150),
            unlocked() {return hasUpgrade("sorbet", 11)}
        },

        22: {
            title: "<nocturnalNavy/>S(2-2)",
            description: "Planetary Terminal has 100 more max levels and is 25% more powerful.",
            cost: new Decimal(275),
            unlocked() {return hasUpgrade("sorbet", 21)}
        },

        23: {
            title: "<nocturnalNavy/>S(2-3)",
            description() {return `S(1-1) also affects ${temp.sorbet.resource} gain.`},
            cost: new Decimal(300),
            unlocked() {return hasUpgrade("sorbet", 22)}
        },

        24: {
            title: "<nocturnalNavy/>S(2-4)",
            description: "Hall Effect Thruster's effect is raised to the power of 1.33.",
            cost: new Decimal(600),
            unlocked() {return hasUpgrade("sorbet", 23)}
        },

        25: {
            title: "<nocturnalNavy/>S(2-5)",
            description: "Electrodeless Plasma Thruster's effect is applied again.",
            cost: new Decimal(1150),
            unlocked() {return hasUpgrade("sorbet", 24)}
        },

        31: {
            title: "<nocturnalNavy/>S(3-1)",
            description: "Upgrade S(1-2) and upgrade S(2-4) is applied again.",
            cost: new Decimal(10000),
            unlocked() {return hasMilestone("universe", 27) && hasUpgrade("sorbet", 25)}
        },

        32: {
            title: "<nocturnalNavy/>S(3-2)",
            description() {return `Booster cost is divided by ${format(this.power(), 1)} compounding for every upgrade bought after this.`},
            cost: new Decimal(500000),
            amt() {
                let base = new Decimal(0)
                if (hasUpgrade("sorbet", 33)) base = base.add(1)
                if (hasUpgrade("sorbet", 34)) base = base.add(1)
                if (hasUpgrade("sorbet", 35)) base = base.add(1)
                if (hasUpgrade("sorbet", 41)) base = base.add(1)
                if (hasUpgrade("sorbet", 42)) base = base.add(1)
                if (hasUpgrade("sorbet", 43)) base = base.add(1)
                if (hasUpgrade("sorbet", 44)) base = base.add(1)
                if (hasUpgrade("sorbet", 45)) base = base.add(1)
                return base
            },
            power () {
                let base = new Decimal(2)
                return base
            },
            effect() {
                let base = this.power().pow(this.amt())
                if (hasUpgrade("sorbet", 35)) base = base.pow(2.25)
                return base
            },
            unlocked() {return hasUpgrade("sorbet", 31)}
        },

        33: {
            title: "<nocturnalNavy/>S(3-3)",
            description: "Desolate Rift has 50 more max levels.",
            cost: new Decimal(2250000),
            unlocked() {return hasUpgrade("sorbet", 32)}
        },

        34: {
            title: "<nocturnalNavy/>S(3-4)",
            description: "The first two upgrade's powers are 15% stronger.",
            cost: new Decimal(35000000),
            unlocked() {return hasUpgrade("sorbet", 33)}
        },

        35: {
            title: "<nocturnalNavy/>S(3-5)",
            description: "The first and third upgrade effects are raised to the power of 2.25",
            cost: new Decimal(250000000),
            unlocked() {return hasUpgrade("sorbet", 34)}
        },

        41: {
            title: "<nocturnalNavy/>S(4-1)",
            description: "The first 3 booster effect's softcaps start 2.5 OoMs later.",
            cost: new Decimal("e13"),
            unlocked() {return hasMilestone("universe", 28) && hasUpgrade("sorbet", 35)}
        },

        42: {
            title: "<nocturnalNavy/>S(4-2)",
            description: "Ion Thruster's effect is raised to the power of 1.2.",
            cost: new Decimal("3e15"),
            unlocked() {return hasUpgrade("sorbet", 41)}
        },

        43: {
            title: "<nocturnalNavy/>S(4-3)",
            description: "Upgrade 3-3's effect from M Node is squared.",
            cost: new Decimal("5e16"),
            unlocked() {return hasUpgrade("sorbet", 42)}
        },

        44: {
            title: "<nocturnalNavy/>S(4-4)",
            description: "Execute Sor- Desolate Rift and Planetary Terminal has 50 more max levels.",
            cost: new Decimal("2e18"),
            unlocked() {return hasUpgrade("sorbet", 43)}
        },

        45: {
            title: "<nocturnalNavy/>S(4-5)",
            description: "S(1-2)'s effect is raised to the power of 1.25.",
            cost: new Decimal("e22"),
            unlocked() {return hasMilestone("universe", 29) && hasUpgrade("sorbet", 44)}
        }
    },
    gainMult() {
        let base = new Decimal(1)
        if (hasUpgrade("sorbet", 23)) base = base.times(upgradeEffect("sorbet", 11))
        if (hasMilestone("universe", 30)) base = base.times(player.booster.buffList[3])
        return base
    }
})