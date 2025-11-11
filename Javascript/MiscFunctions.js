function doNotif(text, title, time, color) {
    doPopup("none", text, title, time, color)
}

function jarbler(input, template = "abcdefghijklmnopqrstuvwxyz") {
    output = ""

    for (let i = 0; i < input.length; i++) {
        if (input[i] != " ") { 
            output += template[Math.floor(Math.random() * template.length)]
        } else {
            output += " "
        }
    }
    return output
}

doNotif("Possible Epilepsy Warning!1!1", "SConvolution Warning", 10, "crimson")


function themeSetter() {
    let input = prompt("Change Theme To:")
    let at = ["Default", "Aqua", "Potassium"]

    if (at.includes(input)) {
        if (input == at[2]) {
            doNotif("Kris, stop everything! Get the banana.", "Queen Says", 10, "#ffe135")
            window.open('https://youtu.be/CkDfvVgZ-xk?si=lcSBc--SufmmAyQT', '_blank')
        }
        options.theme = input
        changeTheme()
    } else {
        alert("Invalid Theme Inputted!")
    }

}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function startleify(char) {
    switch (char) {
        case "Sorbet":
            doNotif("A-", "Sorbet", 5, "lightgray")
            break;
    }
}