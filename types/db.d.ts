// Interface para la tabla Usuario
interface Usuario {
  id_usuario: number
  nombre: string
  edad: number
}

// Interface para la tabla TipoMedicamento
interface TipoMedicamento {
  id_tipo: number
  nombre_tipo: string
}

// Interface para la tabla Medicamentos
interface Medicamento {
  id_medicamento: number
  nombre: string
  descripcion: string
  id_tipo: number // Referencia a TipoMedicamento
}

// Interface para la tabla Recordatorios
interface Recordatorio {
  id_recordatorio: number
  id_usuario: number // Referencia a Usuario
  id_medicamento: number // Referencia a Medicamento
  fecha_hora: Date
  repetición: string
}

// Interface para la tabla Configuración
interface Configuración {
  id_usuario: number // Referencia a Usuario
  pin: string
}
