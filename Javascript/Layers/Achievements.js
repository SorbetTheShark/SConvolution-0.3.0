addLayer("ach", {
    startData() {return {
        unlocked() {return hasMilestone("universe", 13)},
        points: new Decimal(0),
    }},
    color: "#F2E279",
    symbol: "ACH",
    layerShown() {return hasMilestone("universe", 13)},
    row: 5867,
    resource: "Achievement Points",
    type: "none",
    microtabs: {
        index: {
            "Achievements": {
                content: ["blank", "achievements"]
            },

            "AP Milestones": {
                content: ["blank", "milestones"]
            }
        }
    },
    tabFormat: [
        "main-display",
        "blank",
        ["bar", "completionBar"],
        "blank",
        ["display-text", "<i/>Achievements do not reset upon a Universal Destruction event. <br><br> <b/> AP = Achievement Points"],
        "blank",
        ["microtabs", "index"]
    ],
    tooltip: "Achievements",
    branches: [["universe", 2]],
    componentStyles: {
        "microtabs"() {return {"border-color":"transparent"}},
        "milestone"() {return {"width":"600px"}}
    },
    achievements: {
        11: {
            name: "Millionaire",
            done() {return player.money.points.gte("e6")},
            unlocked() {return hasMilestone("universe", 13)},
            tooltip: "Reach 1,000,000 Money <br><br> (1 AP)",
            onComplete() {player.ach.points = player.ach.points.add(1)}
        },

        12: {
            name: "Billionaire",
            done() {return player.money.points.gte("e9")},
            unlocked() {return hasMilestone("universe", 16)},
            tooltip: "Reach 1.00e9 Money <br><br> (2 AP)",
            onComplete() {player.ach.points = player.ach.points.add(2)}
        },

        13: {
            name: "Trillionaire",
            done() {return player.money.points.gte("e12")},
            unlocked() {return hasMilestone("universe", 18)},
            tooltip: "Reach 1.00e12 Money <br><br> (3 AP)",
            onComplete() {player.ach.points = player.ach.points.add(3)},
        },

        14: {
            name: "Quintil-<br>lionaire",
            done() {return player.money.points.gte("e18")},
            unlocked() {return hasMilestone("universe", 20)},
            tooltip: "Reach 1.00e18 Money <br><br> (4 AP)",
            onComplete() {player.ach.points = player.ach.points.add(4)}
        },

        15: {
            name: "Viginti-<br>llionaire",
            done() {return player.money.points.gte("e63")},
            unlocked() {return hasMilestone("universe", 28)},
            tooltip: "Reach 1.00e63 Money <br><br> (5 AP)",
            onComplete() {player.ach.points = player.ach.points.add(5)}
        },

        21: {
            name: "Sun",
            done() {return player.booster.points.gte(5)},
            unlocked() {return hasMilestone("universe", 18)},
            tooltip: "Reach 5 Boosters <br><br> (1 AP)",
            onComplete() {player.ach.points = player.ach.points.add(1)}
        },

        22: {
            name: "Alpha Centauri",
            done() {return player.booster.points.gte(10)},
            unlocked() {return hasMilestone("universe", 18)},
            tooltip: "Reach 10 Boosters <br><br> (2 AP)",
            onComplete() {player.ach.points = player.ach.points.add(2)}
        },

        23: {
            name: "Procyon",
            done() {return player.booster.points.gte(25)},
            unlocked() {return hasMilestone("universe", 18)},
            tooltip: "Reach 25 Boosters <br><br> (3 AP)",
            onComplete() {player.ach.points = player.ach.points.add(3)}
        },

        24: {
            name: "Wolf 1061",
            done() {return player.booster.points.gte(35)},
            unlocked() {return hasMilestone("universe", 20)},
            tooltip: "Reach 35 Boosters <br><br> (4 AP)",
            onComplete() {player.ach.points = player.ach.points.add(4)}
        },

        31: {
            name: "C",
            done() {return player.sorbet.points.gte(25000)},
            unlocked() {return player.sorbet.unlocked},
            tooltip() {return `Reach 25,000 ${temp.sorbet.resource} <br><br> (1 AP)`},
            onComplete() {player.ach.points = player.ach.points.add(1)}
        },

        32: {
            name: "O",
            done() {return player.sorbet.points.gte("e6")},
            unlocked() {return hasMilestone("universe", 27)},
            tooltip() {return `Reach 1,000,000 ${temp.sorbet.resource} <br><br> (2 AP)`},
            onComplete() {player.ach.points = player.ach.points.add(2)}
        },

        33: {
            name: "L",
            done() {return player.sorbet.points.gte("e17")},
            unlocked() {return hasMilestone("universe", 28)},
            tooltip() {return `Reach 1.00e17 ${temp.sorbet.resource} <br><br> (3 AP)`},
            onComplete() {player.ach.points = player.ach.points.add(3)}
        }
    },

    milestones: {
        11: {
            requirementDescription: "3 Achievement Points",
            effectDescription: "Point gain and funding gain are doubled.",
            done() {return player.ach.points.gte(3)},
            unlocked() {return hasMilestone("universe", 16)}
        },

        12: {
            requirementDescription: "10 Achievement Points",
            effectDescription: "The first booster effect's softcap starts 5,000 later.",
            done() {return player.ach.points.gte(10)},
            unlocked() {return hasMilestone("universe", 18)}
        },

        13: {
            requirementDescription: "20 Achievement Points",
            effectDescription: "Point gain is tripled and divide booster costs by 10.",
            done() {return player.ach.points.gte(20)},
            unlocked() {return hasMilestone("universe", 27)}
        }
    },

    bars: {
        completionBar: {
            direction: RIGHT,
            width: 600,
            height: 50,
            progress() {return player.ach.points.div(31)},
            display() {return `Progress to 100% game completion: ${format(this.progress().times(100))}%`},
            fillStyle() {return {'background-color': '#F2E279'}},
            borderStyle() {return {'border-color': '#E0D060', 'border-radius': '50px'}}
        }
    },
})