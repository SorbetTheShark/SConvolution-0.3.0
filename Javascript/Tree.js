var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: [
        ["universe", "ach"],
        ["money"],
        ["booster", "sorbet"]
    ]

    
}

function treeSetups() {
	let base = [
		["universe", "ach"],
		["money"],
		["booster", "sorbet"]
	]

	layoutInfo.treeLayout = base
}

addNode("null", {
    layerShown: "ghost"
})

addLayer("tree-tab", {
    tabFormat: [
        ["tree", function() {return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)}]
    ],
    previousTab: "",
    leftTab: true
})