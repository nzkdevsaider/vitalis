import * as SQLite from 'expo-sqlite'

export const initDB = () => {
  const db = SQLite.openDatabaseSync('vitalis.db')

  db.withTransactionSync(() => {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS Usuario (
            id_usuario INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100),
            edad INT
        );

        CREATE TABLE IF NOT EXISTS TipoMedicamento (
            id_tipo INT AUTO_INCREMENT PRIMARY KEY,
            nombre_tipo VARCHAR(100)
        );

        CREATE TABLE IF NOT EXISTS Medicamentos (
            id_medicamento INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100),
            descripcion TEXT,
            id_tipo INT,
            FOREIGN KEY (id_tipo) REFERENCES TipoMedicamento(id_tipo)
        );

        CREATE TABLE IF NOT EXISTS Recordatorios (
            id_recordatorio INT AUTO_INCREMENT PRIMARY KEY,
            id_usuario INT,
            id_medicamento INT,
            fecha_hora DATETIME,
            repeticion VARCHAR(50),
            FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
            FOREIGN KEY (id_medicamento) REFERENCES Medicamentos(id_medicamento)
        );

        CREATE TABLE IF NOT EXISTS Configuracion (
            id_usuario INT PRIMARY KEY,
            pin VARCHAR(20),
            FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
        );
        `)
  })

  return db
}

export const db = initDB()
