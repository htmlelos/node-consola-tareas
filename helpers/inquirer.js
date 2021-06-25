const inquirer = require('inquirer')
require('colors')

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
      { value: '1', name: `${'1.'.green} Crear tarea` },
      { value: '2', name: `${'2.'.green} Listar tareas` },
      { value: '3', name: `${'3.'.green} Listar tareas completadas` },
      { value: '4', name: `${'4.'.green} Listar tareas pendientes` },
      { value: '5', name: `${'5.'.green} Completar tareas` },
      { value: '6', name: `${'6.'.green} Eliminar una tarea` },
      { value: '0', name: `${'0.'.green} Salir` },
    ],
  },
]

const inquirerMenu = async () => {
  console.clear()
  console.log('======================='.green)
  console.log(' Seleccione una opción'.white)
  console.log('=======================\n'.green)

  const { opcion } = await inquirer.prompt(preguntas)

  return opcion
}

const pausa = async () => {
  const pregunta = [
    {
      type: 'input',
      name: 'enter',
      message: `\nPresion ${'ENTER'.green} para continuar.\n`,
    },
  ]

  console.log('\n')
  await inquirer.prompt(pregunta)
}

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'descripcion',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true
      },
    },
  ]

  const { descripcion } = await inquirer.prompt(question)
  return descripcion
}

const listadoBorrarTareas = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const indice = `${i + 1}.`.green
    return {
      value: tarea.id,
      name: `${indice} - ${tarea.descripcion}`,
    }
  })

  choices.unshift({
    value: '0',
    name: `${'0.'.green} Cancelar`,
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices,
    },
  ]
  const { id } = await inquirer.prompt(preguntas)
  return id
}

const confirmar = async (mensajes) => {
  const pregunta = {
    type: 'confirm',
    name: 'ok',
    mensajes,
  }

  const { ok } = await inquirer.prompt(pregunta)
  console.log(ok)
  return ok
}

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const indice = `${i + 1}.`.green

    return {
      value: tarea.id,
      name: `${indice} - ${tarea.descripcion}`,
      checked: tarea.completadoEn ? true : false,
    }
  })

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices,
    },
  ]
  const { ids } = await inquirer.prompt(pregunta)
  return ids
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoBorrarTareas,
  confirmar,
  mostrarListadoChecklist,
}
