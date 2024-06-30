from sqlalchemy import create_engine, MetaData, Table, select

# Configura la conexión a la base de datos MySQL usando SQLAlchemy
engine = create_engine('mysql+mysqlconnector://root:@localhost/dbbecas')

# Conecta al motor de la base de datos
connection = engine.connect()

# Define un objeto Metadata para manejar la estructura de la base de datos
metadata = MetaData()

# Carga la tabla 'estudiante' desde la base de datos
estudiante = Table('estudiante', metadata, autoload_with=engine)

# Crea una consulta SQL usando SQLAlchemy Select con columnas individuales
query = select([
    estudiante.c.idEstudiante,
    estudiante.c.email,
    estudiante.c.nombre,
    estudiante.c.apPaterno,
    estudiante.c.apMaterno,
    estudiante.c.direccion,
    estudiante.c.fechaNacimiento
])

# Ejecuta la consulta y obtén los resultados
result = connection.execute(query)

# Itera sobre los resultados y muestra los datos
for row in result:
    print(row)

# Cierra la conexión
connection.close()
