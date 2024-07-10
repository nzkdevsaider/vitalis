import { SQLiteDatabase } from 'expo-sqlite'
import { db } from './connection'

class VitalisDB {
  db: SQLiteDatabase
  constructor() {
    this.db = db
  }

  async checkIfNewUser() {
    const user = await this.db.getFirstAsync('SELECT * FROM Usuario')
    return user === null
  }

  async createUser(name: string, age: number, pin: string) {
    try {
      await this.db.withTransactionAsync(async () => {
        await this.db.runAsync(
          `INSERT OR REPLACE INTO Usuario (nombre, edad) VALUES (?, ?)`,
          name,
          age
        )

        await this.db.runAsync(
          `INSERT OR REPLACE INTO Configuracion (id_usuario, pin) VALUES (?, ?)`,
          1,
          pin
        )
      })
    } catch (error) {
      console.error(error)
      throw new Error(`Error creating user: ${error}`)
    }
    return true
  }

  async checkPin(pin: string) {
    const user: Configuración | null = await this.db.getFirstAsync(
      'SELECT * FROM Configuracion WHERE pin = ?',
      pin
    )
    return user !== null
  }

  async getUser() {
    const user: Usuario | null = await this.db.getFirstAsync('SELECT * FROM Usuario')
    return user
  }

  getMedicines() {
    const medicines: Medicamento[] = this.db.getAllSync('SELECT * FROM Medicamentos')

    return medicines
  }

  getReminders() {
    const reminders: Recordatorio[] = this.db.getAllSync('SELECT * FROM Recordatorios')

    return reminders
  }

  addMedicine(name: string, description: string, type: number) {
    try {
      this.db.withTransactionSync(() => {
        this.db.runSync(
          `INSERT INTO Medicamentos (nombre, descripcion, id_tipo) VALUES (?, ?, ?)`,
          name,
          description,
          type
        )
      })
    } catch (error) {
      console.error(error)
      throw new Error(`Error adding medicine: ${error}`)
    }
  }

  addReminder(
    userId: number,
    medicineId: number,
    repetition: 'diario' | 'semanal' | 'mensual'
  ) {
    try {
      this.db.withTransactionSync(() => {
        this.db.runSync(
          `INSERT INTO Recordatorios (id_usuario, id_medicamento, fecha_hora, repeticion) VALUES (?, ?, datetime('now'), ?)`,
          userId,
          medicineId,
          repetition
        )
      })
    } catch (error) {
      console.error(error)
      throw new Error(`Error adding reminder: ${error}`)
    }
  }

  addMedicineType(name: string) {
    try {
      this.db.withTransactionSync(() => {
        this.db.runSync(`INSERT INTO TipoMedicamento (nombre_tipo) VALUES (?)`, name)
      })
    } catch (error) {
      console.error(error)
      throw new Error(`Error adding medicine type: ${error}`)
    }
  }
}

export const vitalisDB = new VitalisDB()
