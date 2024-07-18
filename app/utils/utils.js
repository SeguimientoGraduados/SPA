export const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export const normalizeText = (text) => {
    return text
        .replace("Sector ", "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
};

export const formateoTrabajo = (text) => {
    if (text === "rel_dependencia")
        return "Relación de dependencia"
    if (text === "autonomo")
        return "Autónomo"
}