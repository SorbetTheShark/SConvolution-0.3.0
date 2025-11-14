let modInfo = {
	name: "Sorbet's Convolution",
	id: "changedspecialedition",
	author: "Sorbet",
	pointsName: "Points",
	modFiles: [
		"Tree.js",

		"Layers/Universe.js",
		"Layers/Money.js",
		"Layers/Achievements.js",
		"Layers/Booster.js",
		"Layers/SORBET.js",

		"layers/Side/Loren.js",
		"layers/Side/Permastones.js"
	],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0),
	offlineLimit: 1,
}


let VERSION = {
	num: "0.3.0",
	name: "This Game Isn't Even Trying to Hide It",
	withoutName: "",
}

let changelog = (
	`
	<h1> <RWetPaint> Changelog </RWetPaint> </h1> <br> <br>
	<small><i style="color: gray">"Why is everything so damn gooey here and why does it smell like latex..."</i></small><br>
	<small><i style="color: gray">"Nah it's just latex paint drying out. Just don't touch it under any circumstances..."</i></small><br>
	<small><i style="color: gray">"Why not?"</i></small> <br>
	<small><i style="color: gray">"Trust me, you wouldn't want to touch it if you value your humanity..."</i></small><br>
	<small><i style="color: gray">"Mouse cursors don't count they're not human."</i></small>
	<hr style='width:600px'> <br> <br>

	<h3><RWetPaint> v0.1.0 (Oops, Just the First Layer) </RWetPaint></h3> <br><br>
	Added Funding Layer <br>
	Added Achievements Layer <br>
	<crimson style="text-shadow: 0 0 3px purple"> Current Endgame: 7 Destroyed Universes </crimson>

	<br><br><br>

	<h3><RWetPaint> v0.1.1 (Money Money Money) </RWetPaint></h3> <br><br>
	Tweaked funding cost scaling <br>
	Tweaked upgrade 1-1's effect <br>
	<crimson style="text-shadow: 0 0 3px purple"> Current Endgame: 7 Destroyed Universes </crimson>

	<br><br><br>

	<h3><RWetPaint> v0.2.0 (Finally Some More Stuff) </RWetPaint></h3> <br><br>
	Tweaked upgrade 3-1's effect <br>
	LORE <br>
	Added Boosters Layer <br>
	Removed<crazedCrimson> ֲמַלְגַמָה </crazedCrimson> <br>
	Tweaked Universe Layer Overflow Requirements <br>
	Sorbet regurgitated the themes button... <br>
	<crimson style="text-shadow: 0 0 3px purple"> Current Endgame: 15 Destroyed Universes </crimson>

	<br><br><br>
	
	<h3><RWetPaint> v0.3.0 (This Game Isn't Even Trying to Hide It) </RWetPaint></h3> <br><br>
	Sorbet has arrived <br>
	Permanent Milestones?! Yes please! <br>
	Minor tweaks to something I forgor 💀 <br>
	Left some things for the peekers to find in the files 👀 <crimson>#letstakealook</crimson><br>
	<crimson style="text-shadow: 0 0 3px purple"> Current Endgame: 30 Destroyed Universes </crimson>`
)

let devMode = false

let winText = ``

var doNotCallTheseFunctionsEveryTick = ["jarbler"]

function getStartPoints() {return new Decimal(modInfo.initialStartPoints)}

function canGenPoints() {return true}

function getPointGen() {
	if(!canGenPoints() || (player.points.gte(getNextAt("universe")))) {
		return new Decimal(0)
	} else {
		let gain = new Decimal(1)
		if (hasUpgrade("money", 11)) gain = gain.times(upgradeEffect("money", 11))
		if (hasMilestone("universe", 12)) gain = gain.times(0.88)
		if (hasMilestone("ach", 11)) gain = gain.times(2)
		if (hasMilestone("universe", 17)) gain = gain.times(player.booster.buffList[0])
		if (hasMilestone("universe", 26)) gain = gain.div(25)
		if (hasUpgrade("sorbet", 12)) gain = gain.times(5)
		if (hasUpgrade("sorbet", 31)) gain = gain.times(5)
		if (hasMilestone("ach", 13)) gain = gain.times(3)
		if (hasMilestone("permastones", 1001)) gain = gain.times(3)
		return gain
	}
}

setInterval(function() {
	player.cX = (new Decimal(player.timePlayed).sin().times(new Decimal(Math.random() * 2))).times(new Decimal((Math.cos(player.timePlayed))).times(new Decimal(Math.random() * 2)))
	player.cY = (new Decimal(player.timePlayed).cos().times(new Decimal(Math.random() * 2))).times(new Decimal((Math.sin(player.timePlayed))).times(new Decimal(Math.random() * 2)))

	if (devMode == true) {
		player.devSpeed = new Decimal(10)
	} else {
		player.devSpeed = new Decimal(1)
	}

	treeSetups()
}, 50)

function addedPlayerData() { return {
	cX: 0,
	cY: 0,
	devSpeed: new Decimal(1),
	permaMilestoneUnlocks: [false /* Sorbet */]
}}

var displayThings

function isEndgame() {return player.universe.points.gte(30)}

var backgroundStyle = {"background": "url('Images/Background.png')", "opacity": "10%"}

function maxTickLength() {return(3600)}

function fixOldSave(oldVersion) {oldVersion}

let sounds = [
	new Audio("Audio/001.mp3")
]

function soundPlay(id) {
	sounds.currentTime = 0
	sounds[id].play()
}