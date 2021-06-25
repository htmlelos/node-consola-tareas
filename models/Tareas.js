const Tarea = require('./Tarea')

class Tareas {
  _listado = []

  get listadoArray() {
    const listado = []
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key]
      listado.push(tarea)
    })

    return listado
  }

  constructor() {
    this._listado = {}
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id]
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea
    })
  }

  crearTarea(descripcion = '') {
    const tarea = new Tarea(descripcion)
    this._listado[tarea.id] = tarea
  }

  listadoCompleto() {
    console.log()
    this.listadoArray.forEach((tarea, i) => {
      const indice = `${i + 1}.`.green
      const { descripcion, completado } = tarea
      const estado = completado ? 'Completado'.green : 'Pendiente'.red
      console.log(`${indice} ${descripcion} :: ${estado}`)
    })
  }

  listarPendientesCompletadas(completado) {
    console.log()
    this.listadoArray
      .filter((tarea) =>
        tarea.completado !== null
          ? tarea.completado === completado
          : completado === false
      )
      .forEach((tarea, i) => {
        const indice = `${i + 1}.`.green
        const { descripcion, completado } = tarea
        const estado = completado
          ? `${tarea.completadoEn}`.green
          : 'Pendiente'.red

        console.log(`${indice} ${descripcion} :: ${estado}`)
      })
  }

  toggleCompletadas(ids = []) {
    debugger
    ids.forEach((id) => {
      const tarea = this._listado[id]
      if (!tarea.completadoEn) {
        tarea.completado = true
        tarea.completadoEn = new Date().toISOString()
      }
    })

    this.listadoArray.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completado = false
        this._listado[tarea.id].completadoEn = null
      }
    })
  }
}

module.exports = Tareas
