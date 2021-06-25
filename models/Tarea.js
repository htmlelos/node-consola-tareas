const { v4: uuidv4} = require('uuid')
class Tarea {
  id = ''
  descripcion = ''
  completado = null

  constructor(descripcion) {
    this.id = uuidv4();
    this.descripcion = descripcion;
    this.completado = null;
  }
}

module.exports = Tarea;