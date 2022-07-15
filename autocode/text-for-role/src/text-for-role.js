const textForRole = (roles, textLines) => {
    const characterTextLine = textLines.split("\n").map((v, i) =>
        [v.substring(0, v.indexOf(":")), `${i + 1}) ` + v.substring(v.indexOf(":") + 2)]);
    let result = roles.reduce((res, key) => {
        res[key] = [];
        return res;
    }, {});
    for (const [character, line] of characterTextLine) {
        result[character].push(line);
    }
    return Object.entries(result).map(([key, val]) => key + ":\n" + val.join("\n")).join("\n\n");
};
module.exports = textForRole;
