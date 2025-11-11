addLayer("money", {
    startData() {return {
        unlocked: true,
        points: new Decimal(0),
        total: new Decimal(0),
        best: new Decimal(0),
        resetTime: 0,

        buffDisplay: "",
    }},
    color: "#659B45",
    symbol: "M",
    layerShown: true,
    row: 1,
    resource: "Money",
    hotkeys: [
        {
            key: "m",
            description: "M: Reset current Points for Money",
            onPress() {if (player.money.unlocked) doReset("money")},
            unlocked() {return player.money.unlocked}
        }
    ],
    type: "normal",
    baseResource: "Points",
    baseAmount() {return player.points},
    requires: new Decimal(10),
    exponent: 0.475,
    roundUpCost: true,
    resetDescription: "Reset current Points for ",
    microtabs: {
        index: {
            Upgrades: {
                content: ["blank", ["display-text", () => player.money.buffDisplay], "blank", "upgrades"],
            },

            Buyables: {
                content: ["blank", "buyables"],
                unlocked() {return player.universe.points.gte(4)}
            }
        },
    },
    update() {
        player.money.buffDisplay = ""
        if (hasUpgrade("money", 11)) player.money.buffDisplay += `Total Boost from <crimson>Upgrade 1-1</crimson>: x${format(upgradeEffect("money", 11))} <crimson>Points</crimson> <br>`
        if (hasUpgrade("money", 12)) player.money.buffDisplay += `Total Boost from <crimson>Upgrade 1-2</crimson>: x${format(upgradeEffect("money", 12))} <crimson>Money</crimson> <br>`
        if (hasUpgrade("money", 23)) player.money.buffDisplay += `Total Boost from <crimson>Upgrade 2-3</crimson>: x${format(upgradeEffect("money", 23))} to <crimson>Upgrade 1-1 & Upgrade 1-2</crimson> Effect <br>`
        if (hasUpgrade("money", 33)) player.money.buffDisplay += `Total Boost from <crimson>Upgrade 3-3</crimson>: x${format(upgradeEffect("money", 33))} to <crimson>Upgrade 1-1</crimson> Effect`

    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        ["microtabs", "index"]
    ],
    componentStyles: {
        "microtabs"() {return {"border-color":"transparent"}}
    },
    tooltip: "Funds",
    upgrades: {
        11: {
            title: "<nocturnalNavy/>1-1",
            description: "Point gain is stronger based on current Funds.",
            cost: new Decimal(3),
            effect() {
                let logBase = new Decimal(2.8)
                if (hasUpgrade("money", 43)) logBase = logBase.div(1.25)
                let base = player.money.points.add(1).pow(1.15).log(logBase).add(1)
                if (hasUpgrade("money", 21)) base = player.money.points.add(25).pow(2.05).log(logBase).add(3.75)
                if (hasUpgrade("money", 13)) base = base.times(upgradeEffect("money", 12))
                if (hasUpgrade("money", 14)) base = base.pow(1.5)
                if (hasUpgrade("money", 23)) base = base.times(upgradeEffect("money", 23))
                if (hasUpgrade("money", 22)) base = base.times(1.05)
                if (hasUpgrade("money", 24)) base = base.times(1.1)
                if (hasUpgrade("money", 32)) base = base.times(3)
                if (hasUpgrade("money", 33)) base = base.times(upgradeEffect("money", 33))
                if (hasMilestone("universe", 13)) base = base.times(0.95)
                if (hasUpgrade("money", 51)) base = base.times(2)
                if (hasMilestone("universe", 16)) base = base.times(buyableEffect("money", 12))
                if (hasMilestone("universe", 19)) base = base.times(2)
                if (hasUpgrade("sorbet", 11)) base = base.times(upgradeEffect("sorbet", 11))
                return base
            }
        },

        12: {
            title: "<nocturnalNavy/>1-2",
            description: "Gain more funds on reset based on best Funds.",
            cost: new Decimal(12),
            effect() {
                let logBase = new Decimal(225)
                if (hasUpgrade("money", 22)) logBase = logBase.times(0.5).floor()
                let base = player.money.best.add(1).log(logBase).add(1)
                if (hasUpgrade("money", 23)) base = base.times(upgradeEffect("money", 23))
                if (hasUpgrade("money", 24)) base = base.times(1.1)
                if (hasUpgrade("money", 34)) base = base.times(1.5)
                if (hasUpgrade("money", 51)) base = base.times(1.7)
                return base
            },
            unlocked() {return hasUpgrade("money", 11)}
        },

        13: {
            title: "<nocturnalNavy/>1-3",
            description: "The previous upgrade's effect boosts the first upgrade.",
            cost: new Decimal(30),
            unlocked() {return hasUpgrade("money", 12)}
        },

        14: {
            title: "<nocturnalNavy/>1-4",
            description: "Raise the first upgrade's effect to the power of 1.5.",
            cost: new Decimal(75),
            unlocked() {return hasUpgrade("money", 13)}
        },

        21: {
            title: "<nocturnalNavy/>2-1",
            description: "Upgrade 1-1's formula is improved.",
            cost: new Decimal(155),
            unlocked() {return hasUpgrade("money", 14)}
        },

        22: {
            title: "<nocturnalNavy/>2-2",
            description: "Upgrade 1-2 is slightly better. Upgrade 1-1 is 5% stronger.",
            cost: new Decimal(333),
            unlocked() {return hasUpgrade("money", 21)}
        },

        23: {
            title: "<nocturnalNavy/>2-3",
            description: "Upgrade 1-1 & Upgrade 1-2 are stronger based on current points.",
            cost: new Decimal(1000),
            effect() {
                let powBase = new Decimal(0.25)
                if (hasUpgrade("money", 31)) powBase = powBase.add(0.2)
                let logBase = new Decimal(5000)
                if (hasUpgrade("money", 31)) logbase = logBase.sub(750)
                let base = player.points.add(1).pow(powBase).log(logBase).add(1)
                if (hasUpgrade("money", 24)) base = base.times(1.1)
                if (hasUpgrade("money", 34)) base = base.times(1.2)
                if (hasUpgrade("money", 51)) base = base.times(1.5)
                if (hasMilestone("universe", 30)) base = base.times(0.8)
                return base
            },
            unlocked() {return hasUpgrade("money", 22)}
        },

        24: {
            title: "<nocturnalNavy/>2-4",
            description: "All listed boosts are 11% stronger.",
            cost: new Decimal(1375),
            unlocked() {return hasUpgrade("money", 23)}
        },

        31: {
            title: "<nocturnalnavy/>3-1",
            description: "Upgrade 2-3 is much stronger.",
            cost: new Decimal(5500),
            unlocked() {return hasUpgrade("money", 24) && hasMilestone("universe", 11)}
        },

        32: {
            title: "<nocturnalNavy/>3-2",
            description: "Upgrade 1-1 is three times stronger. That's the boost...",
            cost: new Decimal(12000),
            unlocked() {return hasUpgrade("money", 31)}
        },

        33: {
            title: "<nocturnalNavy/>3-3",
            description: "Upgrade 1-1 is stronger based on current universal anger and gain 1% of money gained on reset every second.",
            cost: new Decimal(30000),
            effect() {
                let powBase = new Decimal(0.12)
                let mulBase = new Decimal(2.22)
                let base = player.universe.anger.times(mulBase).pow(powBase)
                if (hasUpgrade("money", 42)) base = base.pow(2)
                if (hasUpgrade("money", 51)) base = base.pow(3)
                if (hasUpgrade("sorbet", 43)) base = base.pow(2)
                return base
            },
            unlocked() {return hasUpgrade("money", 32)}
        },

        34: {
            title: "<nocturnalNavy/>3-4",
            description: "Upgrade 1-2 is 50% stronger and upgrade 2-3 is 20% stronger.",
            cost: new Decimal(50000),
            unlocked() {return hasUpgrade("money", 33)}
        },

        41: {
            title: "<nocturnalNavy/>4-1",
            description: "Upgrade 3-3's passive boost is increased to 5% of money gained on reset per second.",
            cost: new Decimal(105000),
            unlocked() {return hasUpgrade("money", 34) && hasMilestone("universe", 12)}
        },

        42: {
            title: "<nocturnalNavy/>4-2",
            description: "Upgrade 3-3's upgrade boost is squared.",
            cost: new Decimal(175000),
            unlocked() {return hasUpgrade("money", 41)}
        },

        43: {
            title: "<nocturnalNavy/>4-3",
            description: "Upgrade 1-1's formula is improved again.",
            cost: new Decimal(300000),
            unlocked() {return hasUpgrade("money", 42)}
        },

        51: {
            title() {return `<nocturnalNavy/>${jarbler("The End?")}`},
            description: "Upgrade 1-1 is twice as strong, Upgrade 1-2 is 70% stronger, Upgrade 2-3 is 50% stronger, and Upgrade 3-3's effect is cubed.",
            cost: new Decimal(22500000),
            unlocked() {return hasUpgrade("money", 43) && hasMilestone("universe", 15)},
            style() {return {"width":"200px"}}
        }

    },
    passiveGeneration() {
        let base = new Decimal(0)
        if (hasUpgrade("money", 33)) base = base.add(0.01)
        if (hasUpgrade("money", 41)) base = base.add(0.04)
        return base
    },
    gainMult() {
        let base = new Decimal(1)
        if (hasUpgrade("money", 12)) base = base.times(upgradeEffect("money", 12))
        if (hasMilestone("universe", 11)) base = base.times(0.9)
        if (hasMilestone("universe", 14)) base = base.times(buyableEffect(this.layer, 11))
        if (hasMilestone("ach", 11)) base = base.times(2)
        if (hasMilestone("universe", 18)) base = base.times(player.booster.buffList[1])
        if (hasMilestone("universe", 19)) base = base.times(0.85)
        if (hasMilestone("universe", 26)) base = base.div(4)
        if (hasUpgrade("sorbet", 12)) base = base.times(1.5)
        if (hasUpgrade("sorbet", 31)) base = base.times(1.5)
        return base
    },
    prestigeNotify() {
        return (getResetGain("money").times(10)).gte(player.money.points)
    },

    buyables: {
        11: {
            title() {return jarbler("Desolate Rift", "αβξδεφγηιςκλμνοπθρστυωωχψζΑΒΞΔΕΦΓΗΙJΚΛΜΝΟΠΘΡΣΤΥΩΩΧΨΖ") + `<br><br> Level ${getBuyableAmount("money", this.id)}/${this.purchaseLimit()}<br>`},
            display() {return `Increase funding gain by ${format(this.power().times(100))}% per upgrade level. This effect stacks multiplicatively. <br><br> Cost: ${format(this.cost())} Money <br><br> Effect: ${format(this.effect())}x Funds`},
            purchaseLimit() {
                let base = 100
                if (hasUpgrade("sorbet", 33)) base = base + 50
                if (hasUpgrade("sorbet", 44)) base = base + 50
                return base
            },
            cost() {
                let baseCost = new Decimal(5000)
                let expBase = new Decimal(getBuyableAmount(this.layer, this.id))
                let mulBase = new Decimal(1.77)

                if (hasMilestone("universe", 16)) mulBase = mulBase.times(1.1)
                if (hasMilestone("universe", 24)) mulBase = mulBase.times(1.05)

                return baseCost.times(mulBase.pow(expBase))
            },
            canAfford() {return player.money.points.gte(this.cost())},
            buy() {
                player.money.points = player.money.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            power() {
                let base = new Decimal(0.15)
                if (hasUpgrade("booster", 13)) base = base.times(1.2)
                if (hasUpgrade("sorbet", 25)) base = base.times(1.2)
                return base
            },
            effect() {
                let base = new Decimal(1).add(this.power())
                base = base.pow(getBuyableAmount(this.layer, this.id))
                return base
            }
        },

        12: {
            title() {return jarbler("Planetary Terminal", "αβξδεφγηιςκλμνοπθρστυωωχψζΑΒΞΔΕΦΓΗΙJΚΛΜΝΟΠΘΡΣΤΥΩΩΧΨΖ") + `<br><br> Level ${getBuyableAmount(this.layer, this.id)}/${this.purchaseLimit()}<br>`},
            display() {return `Increase <b>Upgrade 1-1</b>'s effect by ${format(this.power().times(100))}% per upgrade level. This effect stacks multiplicatively. <br><br> Cost: ${format(this.cost())} Money <br><br> Effect: ${format(this.effect())}x Upgrade 1-1's effect`},
            purchaseLimit() {
                let base = 70
                if (hasMilestone("universe", 23)) base = base + 30
                if (hasUpgrade("sorbet", 22)) base = base + 100
                if (hasUpgrade("sorbet", 44)) base = base + 50
                return base
            },
            cost() {
                let baseCost = new Decimal(11500)
                let expBase = new Decimal(getBuyableAmount(this.layer, this.id))
                let mulBase = new Decimal(1.33)

                if (hasMilestone("universe", 17)) mulBase = mulBase.times(1.15)

                return baseCost.times(mulBase.pow(expBase))
            },
            canAfford() {return player.money.points.gte(this.cost())},
            buy() {
                player.money.points = player.money.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            power() {
                let base = new Decimal(0.045)
                if (hasUpgrade("booster", 13)) base = base.times(1.2)
                if (hasUpgrade("sorbet", 22)) base = base.times(1.25)
                if (hasUpgrade("sorbet", 25)) base = base.times(1.2)
                return base
            },
            effect() {
                let base = new Decimal(1).add(this.power())
                base = base.pow(getBuyableAmount(this.layer, this.id))
                return base
            }
        }
    },
    branches: [["booster", 2], ["sorbet", 2]],
    autoUpgrade() {return hasUpgrade("booster", 24)}
    
})