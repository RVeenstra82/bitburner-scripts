// Returns a list of al servers
export function getAllServers(ns) {
    let pendingScan = ["home"]
    const list = new Set(pendingScan)
    while (pendingScan.length) {
        const hostname = pendingScan.shift()
        if (!ns.getServer(hostname).purchasedByPlayer) {
            list.add(hostname)
        }
        pendingScan.push(...ns.scan(hostname))
        pendingScan = pendingScan.filter(host => !list.has(host))
    }
    return [...list]
}