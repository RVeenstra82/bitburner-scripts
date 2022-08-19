/** @param {NS} ns */
import {getAllServers} from './helper.js'

/**
 * This script will go through all servers and tries to get root access on all of them
 * When installing backdoors is available it will do install those as well
 */
export async function main(ns) {
	let servers = getAllServers(ns)

    for( let server of servers) {
        if (server == "home" || server == ".") {
            continue;
        }
        
        await attack(ns, server)
		await installBackdoor(ns, server)
    }

    ns.tprint("== Finished rootAllServers ==")
}

async function attack(ns, server) {
    var hacktoolnum = 0;             
    if (ns.hasRootAccess(server)) {
        return
    }
    else {
        ns.tprint('Opening ports on ' + server);
        if (ns.fileExists('BruteSSH.exe', 'home')) {
            ns.brutessh(server);
            hacktoolnum++;
        }
        if (ns.fileExists('FTPCrack.exe', 'home')) {
            ns.ftpcrack(server);
            hacktoolnum++;

        }
        if (ns.fileExists('relaySMTP.exe', 'home')) {
            ns.relaysmtp(server);
            hacktoolnum++;

        }
        if (ns.fileExists('HTTPWorm.exe', 'home')) {
            ns.httpworm(server);
            hacktoolnum++;

        }
        if (ns.fileExists('SQLInject.exe', 'home')) {
            ns.sqlinject(server);
            hacktoolnum++;

        }
    }

    ns.tprint("Opened " + hacktoolnum + " (of " + ns.getServerNumPortsRequired(server) + ") ports.")
    
    if (ns.getServerNumPortsRequired(server) <= hacktoolnum && !ns.hasRootAccess(server)) {
        ns.tprint("Nuking " + server);
        ns.nuke(server);
    }
}

async function installBackdoor(ns, server) {
	if (!ns.hasRootAccess(server)) {
		return;
	}
    try {
        ns.installBackdoor(server)
        ns.tprint("Backdoor installed")
    } catch(error) {}
}