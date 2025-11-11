addLayer("booster", {
    startData() {return {
        unlocked() {return player.universe.points.gte(7)},
        points: new Decimal(0),
        total: new Decimal(0),
        best: new Decimal(0),
        resetTime: 0,

        buffDisplay: "",
        buffList: [],

        buffDisplay2: "",

    }},
    color: "#5F9EA0",
    symbol: "BST",
    layerShown() {return player.universe.points.gte(7)},
    row: 2,
    resource: "Boosters",
    hotkeys: [
        {
            key: "b",
            description: "B: Reset Funding and Points for Boosters",
            onPress() {if (player.booster.unlocked) doReset("booster")},
            unlocked() {return player.booster.unlocked}
        }
    ],
    type: "static",
    baseResource: "Money",
    baseAmount() {return player.money.points},
    requires: new Decimal("e9"),
    base: 3.995,
    exponent: 1.250,
    roundUpCost: true,
    update() {
        player.booster.buffList = [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)]
        player.booster.buffDisplay = ``

        // Buff 01
        if (player.booster.unlocked) {
            let amt = new Decimal(player.booster.points)
            let powBase = new Decimal(2.05)

            if (hasUpgrade("booster", 24)) powBase = powBase.times(1.15)

            player.booster.buffList[0] = powBase.pow(amt)
            if (hasUpgrade("booster", 11)) player.booster.buffList[0] = player.booster.buffList[0].times(upgradeEffect("booster", 11))

            // Softcap
            let softcapLimit = new Decimal(20000)
            if (hasMilestone("ach", 12)) softcapLimit = softcapLimit.add(5000)
            let softcapPower = new Decimal(0.25)

            if (hasMilestone("universe", 22)) softcapPower = softcapPower.div(2)
            if (hasMilestone("universe", 22)) softcapLimit = softcapLimit.times(10)
            if (hasUpgrade("booster", 24)) softcapLimit = softcapLimit.times(100)
            if (hasUpgrade("booster", 41)) softcapLimit = softcapLimit.times(new Decimal(10).pow(0.8))
            if (hasUpgrade("sorbet", 41)) softcapLimit = softcapLimit.times(new Decimal(10).pow(2.5))

            if (player.booster.buffList[0].gte(softcapLimit)) player.booster.buffList[0] = new Decimal(softcapLimit).add(player.booster.buffList[0].sub(softcapLimit).pow(softcapPower))

            if (hasUpgrade("booster", 21)) player.booster.buffList[0] = player.booster.buffList[0].times(upgradeEffect("booster", 21))
            if (hasMilestone("permastones", 1002)) player.booster.buffList[0] = player.booster.buffList[0].pow(1.1)

            player.booster.buffDisplay += `x${format(player.booster.buffList[0])} <crimson>Points</crimson> <small>(Softcaps at ${formatWhole(softcapLimit)} multiplier)</small> <br> <small style="color:gray">Softcap Power: ${formatWhole(softcapLimit)} + (x - ${formatWhole(softcapLimit)})<sup>${format(softcapPower)}</small> <br> <small style="color:gray"> Effect Power: ${format(powBase)} </small><br><br>`
        } else {
            player.booster.buffDisplay += `<h3> Boost Unlocks at Universe 8 <br>`
        }

        // Buff 02
        if (hasMilestone("universe", 18)) {
            let amt = new Decimal(player.booster.points)
            let powBase = new Decimal(1.5)

            if (hasUpgrade("booster", 24)) powBase = powBase.times(1.15)

            player.booster.buffList[1] = powBase.pow(amt)
            if (hasUpgrade("booster", 12)) player.booster.buffList[1] = player.booster.buffList[1].times(upgradeEffect("booster", 11))


            // Softcap
            let softcapLimit = new Decimal(1000)
            let softcapPower = new Decimal(0.15)

            if (hasMilestone("universe", 22)) softcapPower = softcapPower.div(2)
            if (hasMilestone("universe", 22)) softcapLimit = softcapLimit.times(10)
            if (hasUpgrade("booster", 24)) softcapLimit = softcapLimit.times(100)
            if (hasUpgrade("booster", 41)) softcapLimit = softcapLimit.times(new Decimal(10).pow(0.8))
             if (hasUpgrade("sorbet", 41)) softcapLimit = softcapLimit.times(new Decimal(10).pow(2.5))

            if (player.booster.buffList[1].gte(softcapLimit)) player.booster.buffList[1] = new Decimal(softcapLimit).add(player.booster.buffList[1].sub(softcapLimit).pow(softcapPower))

            if (hasUpgrade("booster", 21)) player.booster.buffList[1] = player.booster.buffList[1].times(upgradeEffect("booster", 21))

            player.booster.buffDisplay += `x${format(player.booster.buffList[1])} <crimson>Funds</crimson> <small>(Softcaps at ${formatWhole(softcapLimit)} multiplier)</small> <br> <small style="color:gray">Softcap Power: ${formatWhole(softcapLimit)} + (x - ${formatWhole(softcapLimit)})<sup>${format(softcapPower)}</small> <br> <small style="color:gray"> Effect Power: ${format(powBase)} </small> <br><br>`
        } else {
            player.booster.buffDisplay += `<h3> Boost Unlocks at Universe 9 <br>`
        }

        // Buff 03
        if (hasMilestone("universe", 20)) {
            let amt = new Decimal(player.booster.points)
            let powBase = new Decimal(1.45)

            if (hasUpgrade("booster", 24)) powBase = powBase.times(1.15)

            player.booster.buffList[2] = powBase.pow(amt)
            if (hasUpgrade("booster", 22)) player.booster.buffList[2] = player.booster.buffList[2].pow(2)

            // Softcap
            let softcapLimit = new Decimal(2000000)
            let softcapPower = new Decimal(0.05)

            if (hasMilestone("universe", 22)) softcapLimit = softcapLimit.times(10)
            if (hasUpgrade("booster", 24)) softcapLimit = softcapLimit.times(100)
            if (hasMilestone("universe", 23)) softcapLimit = softcapLimit.div(new Decimal(10).pow(1.5))
            if (hasUpgrade("booster", 41)) softcapLimit = softcapLimit.times(new Decimal(10).pow(0.8))
            if (hasUpgrade("sorbet", 21)) softcapLimit = softcapLimit.times(new Decimal(10).pow(1.85))
             if (hasUpgrade("sorbet", 41)) softcapLimit = softcapLimit.times(new Decimal(10).pow(2.5))

            if (player.booster.buffList[2].gte(softcapLimit)) player.booster.buffList[2] = new Decimal(softcapLimit).add(player.booster.buffList[2].sub(softcapLimit).pow(softcapPower))
            
            if (hasUpgrade("booster", 33)) player.booster.buffList[2] = player.booster.buffList[2].times(upgradeEffect("booster", 21))

            player.booster.buffDisplay += `/${format(player.booster.buffList[2])} <crimson>Booster Cost</crimson> <small>(Softcaps at ${formatWhole(softcapLimit)} multiplier)</small> <br> <small style="color:gray">Softcap Power: ${formatWhole(softcapLimit)} + (x - ${formatWhole(softcapLimit)})<sup>${format(softcapPower)}</small> <br> <small style="color:gray"> Effect Power: ${format(powBase)} </small> <br><br>`
        } else {
            player.booster.buffDisplay += `<h3> Boost Unlocks at Universe 11 <br>`
        }

        // Buff 04
        if (hasMilestone("universe", 30)) {
            let amt = player.booster.points
            let powBase = new Decimal(1.06)

            player.booster.buffList[3] = powBase.pow(amt)

            // Softcap
            let softcapLimit = new Decimal(10000)
            let softcapPower = new Decimal(0.11)

            if (player.booster.buffList[3].gte(softcapLimit)) player.booster.buffList[3] = new Decimal(softcaplimit).add(player.booster.buffList[3].sub(softcapLimit).pow(softcapPower))
            
            player.booster.buffDisplay += `x${format(player.booster.buffList[3])}<crimson> ${temp.sorbet.resource} </crimson><small>(Softcaps at ${formatWhole(softcapLimit)} multiplier)</small><br> <small style="color:gray">Softcap Power: ${formatWhole(softcapLimit)} + (x - ${formatWhole(softcapLimit)})<sup>${format(softcapPower)}</sup></small><br><small style="color:gray"> Effect Power: ${format(powBase)}</small><br>`

        } else {
            player.booster.buffDisplay += `<h3> Boost Unlocks at Universe 30 <br>`
        }

        player.booster.buffDisplay2 = ``

        if (hasUpgrade("booster", 11)) {
            if (hasUpgrade("booster", 12)) {
                player.booster.buffDisplay2 += `Total Boost from <crimson>Cold Gas Thruster</crimson>: x${format(upgradeEffect("booster", 11))} <crimson>Effect 1 & Effect 2</crimson> <br>`
            } else {
                player.booster.buffDisplay2 += `Total Boost from <crimson>Cold Gas Thruster</crimson>: x${format(upgradeEffect("booster", 11))} <crimson>Effect 1</crimson> <br>`
            }
        }

        if (hasUpgrade("booster", 21)) {
            if (hasUpgrade("booster", 33)) {
                player.booster.buffDisplay2 += `Total Boost from <crimson>Hall Effect Thruster</crimson> x${format(upgradeEffect("booster", 21))} <crimson>Effect 1, Effect 2, Effect 3 PS</crimson> <br>`
            } else {
                player.booster.buffDisplay2 += `Total Boost from <crimson>Hall Effect Thruster</crimson>: x${format(upgradeEffect("booster", 21))} <crimson>Effect 1 & Effect 2 PS</crimson> <br>`
            }
        }

        if (hasUpgrade("booster", 22)) {
            player.booster.buffDisplay2 += `Total Boost from <crimson>Ion Thruster</crimson>: x<sup>${format(upgradeEffect("booster", 22))} </sup><crimson>Effect 3</crimson> <br>`
        }
    },
    tooltip: "Boosters",
    microtabs: {
        index: {
            Upgrades: {
                content: ["blank", ["display-text", () => player.booster.buffDisplay2], "blank", "upgrades"]
            },

            "Buff List": {
                content: ["blank", 
                    ["display-text", function() {return `<i style="color:gray">The quality of buffs depend on booster amount and the quantity of buffs are based on universes destroyed...</i> <br><br> <h3>${player.booster.buffDisplay}`}]
                ]
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
        "microtabs"() {return {"border-color":"transparent"}}
    },
    upgrades: {
        11: {
          title: "<nocturnalNavy/>Cold Gas Thruster",
          description: "The first booster's effect is stronger based on current Funds.",
          cost: new Decimal(3),
          effect() {
            let logBase = new Decimal("e6").times(player.money.points.add(1).log(10).add(1))
            let base = player.money.points.add(1).log(logBase).add(1)
            if (hasUpgrade("booster", 14)) base = base.pow(2)
            if (hasMilestone("universe", 21)) base = base.pow(3)
            if (hasUpgrade("booster", 23)) base = base.pow(1.25)
            if (hasUpgrade("booster", 32)) base = base.pow(1.5)
            if (hasUpgrade("booster", 41)) base = base.pow(2)
            return base
          },
          unlocked() {return player.booster.unlocked()}
        },

        12: {
            title: "<nocturnalNavy/>Electrohydrodynamic Thruster",
            description: "The second booster's effect is also boosted by the previous upgrade's effect.",
            cost: new Decimal(5),
            unlocked() {return hasMilestone("universe", 18) && hasUpgrade("booster", 11)}
        },

        13: {
            title: "<nocturnalNavy/>Electrodeless Plasma Thruster",
            description: "Both of the buyables in M Node are 20% stronger.",
            cost: new Decimal(7),
            unlocked() {return hasMilestone("universe", 19) && hasUpgrade("booster", 12)}
        },

        14: {
            title: "<nocturnalNavy/>Electrostatic Ion Thruster",
            description: "The first upgrade's effect is squared.",
            cost: new Decimal(10),
            unlocked() {return hasUpgrade("booster", 13)}
        },

        21: {
            title: "<nocturnalNavy/>Hall Effect Thruster",
            description: "Current boosters boost effects 1 & 2, applied after softcaps.",
            cost: new Decimal(12),
            effect() {
                let mult = new Decimal(0.1)
                let base = new Decimal(1).add(mult.times(player.booster.points))
                if (hasUpgrade("booster", 22)) base = base.times(1.12)
                if (hasMilestone("universe", 21)) base = base.pow(3)
                if (hasUpgrade("booster", 23)) base = base.pow(1.25)
                if (hasUpgrade("booster", 32)) base = base.pow(1.5)
                if (hasUpgrade("booster", 41)) base = base.times(3)
                if (hasUpgrade("sorbet", 24)) base = base.pow(1.33)
                if (hasUpgrade("sorbet", 31)) base = base.pow(1.33)
                return base
            },
            unlocked() {return hasMilestone("universe", 20) && hasUpgrade("booster", 14)}
        },

        22: {
            title: "<nocturnalNavy/>Ion Thruster",
            description: "The third booster's effect is squared, applied before softcap. The previous upgrade is 12% stronger.",
            cost: new Decimal(13),
            effect() {
                let powBase = new Decimal(2)
                if (hasUpgrade("booster", 23)) powBase = powBase.pow(1.25)
                if (hasMilestone("universe", 24)) powBase = powBase.pow(2)
                if (hasUpgrade("booster", 41)) powBase = powBase.pow(2)
                if (hasUpgrade("sorbet", 42)) powBase = powBase.pow(1.2)
                return powBase
            },
            unlocked() {return hasUpgrade("booster", 21)}
        },

        23: {
            title: "<nocturnalNavy/>Magnetoplasmadynamic Thruster",
            description: "All listed effects are raised to the power of 1.25.",
            cost: new Decimal(16),
            unlocked() {return hasMilestone("universe", 21) && hasUpgrade("booster", 22)}
        },

        24: {
            title: "<nocturnalNavy/>Pulsed Inductive Thruster",
            description: "The first 3 effect's power are 15% stronger whilst automatically buying M Node upgrades.",
            cost: new Decimal(18),
            unlocked() {return hasMilestone("universe", 22) && hasUpgrade("booster", 23)}
        },

        31: {
            title: "<nocturnalNavy/>Pulsed Plasma Thruster",
            description: "The first three effect's softcaps start 2 OoMs later.",
            cost: new Decimal(20),
            unlocked() {return hasUpgrade("booster", 24)}

        },

        32: {
            title: "<nocturnalNavy/>RF Resonant Cavity Thruster",
            description: "The first 2 upgrade effects are raised to the power of 1.5.",
            cost: new Decimal(25),
            unlocked() {return hasMilestone("universe", 23) && hasUpgrade("booster", 31)}
        },
        
        33: {
            title: "<nocturnalNavy/>Liquid Apogee Engine",
            description: "The second upgrade effect also boosts the third booster effect and the third upgrade effect is twice as powerful.",
            cost: new Decimal(26),
            style() {return {"width":"250px"}},
            unlocked() {return hasMilestone("universe", 24) && hasUpgrade("booster", 32)}
        },

        41: {
            title: "<nocturnalNavy/>Apogee Kick Motor",
            description: "The first upgrade effect is squared, the second upgrade effect is tripled, and the third upgrade effect is squared. The first 3 booster effect softcaps start 0.8 OoMs later.",
            cost: new Decimal(28),
            style() {return {"width":"500px"}},
            unlocked() {return hasUpgrade("booster", 33)}
        }
        
    },

    gainMult() {
        let base = new Decimal(1)
        if (hasMilestone("universe", 20)) base = base.div(player.booster.buffList[2])
        if (hasMilestone("universe", 21)) base = base.times(1.05)
        if (hasUpgrade("sorbet", 32)) base = base.div(upgradeEffect("sorbet", 32))
        if (hasMilestone("ach", 13)) base = base.div(10)
        if (hasMilestone("permastones", 1001)) base = base.div(2.25)
        return base
    },
    nodeStyle() {return {
        "transform":`translate(${player.cX * 15}px, ${player.cY * 15}px)`
    }},
    canBuyMax() {return hasMilestone("universe", 28)}
})