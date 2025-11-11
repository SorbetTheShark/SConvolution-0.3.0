addLayer("permastones", {
    startData() {return {
         unlocked() {return player.permaMilestoneUnlocks[0]},
    }},
    color: "#F3A9C3",
    symbol: "PS",
    layerShown() {return player.permastones.unlocked()},
    row: "side",
    type: "none",
    tooltip: "Permastones",
    microtabs: {
        index: {
            'Sorbet': {
                content: ["blank", ["milestone", 1001], ["milestone", 1002], ["milestone", 1003]],
                unlocked() {return player.permaMilestoneUnlocks[0]}
            },

            "Colin": {
                content: "blank",
                unlocked() {return false}
            },

            "GodDoge": {
                content: "blank",
                unlocked() {return false}            
            },

            "DanTheSurvivor": {
                content: "blank",
                unlocked() {return false}
            },

            "JackTheJournalist": {
                content: "blank",
                unlocked() {return false}            },

            "Grahhhzaaaa": {
                content: "blank",
                unlocked() {return false}
            },
            
            "LuciFurr": {
                content: "blank",
                unlocked() {return false}
            },

            "ChrisTCereja": {
                content: "blank",
                unlocked() {return false}
            },

            "MrElite101Games": {
                content: "blank",
                unlocked() {return false}
            },

            "GREED": {
                content: "blank",
                unlocked() {return false}
            },

            "Cudjikxmx": {
                content: "blank",
                unlocked() {return false}
            },

            "Zneith": {
                content: "blank",
                unlocked() {return false}
            },

            "Revenge": {
                content: "blank",
                unlocked() {return false}
            },

            "Moses": {
                content: "blank",
                unlocked() {return false}
            },

            "Burger": {
                content: "blank",
                unlocked() {return false}
            },

            "Lumossity": {
                content: "blank",
                unlocked() {return false}
            },

            "Albino Squid": {
                content: "blank",
                unlocked() {return false}
            }
        }
    },
    tabFormat: [
        "blank",
        ["microtabs", "index"],
    ],
    componentStyles: {
        "microtabs"() {return {"border-color":"transparent", "height":"auto"}},
        "milestone"() {return {"width":"600px"}}
    },
    milestones: {
        1001: {
            requirementDescription: "<br>Permastone Character Category Unlock",
            done() {return player.permaMilestoneUnlocks[0]},
            effectDescription: "Triple point gain and divide booster costs by 2.25.",
            unlocked() {return player.permaMilestoneUnlocks[0]}
        },

        1002: {
            requirementDescription() {return `<br>1.00e27 ${temp.sorbet.resource}`},
            done() {return player.sorbet.points.gte("e27")},
            effectDescription: "The 1st booster's effect is raised to the power of 1.1 after softcap.",
            unlocked() {return player.permaMilestoneUnlocks[0]}
        },

        1003: {
            requirementDescription() {return `<br>1.00e34 ${temp.sorbet.resource} (CURRENTLY UNOBTAINABLE)`},
            done() {return player.sorbet.points.gte("e34")},
            effectDescription: "The first two Sorbet upgrade's powers are 15% stronger.",
            unlocked() {return player.permaMilestoneUnlocks[0]}
        }
    }
})