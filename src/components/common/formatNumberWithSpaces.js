// Función auxiliar para formatear el número mostrado en el balance y en la suma (amount).
// Se agrupan en bloques de 3 dígitos separados por un pequeño espacio.

export function formatNumberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
