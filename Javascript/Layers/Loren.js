addLayer("loren", {
    startData() {return {
        unlocked: true
    }},
    color: "#7B7B7B",
    image: "Images/Icons/LorenICON.png",
    row: "side",
    layerShown: true,
    type: "none",
    resource: "",
    tooltip: "Handy Dandy Handbook",
    nodeStyle() {return {"background-size":"75%", "background-repeat":"no-repeat", "background-position":"center"}},
    tabFormat: [
        ["display-text", "<h3><i>\"A handy dandy handbook for your handy dandy info eh...\""],
        "blank",
        ["microtabs", "index"],
    ],
    microtabs: {
        index: {
            Layers: {
                content: ["blank", ["infobox", "ml01"], "blank", ["infobox", "ml02"], "blank", ["infobox", "ml03"]]
            },

            Characters: {
                content: ["blank", ["infobox", "char01"]],
                unlocked() {return true}
            },

            "Side Layers": {
                content: ["blank"]
            }
        }
    },
    infoboxes: {
        ml01: {
            title: "Funding [Universe 1 - 7]",
            body() {return "The first layer of the mod. Gather money to buy slow-progressing upgrades and destroy the first few universes."},
            titleStyle() {return {"background-color": "#659B45"}},
            bodyStyle() {return {"border-color":"#659B45", "text-align":"left", "padding-left":"10px"}},
            style() {return {"border-color":"#659B45"}},
        },

        ml02: {
            title: "Boosters [Universe 8 - 14]",
            body() {return "The second layer of the mod. Aquire enough money and you'll be able to get your first booster. As you destroy more universes, boosters will become stronger by having more buffs."},
            titleStyle() {return {"background-color":"#5F9EA0"}},
            bodyStyle() {return {"border-color":"#5F9EA0", "text-align":"left", "padding-left":"10px"}},
            style() {return {"border-color":"#5F9EA0"}},
            unlocked() {return player.universe.points.gte(6)}
        },

        ml03: {
            title: "Sorbet's Layer [Universes 15 - 29]",
            body() {return "The second layer in the second main row. After getting a nonillion funds, assimilating it all into strange, sticky blobs can be an option. The first two upgrades (The big ones) pretty much explain the premise of power in numbers."},
            titleStyle() {return {"background-color":"#CCC"}},
            bodyStyle() {return {"border-color":"#CCC", "text-align":"left", "padding-left":"10px"}},
            style() {return {"border-color":"#CCC"}},
            unlocked() {return player.universe.points.gte(14)}
        },

        char01: {
            title: "Sorbet [Universe 11]",
            body() {
                let base = `<i>"Huh whuh what's going on..."</i><br><br>`

                if (player.universe.points.gte(15)) base += `Eh he looks somewhat human, but there's always something off about him. We caught him another day in the bathrooms accidently, but Sorbet wasn't human at all that time. Before we can process what was going on, he just... became human again. I refuse to believe what had happened for maybe I haven't slept long enough. He also refused to un-redact some information, which may become problematic in the future.<br><br>`
                if (player.universe.points.gte(16)) base += `<i>"It won't be problematic dammit. It's just one word."</i>`

                return base
            },
            titleStyle() {return {"background-color":"#F0EEE3"}},
            bodyStyle() {return {"border-color":"#F0EEE3"}},
            style() {return {"border-color":"#F0EEE3"}},
            unlocked() {return player.universe.points.gte(10)}
        }
    },
    componentStyles: {
        "microtabs"() {return {"border-color":"transparent"}}
    }
})