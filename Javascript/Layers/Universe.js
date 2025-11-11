addLayer("universe", {
    startData() {return {
        unlocked: true,
        points: new Decimal(0),
        resetTime: 0,

        symbol: "",

        anger: new Decimal(1),

        buffDisplay: "",
    }},
    update() {
        player.universe.buffDisplay = ""
        if (hasMilestone("universe", 14)) {
            let base = new Decimal(0)
            if (hasMilestone("universe", 25)) {
                base = player.universe.anger.times(player.universe.anger.log(10))
            } else {
                base = player.universe.anger
            }
            if (hasMilestone("universe", 15)) base = base.pow(2)
            if (hasMilestone("universe", 18)) base = base.pow(2)
            if (hasMilestone("universe", 27)) base = base.pow(1.4)
            player.universe.buffDisplay += `Total boost from <crimson>Milestone 4</crimson>: x${format(base)} Overflow Cost <br>`
        }


        player.universe.symbol = `Universe ${player.universe.points.add(1)}`

    },
    color: "#5A5A5A",
    symbol() {return player.universe.symbol},
    layerShown: true,
    row: 999,
    resource: "Destroyed Universes",
    hotkeys: [
        {
            key: "U",
            description: "Shift + U: Overflow the current universe with points, destroying everything...",
            onPress() {doReset("universe")}
        }
    ],
    type: "static",
    baseResource: "Points",
    baseAmount() {return player.points},
    requires: new Decimal(100000),
    base: 5.455,
    exponent: 1.08,
    roundUpCost: true,
    prestigeButtonText() {return `Destroy current universe and reset ALL PREVIOUS PROGRESS<br> <br> Overflow Needed: ${formatWhole(player.points)} / ${format(getNextAt(this.layer, canMax = false, useType = "static"))} Points`},
    microtabs: {
        index: {
            Modifiers: {
                content: [
                    "blank",
                    ["display-text", () => `<h2> <crazedCrimson> Anger: ${format(player.universe.anger)} </h2> </crazedCrimson>`],
                    "blank",
                    ["display-text", () => player.universe.buffDisplay],
                    "blank",
                    "milestones", 
                    "achievements"
                ]
            },

            Replay: {
                content: [
                    "blank", "clickables"
                ]
            }
        }
    },
    clickables: {
        11: {
            display() {return "<h1/>Replay Universe 11 Speech"},
            style: {"width":"600px", "height":"50px", "border-radius":"0", "margin":"5px"},
            canClick() {return player.universe.points.gte(10)},
            unlocked() {return this.canClick()},
            onClick() {doSpeech(1)}
        },

        12: {
            display() {return "<h1/>Scare Sorbet"},
            style: {"width":"600px", "height":"50px", "border-radius":"0", "margin":"5px"},
            canClick() {return player.universe.points.gte(11)},
            unlocked() {return this.canClick()},
            onClick() {startleify("Sorbet")}
        }
    },

    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        ["display-text", () => `<crazedCrimson/>Time Since last Universal Destruction: ${format(player.universe.resetTime)} Seconds`],
        "blank",
        ["bar", "overflowBar"],
        "blank",
        ["microtabs", "index"]
    ],
    componentStyles: {
        "microtabs"() {return {"border-color":"transparent"}},
        "prestige-button"() {return {"width":"400px"}},
        "milestone"() {return {"width":"600px"}}
    },
    tooltip: "Multiverse",
    branches: [["money", 2]],
    nodeStyle() {return {"width":"350px", "border-radius":"15px"}},
    milestones: {
        11: {
            requirementDescription: "1 Destroyed Universe",
            done() {return player.universe.points.gte(1)},
            effectDescription() {return `Gain 10% less funds on <nocturnalNavy>M Node</nocturnalNavy> reset. <br> <crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/>Unlock the 3rd row of upgrades on <b>M Node</b>.`},
            onComplete() {player.universe.anger = player.universe.anger.times(1.1)}
        },

        12: {
            requirementDescription: "2 Destroyed Universes",
            done() {return player.universe.points.gte(2)},
            effectDescription() {return `Gain 12% less points overall. <br> <crazedCrimson style='text-shadow: ${player.cX}px ${player.cY}px 3px purple'/>Unlock the 4th row of upgrade on <b>M Node</b>.`},
            onComplete() {player.universe.anger = player.universe.anger.times(1.2)},
            unlocked() {return player.universe.points.gte(1)}
        },

        13: {
            requirementDescription: "3 Destroyed Universes",
            done() {return player.universe.points.gte(3)},
            effectDescription() {return `Upgrade 1-1 in <nocturnalNavy>M Node</nocturnalNavy> is 5% weaker. <br> <crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/>Unlock Achievements Node and 1 Achievement.`},
            onComplete() {player.universe.anger = player.universe.anger.times(1.3)},
            unlocked() {return player.universe.points.gte(2)}
        },

        14: {
            requirementDescription: "4 Destroyed Universes",
            done() {return player.universe.points.gte(4)},
            effectDescription() {return `Current anger boosts overflow needed to destroy a universe. <br><crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/> Unlock a buyable in M Node.`},
            onComplete() {player.universe.anger = player.universe.anger.times(1.4)},
            unlocked() {return player.universe.points.gte(3)}
        },

        15: {
            requirementDescription: "5 Destroyed Universes",
            done() {return player.universe.points.gte(5)},
            effectDescription() {return `The previous milestone's debuff is much stronger. (anger -> anger<sup>2</sup>) <br><crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/> Unlock an upgrade in M Node.`},
            onComplete() {player.universe.anger = player.universe.anger.times(1.5)},
            unlocked() {return player.universe.points.gte(4)}
        },

        16: {
            requirementDescription: "6 Destroyed Universes",
            done() {return player.universe.points.gte(6)},
            effectDescription() {return `<b>Desolate Rift</b> buyable in <nocturnalNavy>M Node</nocturnalNavy> scales 10% faster in cost. <br><crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/> Unlock another buyable in M Node and 1 Achievement.`},
            onComplete() {player.universe.anger = player.universe.anger.times(1.6)},
            unlocked() {return player.universe.points.gte(5)}
        },

        17: {
            requirementDescription: "7 Destroyed Universes",
            done() {return player.universe.points.gte(7)},
            effectDescription() {return `<b>Planetary Terminal</b> buyable in <nocturnalNavy>M Node</nocturnalNavy> scales 15% faster in cost. <br><crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/> Unlock a new layer, the layer's first effect, and the first upgrade.`},
            onComplete() {player.universe.anger = player.universe.anger.times(1.7)},
            unlocked() {return player.universe.points.gte(6)}
        },

        18: {
            requirementDescription: "8 Destroyed Universes",
            done() {return player.universe.points.gte(8)},
            effectDescription() {return `Milestone 4's debuff is squared again. <br> <crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/> Unlock an upgrade in BST Node, along with another effect and achievements.`},
            onComplete() {player.universe.anger = player.universe.anger.times(1.8)},
            unlocked() {return player.universe.points.gte(7)}
        },

        19: {
            requirementDescription: "9 Destroyed Universes",
            done() {return player.universe.points.gte(9)},
            effectDescription() {return `Gain 15% less funds on <nocturnalNavy>M Node</nocturnalNavy> reset. <br> <crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/> Unlock more BST Node upgrades and Upgrade 1-1 is twice as effective.`},
            onComplete() {player.universe.anger = player.universe.anger.times(1.9)},
            unlocked() {return player.universe.points.gte(8)}
        },

        20: {
            requirementDescription: "10 Destroyed Universes",
            done() {return player.universe.points.gte(10)},
            effectDescription() {return `<flamingForest>Don't make this harder than it has to be.</flamingForest> <br> <crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/> A little bit of everything in BST Node, along with more achievements.`},
            onComplete() {
                player.universe.anger = player.universe.anger.times(2.0)
                doSpeech(1)
            },
            unlocked() {return player.universe.points.gte(9)}
        },

        21: {
            requirementDescription: "11 Destroyed Universes",
            done() {return player.universe.points.gte(11)},
            effectDescription() {return `The cost of boosters scale 5% faster multiplicatively. <br> <crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/> Hall Effect Thruster and Cold Gas Thruster's effects are cubed.`},
            onComplete() {
                player.universe.anger = player.universe.anger.times(2.1)
                startleify("Sorbet")
            },
            unlocked() {return player.universe.points.gte(10)}
            
        },

        22: {
            requirementDescription: "12 Destroyed Universes",
            done() {return player.universe.points.gte(12)},
            effectDescription() {return `The first 2 booster effect's softcaps are twice as strong. <br> <crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/> Unlock 2 new booster upgrades and all current softcaps start 1 OoM later.`},
            onComplete() {
                player.universe.anger = player.universe.anger.times(2.2)
                startleify("Sorbet")
            },
            unlocked() {return player.universe.points.gte(11)}
        },

        23: {
            requirementDescription: "13 Destroyed Universes",
            done() {return player.universe.points.gte(13)},
            effectDescription() {return `The third booster effect's softcap starts 1.5 OoMs sooner. <br> <crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/> Unlock 1 booster upgrade and Planetary Terminal has 30 more max levels.`},
            onComplete() {
                player.universe.anger = player.universe.anger.times(2.3)
                startleify("Sorbet")
            },
            unlocked() {return player.universe.points.gte(12)}
        },

        24: {
            requirementDescription: "14 Destroyed Universes",
            done() {return player.universe.points.gte(14)},
            effectDescription() {return `<b>Desolate Rift</b> buyable in <nocturnalNavy>M Node</nocturnalNavy> scales 5% faster in cost. <br> <crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/> Unlock 2 Booster upgrades and Ion Thruster's effect is squared.`},
            onComplete() {
                player.universe.anger = player.universe.anger.times(2.4),
                startleify("Sorbet")
            },
            unlocked() {return player.universe.points.gte(13)}
        },

        25: {
            requirementDescription: "15 Destroyed Universes",
            done() {return player.universe.points.gte(15)},
            effectDescription() {return `Milestone 4's debuff scales faster. <br> <crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/> Unlock Iteration 1 of Sorbet, therefore unlocking a new layer.`},
            onComplete() {
                player.universe.anger = player.universe.anger.times(2.5)
                startleify("Sorbet")
            },
            unlocked() {return player.universe.points.gte(14)}
        },

        26: {
            requirementDescription: "16 Destroyed Universes",
            done() {return player.universe.points.gte(16)},
            effectDescription() {return `Divide point gain by 25 and divide funding gain by 4. <br> <crazedCrimson style="text-shadow: ${player.cX}px ${player.cY}px 3px purple"/> Unlock an upgrade in Sorbet's Layer.`},
            onComplete() {
                player.universe.anger = player.universe.anger.times(2.6)
                startleify("Sorbet")
            },
            unlocked() {return player.universe.points.gte(15)}
        },

        27: {
            requirementDescription: "17 Destroyed Universes",
            done() {return player.universe.points.gte(17)},
            effectDescription() {return `Milestone 4's debuff scales much faster. <br><crazedCrimson style="text-shadow:${player.cX}px ${player.cY}px 3px purple"/> Unlock another row of Sorbet's upgrades.`},
            onComplete() {
                player.universe.anger = player.universe.anger.times(2.7),
                startleify("Sorbet")
            },
            unlocked() {return player.universe.points.gte(16)}
        },

        28: {
            requirementDescription: "18 Destroyed Universes",
            done() {return player.universe.points.gte(18)},
            effectDescription() {return `The first 2 sorbet upgrade's powers are 10% weaker. <br><crazedCrimson style="text-shadow:${player.cX}px ${player.cY}px 3px purple"/>Unlock the fourth row of Sorbet's upgrades and you can buy max boosters.`},
            onComplete() {
                player.universe.anger = player.universe.anger.times(2.8),
                startleify("Sorbet")
            },
            unlocked() {return player.universe.points.gte(17)}
        },

        29: {
            requirementDescription: "<small><small>28 Destroyed Universes (Got a long way going if you're seeing this for the first time)</small></small>",
            done() {return player.universe.points.gte(28)},
            effectDescription() {return `Milestone 4's effect is somewhat stronger. <br><crazedCrimson style="text-shadow:${player.cX}px ${player.cY}px 3px purple"/> Unlock Sorbet's last upgrade in the 4th row.`},
            onComplete() {
                player.universe.anger = player.universe.anger.times(3.8),
                startleify("Sorbet")
            },
            unlocked() {return player.universe.points.gte(18)}
        },

        30: {
            requirementDescription: "29 Destroyed Universes",
            done() {return player.universe.points.gte(29)},
            effectDescription() {return `Upgrade 2-3 in <nocturnalNavy>M Node</nocturnalNavy> is 20% weaker. <br><crazedCrimson style="text-shadow:${player.cX}px ${player.cY}px 3px purple"/> Unlock the 4th booster effect.`},
            onComplete() {
                player.universe.anger = player.universe.anger.times(3.9),
                startleify("Sorbet")
            },
            unlocked() {return hasMilestone("universe", 29)}
        }
    },
    gainMult() {
        let base = new Decimal(1)
        if (hasMilestone("universe", 14)) {
            if (hasMilestone("universe", 25)) {
                base = base.times(player.universe.anger.times(player.universe.anger.log(10)))
            } else {
                base = base.times(player.universe.anger)
            }
            if (hasMilestone("universe", 15)) base = base.pow(2)
            if (hasMilestone("universe", 18)) base = base.pow(2)
            if (hasMilestone("universe", 27)) base = base.pow(1.4)
        }
        return base
    },
    bars: {
        overflowBar: {
            direction: RIGHT,
            width: 600,
            height: 50,
            progress() {return player.points.log(10).div(getNextAt("universe", canMax = false, useType = "static").log(10))},
            display() {return `${format(this.progress().times(100), 3)}% to Overflow (Log<sub>10</sub> Scaling)`},
            fillStyle() {return {'background-color':'#5A5A5A'}},
            borderStyle() {return {'border-color':'#404040', 'border-radius':'50px'}}
        }
    },
    onPrestige() {
        player.points = new Decimal(0)
    }
})