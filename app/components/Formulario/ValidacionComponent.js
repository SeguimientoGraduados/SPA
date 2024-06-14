export const ValidacionComponent = (name, value, errors) => {
    let errorObj = { ...errors };

    switch (name) {
        case 'nombre':

            if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+ [A-Za-zÁÉÍÓÚáéíóúñÑ]+$/.test(value.trim()) && value.trim().length > 0) {
                errorObj.nombre = 'Debe ingresar tanto el nombre como el apellido separados por un espacio';
            } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(value) && value.trim().length > 0) {
                errorObj.nombre = 'El nombre solo puede contener letras y espacios';
            } else {
                errorObj.nombre = '';
            }

            break;
        case 'dni':
            const dniRegex = /^\d{6,}$/;
            errorObj.dni = (!dniRegex.test(value) && value.trim().length > 0) ? 'El DNI debe contener al menos 6 dígitos y solo números' : '';
            break;
        case 'fecha_nacimiento':
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(value)) {
                errorObj.fecha_nacimiento = 'Ingrese una fecha válida en formato YYYY-MM-DD';
            } else {
                const year = parseInt(value.split('-')[0], 10);
                errorObj.fecha_nacimiento = year >= 2005 ? 'El año debe ser menor que 2005' : '';
            }
            break;
        case 'anio_graduacion':
            const graduationYear = parseInt(value, 10);
            const currentYear = new Date().getFullYear();
            if ((isNaN(graduationYear) || graduationYear <= 1930 || graduationYear > currentYear) && (value.trim().length > 0)) {
                errorObj.anio_graduacion = `Ingrese una fecha de graduación adecuada`;
            } else {
                errorObj.anio_graduacion = '';
            }
            break;
        case 'rrss':
            errorObj.rrss = {};

            if (value.length === 0) {
                Object.keys(errorObj.rrss).forEach((key) => {
                    errorObj.rrss[key] = '';
                });
            } else {
                value.forEach(({ rrss, url }) => {

                    if (url.trim() === '') {
                        errorObj.rrss[rrss] = '';
                    } else {
                        const urlRegexes = {
                            linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
                            facebook: /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/,
                            twitter: /^(https?:\/\/)?(www\.)?twitter\.com\/.*$/
                        };
                        if (!urlRegexes[rrss].test(url)) {

                            errorObj.rrss[rrss] = `Ingrese una URL válida de ${rrss}`;
                        } else {
                            errorObj.rrss[rrss] = '';
                        }
                    }
                });
            }
            break;
        case 'cv':
            if (value.length > 0) {
                const urlPattern = /^(https?:\/\/)?((www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(\/[^\s]*)?$/;
                errorObj.cv = !urlPattern.test(value) ? 'Ingrese una URL válida' : '';
            }
            else{
                errorObj.cv = '';
            }
            break;
        default:
            break;
    }

    return errorObj;
};
