const nameEdgeCases = {
    "nidoran-f": "Nidoran ♀",
    "nidoran-m": "Nidoran ♂",
    farfetchd: "Farfetch'd",
    "mr-mime": "Mr. Mime",
};

export function formatName(name) {
    if (name in nameEdgeCases) {
        return nameEdgeCases[name];
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
}
