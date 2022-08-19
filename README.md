# bitburner-scripts
Welcome to my collection of [Bitburner](https://danielyxie.github.io/bitburner/) scripts. They are written using the in-game language of NetscriptJS, which is a mutation of Javascript.
This collection is a combination of my own scripts, scripts created by others but modified by me and scripts by others that I have not modified.

If you want to play the game itself - click on the name above.

The scripts have been written for version 2.0.0 of the game (released 17-08-2022)

# Installation
1. Make sure you're on your home server if you're not (you can quickly go home by running `home` in the console).
2. To use this collection create a script, for example `nano start.js`
3. Enter the following code in this script

```javascript
export async function main(ns) {
  if (ns.getHostname() !== "home") {
    throw new Exception("Run the script from the home server");
  }

  await ns.wget(
    `https://raw.githubusercontent.com/RVeenstra82/bitburner-scripts/main/src/initHacking.js?ts=${new Date().getTime()}`,
    "initHacking.js"
  );
  ns.spawn("initHacking.js", 1);
}
```
