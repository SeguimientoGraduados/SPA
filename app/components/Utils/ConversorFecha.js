export function conversorFecha(value) {
    const convertirMes = (mes) => {
        const meses = {
            enero: "01",
            febrero: "02",
            marzo: "03",
            abril: "04",
            mayo: "05",
            junio: "06",
            julio: "07",
            agosto: "08",
            septiembre: "09",
            octubre: "10",
            noviembre: "11",
            diciembre: "12"
        };
        return meses[mes.toLowerCase()];
    };

    const partes = value.split(" ");
    const dia = partes[0];
    const mes = convertirMes(partes[2]);
    const año = partes[4];

    return `${año}-${mes}-${dia.padStart(2, '0')}`;
}