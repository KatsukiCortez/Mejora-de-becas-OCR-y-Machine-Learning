import pandas as pd
import mysql.connector

# Connect to the MySQL database
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='',
    database='dbbecas'
)

# Query to join tables and get the required data
query = """
SELECT
    e.idEstudiante,
    e.email,
    e.nombre,
    e.apPaterno,
    e.apMaterno,
    e.direccion,
    e.fechaNacimiento,
    i.ingresosMensuales,
    i.numMiembrosFamilia,
    i.ingresosMensuales / i.numMiembrosFamilia AS ingresosPerCapita,
    h.promedio,
    h.institucionEducativa,
    d.resultadoAnalisisML,
    d.comentarios AS docComentarios,
    s.comentarios AS segComentarios
FROM
    Estudiante e
JOIN
    IngresoFamiliares i ON e.idEstudiante = i.idEstudiante
JOIN
    HistorialAcademico h ON e.idEstudiante = h.idEstudiante
JOIN
    Documentos d ON e.idEstudiante = d.idEstudiante
JOIN
    SeguimientoBecas s ON e.idEstudiante = s.idSolicitud
WHERE
    (i.ingresosMensuales / i.numMiembrosFamilia) <= 200
    AND h.promedio >= 15;
"""

# Read data into a DataFrame
df = pd.read_sql(query, conn)

# Close the connection
conn.close()

# Process the data for training
df['eligibility'] = df.apply(lambda row: 1 if row['ingresosPerCapita'] <= 200 and row['promedio'] >= 15 else 0, axis=1)

# Save the data to CSV
df.to_csv('data/data_estudiante.csv', index=False)

# Optionally, save to JSON
df.to_json('data/data_estudiante.json', orient='records', lines=True)
