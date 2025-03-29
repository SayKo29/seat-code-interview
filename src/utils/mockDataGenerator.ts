/**
 * Genera un nombre aleatorio de una lista de nombres
 */
const getRandomFirstName = (): string => {
  const names = [
    'Ana', 'Juan', 'María', 'Pedro', 'Laura', 'Carlos', 'Sofía', 'David',
    'Lucía', 'Javier', 'Carmen', 'Miguel', 'Elena', 'Pablo', 'Isabel', 'Sergio',
    'Alba', 'Daniel', 'Sara', 'Antonio', 'Patricia', 'José', 'Raúl', 'Marta'
  ];
  return names[Math.floor(Math.random() * names.length)];
};

/**
 * Genera un apellido aleatorio de una lista de apellidos
 */
const getRandomLastName = (): string => {
  const surnames = [
    'García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez',
    'Pérez', 'Gómez', 'Martín', 'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno',
    'Álvarez', 'Romero', 'Alonso', 'Gutiérrez', 'Navarro', 'Torres', 'Domínguez'
  ];
  return surnames[Math.floor(Math.random() * surnames.length)];
};

/**
 * Genera un email aleatorio basado en el nombre y apellido
 */
const generateEmail = (firstName: string, lastName: string): string => {
  const domains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'empresa.es'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  
  // Normaliza el nombre y apellido (quita acentos, eñes, etc.)
  const normalizedFirstName = firstName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const normalizedLastName = lastName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
  const random = Math.floor(Math.random() * 1000);
  
  // Hay diferentes formatos de email posibles
  const emailFormats = [
    `${normalizedFirstName}.${normalizedLastName}@${domain}`,
    `${normalizedFirstName}${random}@${domain}`,
    `${normalizedFirstName[0]}${normalizedLastName}@${domain}`,
    `${normalizedFirstName}${normalizedLastName[0]}${random}@${domain}`,
  ];
  
  return emailFormats[Math.floor(Math.random() * emailFormats.length)];
};

/**
 * Genera datos aleatorios para un usuario 
 */
export const generateRandomUser = () => {
  const firstName = getRandomFirstName();
  const lastName = getRandomLastName();
  
  return {
    first_name: firstName,
    last_name: lastName,
    email: generateEmail(firstName, lastName),
  };
}; 