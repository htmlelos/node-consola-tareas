require('colors')
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoBorrarTareas,
  confirmar,
  mostrarListadoChecklist,
} = require('./helpers/inquirer')
const Tareas = require('./models/tareas')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')

console.clear()

const main = async () => {
  let = opcion = ''
  const tareas = new Tareas()

  const tareasDB = leerDB()

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB)
  }

  do {
    opcion = await inquirerMenu()

    switch (opcion) {
      case '1':
        // crear opcion
        const descripcion = await leerInput('Descripción: ')
        tareas.crearTarea(descripcion)
        break
      case '2':
        tareas.listadoCompleto()
        break
      case '3':
        tareas.listarPendientesCompletadas(true)
        break
      case '4':
        tareas.listarPendientesCompletadas(false)
        break
      case '5':
        const ids = await mostrarListadoChecklist(tareas.listadoArray)
        await tareas.toggleCompletadas(ids)
        break
      case '6':
        const id = await listadoBorrarTareas(tareas.listadoArray)
        if (id !== '0') {
          const ok = await confirmar('¿Esta seguro que desea borrar la tarea?')
          if (ok) {
            tareas.borrarTarea(id)
            console.log('\nTarea eliminada'.yellow)
          }
        }
        break
    }

    guardarDB(tareas.listadoArray)

    if (opcion !== '0') await pausa()
  } while (opcion !== '0')
}

main()
